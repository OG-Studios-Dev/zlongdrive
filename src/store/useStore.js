import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
    createCompetitionEntrant,
    DEFAULT_DIVISIONS,
    DEFAULT_POINTS_TABLE,
    getCompetitionDivisions,
    getCompetitionMediaPosts,
    getSeasonLeaderboard,
    rankCompetitionEntrants,
} from '../lib/competition'

const createId = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

const buildRules = (overrides = {}) => {
    const { divisions, ...rest } = overrides

    return {
        qualifyingSets: 3,
        shotsPerSet: 6,
        ...rest,
        divisions: (divisions || DEFAULT_DIVISIONS).map((division) => ({ ...division })),
    }
}

const buildPointsTable = (overrides = {}) => ({
    ...DEFAULT_POINTS_TABLE,
    ...overrides,
})

const createInitialState = () => ({
    currentSeasonId: 'season-25-26',
    activeCompetitionId: 'toronto-qualifier',
    seasons: [
        {
            id: 'season-25-26',
            name: 'Season 25/26',
            startDate: '2025-10-01',
            endDate: '2026-08-31',
            status: 'LIVE',
            pointsTable: buildPointsTable(),
        },
        {
            id: 'season-24-25',
            name: 'Season 24/25',
            startDate: '2024-10-01',
            endDate: '2025-08-31',
            status: 'ARCHIVED',
            pointsTable: buildPointsTable({
                champion: 220,
                finalist: 160,
                semifinalist: 110,
                quarterfinalist: 75,
                qualifier: 30,
            }),
        },
    ],
    competitions: [
        {
            id: 'winter-classic',
            seasonId: 'season-25-26',
            name: 'Vancouver Winter Classic',
            venue: 'Pacific Indoor Range',
            countryCode: 'CA',
            startDate: '2026-01-18',
            status: 'COMPLETED',
            signupLink: 'https://zld.world/events/vancouver-winter-classic',
            paymentLink: 'https://pay.zld.world/vancouver-winter-classic',
            rules: buildRules({
                divisions: [
                    { id: 'championship', name: 'Championship Flight', size: 4 },
                    { id: 'contender', name: 'Contender Flight', size: 4 },
                ],
            }),
            entrants: [
                createCompetitionEntrant({
                    id: 'entrant-vwc-marcus',
                    playerId: 'marcus-reid',
                    name: 'Marcus Reid',
                    email: 'marcus@zld.world',
                    countryCode: 'CA',
                    pool: 'A',
                    paid: true,
                    sets: [
                        [420, 414, 409, 401, 399, 405],
                        [417, 408, 404, 398, 392, 389],
                        [410, 406, 400, 394, 391, 388],
                    ],
                }),
                createCompetitionEntrant({
                    id: 'entrant-vwc-tyler',
                    playerId: 'tyler-stone',
                    name: 'Tyler Stone',
                    email: 'tyler@zld.world',
                    countryCode: 'US',
                    pool: 'A',
                    paid: true,
                    sets: [
                        [409, 404, 401, 397, 391, 388],
                        [406, 402, 399, 392, 390, 387],
                        [405, 398, 395, 391, 385, 381],
                    ],
                }),
                createCompetitionEntrant({
                    id: 'entrant-vwc-david',
                    playerId: 'david-chen',
                    name: 'David Chen',
                    email: 'david@zld.world',
                    countryCode: 'US',
                    pool: 'A',
                    paid: true,
                    sets: [
                        [401, 398, 394, 390, 387, 382],
                        [399, 395, 391, 389, 384, 380],
                        [396, 392, 388, 385, 381, 377],
                    ],
                }),
                createCompetitionEntrant({
                    id: 'entrant-vwc-jason',
                    playerId: 'jason-voorhees',
                    name: 'Jason Voorhees',
                    email: 'jason@zld.world',
                    countryCode: 'GB',
                    pool: 'A',
                    paid: true,
                    sets: [
                        [398, 393, 390, 386, 382, 379],
                        [395, 391, 387, 384, 380, 376],
                        [392, 388, 385, 381, 378, 374],
                    ],
                }),
                createCompetitionEntrant({
                    id: 'entrant-vwc-avery',
                    playerId: 'avery-davis',
                    name: 'Avery Davis',
                    email: 'avery@zld.world',
                    countryCode: 'AU',
                    pool: 'B',
                    paid: true,
                    sets: [
                        [394, 390, 387, 384, 380, 377],
                        [391, 388, 383, 379, 376, 372],
                        [389, 385, 381, 378, 374, 370],
                    ],
                }),
                createCompetitionEntrant({
                    id: 'entrant-vwc-sofia',
                    playerId: 'sofia-patel',
                    name: 'Sofia Patel',
                    email: 'sofia@zld.world',
                    countryCode: 'ZA',
                    pool: 'B',
                    paid: true,
                    sets: [
                        [390, 386, 383, 379, 376, 372],
                        [388, 384, 380, 377, 373, 370],
                        [385, 381, 378, 374, 371, 368],
                    ],
                }),
                createCompetitionEntrant({
                    id: 'entrant-vwc-liam',
                    playerId: 'liam-smith',
                    name: 'Liam Smith',
                    email: 'liam@zld.world',
                    countryCode: 'NZ',
                    pool: 'B',
                    paid: true,
                    sets: [
                        [388, 384, 381, 377, 374, 371],
                        [385, 382, 378, 375, 372, 369],
                        [383, 379, 376, 373, 370, 367],
                    ],
                }),
                createCompetitionEntrant({
                    id: 'entrant-vwc-kai',
                    playerId: 'kai-berkshire',
                    name: 'Kai Berkshire',
                    email: 'kai@zld.world',
                    countryCode: 'DE',
                    pool: 'B',
                    paid: true,
                    sets: [
                        [382, 379, 375, 371, 368, 365],
                        [380, 377, 373, 369, 366, 362],
                        [378, 374, 370, 367, 364, 361],
                    ],
                }),
            ],
            bracketResults: {
                championship: [
                    ['entrant-vwc-marcus', 'entrant-vwc-david'],
                    ['entrant-vwc-marcus'],
                ],
                contender: [
                    ['entrant-vwc-avery', 'entrant-vwc-sofia'],
                    ['entrant-vwc-avery'],
                ],
            },
        },
        {
            id: 'toronto-qualifier',
            seasonId: 'season-25-26',
            name: 'Toronto Qualifier',
            venue: 'Metro Long Drive Dome',
            countryCode: 'CA',
            startDate: '2026-03-22',
            status: 'LIVE',
            signupLink: 'https://zld.world/events/toronto-qualifier',
            paymentLink: 'https://pay.zld.world/toronto-qualifier',
            rules: buildRules({
                divisions: [
                    { id: 'championship', name: 'Championship Flight', size: 4 },
                    { id: 'contender', name: 'Contender Flight', size: 4 },
                ],
            }),
            entrants: [
                createCompetitionEntrant({
                    id: 'entrant-toronto-marcus',
                    playerId: 'marcus-reid',
                    name: 'Marcus Reid',
                    email: 'marcus@zld.world',
                    countryCode: 'CA',
                    pool: 'A',
                    paid: true,
                    sets: [
                        [412, 407, 403, 400, 397, 392],
                        [0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0],
                    ],
                }),
                createCompetitionEntrant({
                    id: 'entrant-toronto-tyler',
                    playerId: 'tyler-stone',
                    name: 'Tyler Stone',
                    email: 'tyler@zld.world',
                    countryCode: 'US',
                    pool: 'A',
                    paid: true,
                    sets: [
                        [405, 401, 396, 392, 388, 381],
                        [0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0],
                    ],
                }),
                createCompetitionEntrant({
                    id: 'entrant-toronto-david',
                    playerId: 'david-chen',
                    name: 'David Chen',
                    email: 'david@zld.world',
                    countryCode: 'US',
                    pool: 'A',
                    paid: false,
                    sets: [
                        [398, 395, 391, 388, 384, 380],
                        [0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0],
                    ],
                }),
                createCompetitionEntrant({
                    id: 'entrant-toronto-jason',
                    playerId: 'jason-voorhees',
                    name: 'Jason Voorhees',
                    email: 'jason@zld.world',
                    countryCode: 'GB',
                    pool: 'A',
                    paid: true,
                    sets: [
                        [402, 397, 392, 389, 384, 381],
                        [0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0],
                    ],
                }),
                createCompetitionEntrant({
                    id: 'entrant-toronto-avery',
                    playerId: 'avery-davis',
                    name: 'Avery Davis',
                    email: 'avery@zld.world',
                    countryCode: 'AU',
                    pool: 'B',
                    paid: false,
                    sets: [
                        [393, 390, 386, 382, 378, 375],
                        [0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0],
                    ],
                }),
                createCompetitionEntrant({
                    id: 'entrant-toronto-sofia',
                    playerId: 'sofia-patel',
                    name: 'Sofia Patel',
                    email: 'sofia@zld.world',
                    countryCode: 'ZA',
                    pool: 'B',
                    paid: true,
                    sets: [
                        [389, 384, 381, 377, 372, 369],
                        [0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0],
                    ],
                }),
                createCompetitionEntrant({
                    id: 'entrant-toronto-liam',
                    playerId: 'liam-smith',
                    name: 'Liam Smith',
                    email: 'liam@zld.world',
                    countryCode: 'NZ',
                    pool: 'B',
                    paid: true,
                    sets: [
                        [387, 383, 379, 374, 371, 368],
                        [0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0],
                    ],
                }),
                createCompetitionEntrant({
                    id: 'entrant-toronto-kai',
                    playerId: 'kai-berkshire',
                    name: 'Kai Berkshire',
                    email: 'kai@zld.world',
                    countryCode: 'DE',
                    pool: 'B',
                    paid: false,
                    sets: [
                        [380, 377, 374, 370, 366, 362],
                        [0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0],
                    ],
                }),
            ],
            bracketResults: {
                championship: [],
                contender: [],
            },
        },
    ],
})

