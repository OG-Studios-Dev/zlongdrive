export const DEFAULT_POINTS_TABLE = {
    champion: 250,
    finalist: 180,
    semifinalist: 120,
    quarterfinalist: 80,
    qualifier: 35,
}

export const DEFAULT_DIVISIONS = [
    { id: 'championship', name: 'Championship Flight', size: 8 },
    { id: 'contender', name: 'Contender Flight', size: 8 },
]

export const COUNTRY_OPTIONS = [
    { code: 'CA', name: 'Canada' },
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'AU', name: 'Australia' },
    { code: 'DE', name: 'Germany' },
    { code: 'JP', name: 'Japan' },
    { code: 'ZA', name: 'South Africa' },
    { code: 'NZ', name: 'New Zealand' },
]

export const getFlagEmoji = (countryCode = 'CA') =>
    countryCode
        .toUpperCase()
        .replace(/./g, (character) => String.fromCodePoint(127397 + character.charCodeAt(0)))

export const getCountryName = (countryCode = 'CA') =>
    COUNTRY_OPTIONS.find((country) => country.code === countryCode)?.name || countryCode

export const createPlayerId = ({ name = '', email = '' }) => {
    const base = (email || name).trim().toLowerCase()
    return base.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `player-${Date.now()}`
}

export const createShots = (shots = []) =>
    Array.from({ length: 6 }, (_, index) => Number(shots[index]) || 0)

export const createCompetitionSet = (id, shots = []) => ({
    id,
    shots: createShots(shots),
})

export const createCompetitionEntrant = ({
    id,
    playerId,
    name,
    email,
    countryCode = 'CA',
    pool = 'A',
    paid = false,
    paymentStatus,
    notes = '',
    sets = [],
}) => ({
    id,
    playerId: playerId || createPlayerId({ name, email }),
    name,
    email,
    countryCode,
    pool,
    paid,
    paymentStatus: paymentStatus || (paid ? 'PAID' : 'UNPAID'),
    notes,
    sets: Array.from({ length: 3 }, (_, index) => createCompetitionSet(index + 1, sets[index])),
})

export const getSetLong = (set) => Math.max(0, ...(set?.shots || []).map((shot) => Number(shot) || 0))

export const getEntrantBestDistance = (entrant) =>
    Math.max(0, ...(entrant?.sets || []).map((set) => getSetLong(set)))

export const rankCompetitionEntrants = (entrants = []) =>
    [...entrants]
        .map((entrant) => ({
            ...entrant,
            bestDistance: getEntrantBestDistance(entrant),
            flagEmoji: getFlagEmoji(entrant.countryCode),
            countryName: getCountryName(entrant.countryCode),
        }))
        .sort((left, right) => right.bestDistance - left.bestDistance || left.name.localeCompare(right.name))
        .map((entrant, index) => ({ ...entrant, rank: index + 1 }))

const resolveMatchWinner = (entrants, storedWinnerId) => {
    const availableEntrants = entrants.filter(Boolean)
    if (availableEntrants.length === 1) {
        return availableEntrants[0]
    }

    if (!storedWinnerId) {
        return null
    }

    return availableEntrants.find((entrant) => entrant.id === storedWinnerId) || null
}

const getBracketSize = (entrantCount) => {
    const normalizedCount = Math.max(2, entrantCount)
    return 2 ** Math.ceil(Math.log2(normalizedCount))
}

export const buildBracketRounds = (seededEntrants = [], storedResults = []) => {
    const bracketSize = getBracketSize(seededEntrants.length)
    const paddedEntrants = Array.from({ length: bracketSize }, (_, index) => seededEntrants[index] || null)

    let currentRound = Array.from({ length: bracketSize / 2 }, (_, matchIndex) => {
        const entrants = [
            paddedEntrants[matchIndex],
            paddedEntrants[bracketSize - 1 - matchIndex],
        ]

        return {
            id: `round-1-match-${matchIndex + 1}`,
            roundIndex: 0,
            matchIndex,
            entrants,
            winner: resolveMatchWinner(entrants, storedResults[0]?.[matchIndex]),
        }
    })

    const rounds = [currentRound]

    while (currentRound.length > 1) {
        const roundIndex = rounds.length
        const nextRound = Array.from({ length: currentRound.length / 2 }, (_, matchIndex) => {
            const entrants = [
                currentRound[matchIndex * 2]?.winner || null,
                currentRound[(matchIndex * 2) + 1]?.winner || null,
            ]

            return {
                id: `round-${roundIndex + 1}-match-${matchIndex + 1}`,
                roundIndex,
                matchIndex,
                entrants,
                winner: resolveMatchWinner(entrants, storedResults[roundIndex]?.[matchIndex]),
            }
        })

        rounds.push(nextRound)
        currentRound = nextRound
    }

    return rounds
}

export const getCompetitionDivisions = (competition) => {
    const rankedEntrants = rankCompetitionEntrants(competition?.entrants || [])
    let cursor = 0

    return (competition?.rules?.divisions || DEFAULT_DIVISIONS).map((division) => {
        const entrants = rankedEntrants
            .slice(cursor, cursor + Number(division.size || 0))
            .map((entrant, index) => ({ ...entrant, seed: index + 1 }))
        const rounds = buildBracketRounds(
            entrants,
            competition?.bracketResults?.[division.id] || [],
        )

        cursor += Number(division.size || 0)

        return {
            ...division,
            entrants,
            rounds,
        }
    })
}