const mergeCompetitionPatch = (competition, patch) => ({
    ...competition,
    ...patch,
    rules: patch.rules
        ? {
            ...competition.rules,
            ...patch.rules,
            divisions: (patch.rules.divisions || competition.rules.divisions).map((division) => ({ ...division })),
        }
        : competition.rules,
    pointsTable: patch.pointsTable
        ? {
            ...(competition.pointsTable || {}),
            ...patch.pointsTable,
        }
        : competition.pointsTable,
})

const replaceCompetition = (competitions, competitionId, updater) =>
    competitions.map((competition) =>
        competition.id === competitionId ? updater(competition) : competition,
    )

export const useStore = create(
    persist(
        (set, get) => ({
            ...createInitialState(),

            setCurrentSeason: (seasonId) => set({ currentSeasonId: seasonId }),

            setActiveCompetition: (competitionId) => set({ activeCompetitionId: competitionId }),

            addSeason: (seasonDraft) => {
                const seasonId = createId('season')
                const nextSeason = {
                    id: seasonId,
                    name: seasonDraft.name || 'New Season',
                    startDate: seasonDraft.startDate,
                    endDate: seasonDraft.endDate,
                    status: seasonDraft.status || 'PLANNED',
                    pointsTable: buildPointsTable(seasonDraft.pointsTable),
                }

                set((state) => ({
                    seasons: [...state.seasons, nextSeason],
                    currentSeasonId: seasonId,
                }))
            },

            updateSeason: (seasonId, patch) => set((state) => ({
                seasons: state.seasons.map((season) =>
                    season.id === seasonId
                        ? {
                            ...season,
                            ...patch,
                            pointsTable: patch.pointsTable
                                ? { ...season.pointsTable, ...patch.pointsTable }
                                : season.pointsTable,
                        }
                        : season,
                ),
            })),

            addCompetition: (seasonId, competitionDraft) => {
                const competitionId = createId('competition')
                const nextCompetition = {
                    id: competitionId,
                    seasonId,
                    name: competitionDraft.name || 'New Competition',
                    venue: competitionDraft.venue || '',
                    countryCode: competitionDraft.countryCode || 'CA',
                    startDate: competitionDraft.startDate || '',
                    status: competitionDraft.status || 'DRAFT',
                    signupLink: competitionDraft.signupLink || '',
                    paymentLink: competitionDraft.paymentLink || '',
                    rules: buildRules(competitionDraft.rules),
                    entrants: [],
                    bracketResults: {},
                }

                set((state) => ({
                    competitions: [...state.competitions, nextCompetition],
                    activeCompetitionId: competitionId,
                }))
            },

            updateCompetition: (competitionId, patch) => set((state) => ({
                competitions: replaceCompetition(state.competitions, competitionId, (competition) =>
                    mergeCompetitionPatch(competition, patch),
                ),
            })),

            addEntrant: (competitionId, entrantDraft) => set((state) => ({
                competitions: replaceCompetition(state.competitions, competitionId, (competition) => ({
                    ...competition,
                    entrants: [
                        ...competition.entrants,
                        createCompetitionEntrant({
                            id: createId('entrant'),
                            ...entrantDraft,
                        }),
                    ],
                })),
            })),

            updateEntrant: (competitionId, entrantId, patch) => set((state) => ({
                competitions: replaceCompetition(state.competitions, competitionId, (competition) => ({
                    ...competition,
                    entrants: competition.entrants.map((entrant) =>
                        entrant.id === entrantId
                            ? {
                                ...entrant,
                                ...patch,
                                paid: typeof patch.paid === 'boolean' ? patch.paid : entrant.paid,
                                paymentStatus: typeof patch.paid === 'boolean'
                                    ? patch.paid ? 'PAID' : 'UNPAID'
                                    : patch.paymentStatus || entrant.paymentStatus,
                            }
                            : entrant,
                    ),
                })),
            })),

            updateEntrantShot: (competitionId, entrantId, setId, shotIndex, distance) => set((state) => ({
                competitions: replaceCompetition(state.competitions, competitionId, (competition) => ({
                    ...competition,
                    entrants: competition.entrants.map((entrant) =>
                        entrant.id === entrantId
                            ? {
                                ...entrant,
                                sets: entrant.sets.map((setItem) =>
                                    setItem.id === setId
                                        ? {
                                            ...setItem,
                                            shots: setItem.shots.map((shot, index) =>
                                                index === shotIndex ? Number(distance) || 0 : shot,
                                            ),
                                        }
                                        : setItem,
                                ),
                            }
                            : entrant,
                    ),
                })),
            })),

            setEntrantPaymentStatus: (competitionId, entrantId, paid) =>
                get().updateEntrant(competitionId, entrantId, {
                    paid,
                    paymentStatus: paid ? 'PAID' : 'UNPAID',
                }),

            setBracketWinner: (competitionId, divisionId, roundIndex, matchIndex, entrantId) => set((state) => ({
                competitions: replaceCompetition(state.competitions, competitionId, (competition) => {
                    const currentDivisionResults = competition.bracketResults?.[divisionId] || []
                    const nextDivisionResults = currentDivisionResults.map((round) => [...round])

                    while (nextDivisionResults.length <= roundIndex) {
                        nextDivisionResults.push([])
                    }

                    nextDivisionResults[roundIndex][matchIndex] = entrantId

                    for (let index = roundIndex + 1; index < nextDivisionResults.length; index += 1) {
                        nextDivisionResults[index] = []
                    }

                    return {
                        ...competition,
                        bracketResults: {
                            ...competition.bracketResults,
                            [divisionId]: nextDivisionResults,
                        },
                    }
                }),
            })),

            getCurrentSeason: () => {
                const { seasons, currentSeasonId } = get()
                return seasons.find((season) => season.id === currentSeasonId) || seasons[0] || null
            },

            getActiveCompetition: () => {
                const { competitions, activeCompetitionId } = get()
                return competitions.find((competition) => competition.id === activeCompetitionId) || competitions[0] || null
            },

            getSeasonLeaderboard: (seasonId) => {
                const { seasons, competitions } = get()
                const season = seasons.find((entry) => entry.id === seasonId)
                return season ? getSeasonLeaderboard(season, competitions) : []
            },

            getCompetitionEntrants: (competitionId) => {
                const competition = get().competitions.find((entry) => entry.id === competitionId)
                return competition ? rankCompetitionEntrants(competition.entrants) : []
            },

            getCompetitionDivisions: (competitionId) => {
                const competition = get().competitions.find((entry) => entry.id === competitionId)
                return competition ? getCompetitionDivisions(competition) : []
            },

            getCompetitionMediaPosts: (competitionId) => {
                const competition = get().competitions.find((entry) => entry.id === competitionId)
                return competition ? getCompetitionMediaPosts(competition) : []
            },
        }),
        {
            name: 'zld-event-operations',
            version: 2,
            migrate: (persistedState, version) => {
                if (!persistedState || version < 2 || !Array.isArray(persistedState.seasons) || !Array.isArray(persistedState.competitions)) {
                    return createInitialState()
                }

                return {
                    ...createInitialState(),
                    ...persistedState,
                }
            },
        },
    ),
)