export const getCompetitionPlacements = (competition) => {
    const placements = {}
    const rankedEntrants = rankCompetitionEntrants(competition?.entrants || [])

    rankedEntrants.forEach((entrant) => {
        placements[entrant.id] = {
            entrant,
            finish: 'qualifier',
            divisionId: null,
            divisionName: null,
        }
    })

    getCompetitionDivisions(competition).forEach((division) => {
        division.entrants.forEach((entrant) => {
            placements[entrant.id] = {
                ...placements[entrant.id],
                divisionId: division.id,
                divisionName: division.name,
            }
        })

        const rounds = division.rounds
        const finalMatch = rounds[rounds.length - 1]?.[0]
        const semifinalMatches = rounds[rounds.length - 2] || []
        const quarterfinalMatches = rounds[rounds.length - 3] || []

        if (finalMatch?.winner) {
            const champion = finalMatch.winner
            const finalist = finalMatch.entrants.find(
                (entrant) => entrant && entrant.id !== champion.id,
            )

            placements[champion.id] = {
                ...placements[champion.id],
                finish: 'champion',
                divisionId: division.id,
                divisionName: division.name,
            }

            if (finalist) {
                placements[finalist.id] = {
                    ...placements[finalist.id],
                    finish: 'finalist',
                    divisionId: division.id,
                    divisionName: division.name,
                }
            }
        }

        semifinalMatches.forEach((match) => {
            if (!match.winner) {
                return
            }

            const loser = match.entrants.find(
                (entrant) => entrant && entrant.id !== match.winner.id,
            )

            if (loser && placements[loser.id]?.finish === 'qualifier') {
                placements[loser.id] = {
                    ...placements[loser.id],
                    finish: 'semifinalist',
                    divisionId: division.id,
                    divisionName: division.name,
                }
            }
        })

        quarterfinalMatches.forEach((match) => {
            if (!match.winner) {
                return
            }

            const loser = match.entrants.find(
                (entrant) => entrant && entrant.id !== match.winner.id,
            )

            if (loser && placements[loser.id]?.finish === 'qualifier') {
                placements[loser.id] = {
                    ...placements[loser.id],
                    finish: 'quarterfinalist',
                    divisionId: division.id,
                    divisionName: division.name,
                }
            }
        })
    })

    return Object.values(placements)
}

export const getPointsForFinish = (pointsTable, finish) =>
    Number(pointsTable?.[finish] || 0)

export const getSeasonLeaderboard = (season, competitions = []) => {
    const leaderboard = {}

    competitions
        .filter((competition) => competition.seasonId === season?.id && competition.status === 'COMPLETED')
        .forEach((competition) => {
            const pointsTable = competition.pointsTable || season.pointsTable || DEFAULT_POINTS_TABLE
            const placements = getCompetitionPlacements(competition)

            placements.forEach(({ entrant, finish }) => {
                const playerId = entrant.playerId || entrant.id

                if (!leaderboard[playerId]) {
                    leaderboard[playerId] = {
                        playerId,
                        name: entrant.name,
                        countryCode: entrant.countryCode,
                        flagEmoji: getFlagEmoji(entrant.countryCode),
                        points: 0,
                        eventsPlayed: 0,
                        wins: 0,
                    }
                }

                leaderboard[playerId].points += getPointsForFinish(pointsTable, finish)
                leaderboard[playerId].eventsPlayed += 1
                leaderboard[playerId].wins += finish === 'champion' ? 1 : 0
            })
        })

    return Object.values(leaderboard)
        .sort((left, right) => right.points - left.points || right.wins - left.wins || left.name.localeCompare(right.name))
        .map((entrant, index) => ({
            ...entrant,
            rank: index + 1,
        }))
}

export const formatCompetitionDate = (value) => {
    if (!value) {
        return 'TBD'
    }

    return new Date(`${value}T12:00:00`).toLocaleDateString('en-CA', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

export const getCompetitionMediaPosts = (competition) =>
    getCompetitionDivisions(competition)
        .map((division) => {
            const champion = division.rounds[division.rounds.length - 1]?.[0]?.winner

            if (!champion) {
                return null
            }

            const flagEmoji = getFlagEmoji(champion.countryCode)

            return {
                id: `${competition.id}-${division.id}-winner-post`,
                divisionName: division.name,
                championName: champion.name,
                flagEmoji,
                assetName: `${competition.name} ${division.name} Winner Card`,
                caption: `${flagEmoji} ${champion.name} wins the ${division.name} at ${competition.name} in ${getCountryName(competition.countryCode)}. Qualifying LONG secured the seed, and a single-elimination run closed it out on ${formatCompetitionDate(competition.startDate)}. #ZLongDrive #LongDrive #${competition.countryCode}`,
                storyCaption: `${flagEmoji} ${champion.name}\n${division.name} champion\n${competition.name}`,
            }
        })
        .filter(Boolean)
