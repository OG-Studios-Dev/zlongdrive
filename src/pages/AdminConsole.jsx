import React, { useEffect, useState } from 'react'
import {
    Calendar,
    Copy,
    CreditCard,
    Flag,
    Plus,
    Save,
    Trophy,
    Users,
} from 'lucide-react'
import {
    COUNTRY_OPTIONS,
    DEFAULT_DIVISIONS,
    DEFAULT_POINTS_TABLE,
    formatCompetitionDate,
    getCompetitionDivisions,
    getCompetitionMediaPosts,
    getSeasonLeaderboard,
    rankCompetitionEntrants,
} from '../lib/competition'
import { useStore } from '../store/useStore'

const inputClass = 'bg-background border-2 border-surface px-4 py-3 text-base font-sans uppercase tracking-wide outline-none focus:border-primary transition-colors text-white'
const textareaClass = `${inputClass} min-h-[140px] normal-case tracking-normal`
const selectClass = `${inputClass} cursor-pointer`
const panelClass = 'bg-slate-950 border-[3px] border-surface shadow-2xl relative overflow-hidden'

const createSeasonDraft = () => ({
    name: '',
    startDate: '',
    endDate: '',
    status: 'PLANNED',
    pointsTable: { ...DEFAULT_POINTS_TABLE },
})

const createCompetitionDraft = () => ({
    name: '',
    venue: '',
    countryCode: 'CA',
    startDate: '',
    status: 'DRAFT',
    signupLink: '',
    paymentLink: '',
    rules: {
        qualifyingSets: 3,
        shotsPerSet: 6,
        divisions: DEFAULT_DIVISIONS.map((division) => ({ ...division })),
    },
})

const createEntrantDraft = () => ({
    name: '',
    email: '',
    countryCode: 'CA',
    pool: 'A',
    paid: false,
    notes: '',
})

const tabs = [
    'seasons',
    'competitions',
    'signups',
    'scoring',
    'brackets',
    'media',
]

export default function AdminConsole() {
    const seasons = useStore((state) => state.seasons)
    const competitions = useStore((state) => state.competitions)
    const currentSeasonId = useStore((state) => state.currentSeasonId)
    const activeCompetitionId = useStore((state) => state.activeCompetitionId)
    const setCurrentSeason = useStore((state) => state.setCurrentSeason)
    const setActiveCompetition = useStore((state) => state.setActiveCompetition)
    const addSeason = useStore((state) => state.addSeason)
    const updateSeason = useStore((state) => state.updateSeason)
    const addCompetition = useStore((state) => state.addCompetition)
    const updateCompetition = useStore((state) => state.updateCompetition)
    const addEntrant = useStore((state) => state.addEntrant)
    const updateEntrantShot = useStore((state) => state.updateEntrantShot)
    const setEntrantPaymentStatus = useStore((state) => state.setEntrantPaymentStatus)
    const setBracketWinner = useStore((state) => state.setBracketWinner)

    const [activeTab, setActiveTab] = useState('seasons')
    const [seasonDraft, setSeasonDraft] = useState(createSeasonDraft())
    const [competitionDraft, setCompetitionDraft] = useState(createCompetitionDraft())
    const [entrantDraft, setEntrantDraft] = useState(createEntrantDraft())
    const [seasonSettings, setSeasonSettings] = useState(null)
    const [competitionSettings, setCompetitionSettings] = useState(null)
    const [selectedEntrantId, setSelectedEntrantId] = useState(null)
    const [copiedPostId, setCopiedPostId] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const currentSeason = seasons.find((season) => season.id === currentSeasonId) || seasons[0] || null
    const seasonCompetitions = competitions.filter((competition) => competition.seasonId === currentSeason?.id)
    const activeCompetition =
        seasonCompetitions.find((competition) => competition.id === activeCompetitionId)
        || seasonCompetitions[0]
        || null

    useEffect(() => {
        if (seasonCompetitions.length === 0) {
            return
        }

        if (!seasonCompetitions.some((competition) => competition.id === activeCompetitionId)) {
            setActiveCompetition(seasonCompetitions[0].id)
        }
    }, [seasonCompetitions, activeCompetitionId, setActiveCompetition])

    useEffect(() => {
        if (currentSeason) {
            setSeasonSettings({
                ...currentSeason,
                pointsTable: { ...currentSeason.pointsTable },
            })
        }
    }, [currentSeason])

    useEffect(() => {
        if (activeCompetition) {
            setCompetitionSettings({
                ...activeCompetition,
                rules: {
                    ...activeCompetition.rules,
                    divisions: activeCompetition.rules.divisions.map((division) => ({ ...division })),
                },
            })
        }
    }, [activeCompetition])

    const rankedEntrants = rankCompetitionEntrants(activeCompetition?.entrants || [])
    const divisions = activeCompetition ? getCompetitionDivisions(activeCompetition) : []
    const mediaPosts = activeCompetition ? getCompetitionMediaPosts(activeCompetition) : []
    const seasonLeaderboard = currentSeason ? getSeasonLeaderboard(currentSeason, competitions) : []
    const paidEntrants = rankedEntrants.filter((entrant) => entrant.paid).length
    const pendingEntrants = rankedEntrants.length - paidEntrants

    useEffect(() => {
        if (rankedEntrants.length === 0) {
            setSelectedEntrantId(null)
            return
        }

        if (!rankedEntrants.some((entrant) => entrant.id === selectedEntrantId)) {
            setSelectedEntrantId(rankedEntrants[0].id)
        }
    }, [rankedEntrants, selectedEntrantId])

    const selectedEntrant = rankedEntrants.find((entrant) => entrant.id === selectedEntrantId) || null
    const divisionLookup = {}

    divisions.forEach((division) => {
        division.entrants.forEach((entrant) => {
            divisionLookup[entrant.id] = division.name
        })
    })

    const handleSeasonPointsChange = (finish, value) => {
        setSeasonSettings((current) => ({
            ...current,
            pointsTable: {
                ...current.pointsTable,
                [finish]: Number(value) || 0,
            },
        }))
    }

    const handleCompetitionRuleChange = (field, value) => {
        setCompetitionSettings((current) => ({
            ...current,
            rules: {
                ...current.rules,
                [field]: Number(value) || 0,
            },
        }))
    }

    const handleDivisionSizeChange = (index, value) => {
        setCompetitionSettings((current) => ({
            ...current,
            rules: {
                ...current.rules,
                divisions: current.rules.divisions.map((division, divisionIndex) =>
                    divisionIndex === index
                        ? { ...division, size: Number(value) || 0 }
                        : division,
                ),
            },
        }))
    }

    const handleCreateSeason = () => {
        addSeason(seasonDraft)
        setSeasonDraft(createSeasonDraft())
    }

    const handleCreateCompetition = () => {
        if (!currentSeason) {
            return
        }

        addCompetition(currentSeason.id, competitionDraft)
        setCompetitionDraft(createCompetitionDraft())
    }

    const handleAddEntrant = () => {
        if (!activeCompetition) {
            return
        }

        addEntrant(activeCompetition.id, entrantDraft)
        setEntrantDraft(createEntrantDraft())
    }

    const handleCopyCaption = async (post) => {
        if (!navigator?.clipboard) {
            return
        }

        await navigator.clipboard.writeText(post.caption)
        setCopiedPostId(post.id)
        window.setTimeout(() => setCopiedPostId(null), 1600)
    }

    return (
        <div className="min-h-screen pt-28 pb-10 px-4 md:px-8 max-w-[1500px] mx-auto">
            <div className={`${panelClass} p-6 mb-6`}>
                <div className="absolute top-0 right-0 w-[360px] h-[360px] bg-primary/10 blur-[120px] pointer-events-none"></div>
                <div className="relative z-10 flex flex-col gap-6">
                    <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6">
                        <div>
                            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-3">Owner Console</p>
                            <h1 className="font-sans text-5xl md:text-7xl font-bold uppercase tracking-tight text-white">
                                Seasons, competitions, payments, brackets.
                            </h1>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:min-w-[540px]">
                            <label className="flex flex-col gap-2">
                                <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">Season</span>
                                <select
                                    value={currentSeason?.id || ''}
                                    onChange={(event) => setCurrentSeason(event.target.value)}
                                    className={selectClass}
                                >
                                    {seasons.map((season) => (
                                        <option key={season.id} value={season.id}>
                                            {season.name}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className="flex flex-col gap-2">
                                <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">Competition</span>
                                <select
                                    value={activeCompetition?.id || ''}
                                    onChange={(event) => setActiveCompetition(event.target.value)}
                                    className={selectClass}
                                >
                                    {seasonCompetitions.map((competition) => (
                                        <option key={competition.id} value={competition.id}>
                                            {competition.name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-5 py-3 font-sans font-bold uppercase tracking-[0.2em] transition-colors ${
                                    activeTab === tab
                                        ? 'bg-primary text-black'
                                        : 'bg-background text-white/60 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {activeTab === 'seasons' && currentSeason && seasonSettings && (
                <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_420px] gap-6">
                    <section className={`${panelClass} p-6`}>
                        <div className="flex items-center gap-3 mb-6">
                            <Trophy className="text-primary" />
                            <h2 className="font-sans text-3xl font-bold uppercase">Season settings</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <label className="flex flex-col gap-2">
                                <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">Season name</span>
                                <input
                                    value={seasonSettings.name}
                                    onChange={(event) => setSeasonSettings((current) => ({ ...current, name: event.target.value }))}
                                    className={inputClass}
                                />
                            </label>
                            <label className="flex flex-col gap-2">
                                <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">Status</span>
                                <select
                                    value={seasonSettings.status}
                                    onChange={(event) => setSeasonSettings((current) => ({ ...current, status: event.target.value }))}
                                    className={selectClass}
                                >
                                    <option value="PLANNED">Planned</option>
                                    <option value="LIVE">Live</option>
                                    <option value="ARCHIVED">Archived</option>
                                </select>
                            </label>
                            <label className="flex flex-col gap-2">
                                <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">Start date</span>
                                <input
                                    type="date"
                                    value={seasonSettings.startDate}
                                    onChange={(event) => setSeasonSettings((current) => ({ ...current, startDate: event.target.value }))}
                                    className={inputClass}
                                />
                            </label>
                            <label className="flex flex-col gap-2">
                                <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">End date</span>
                                <input
                                    type="date"
                                    value={seasonSettings.endDate}
                                    onChange={(event) => setSeasonSettings((current) => ({ ...current, endDate: event.target.value }))}
                                    className={inputClass}
                                />
                            </label>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
                            {Object.entries(seasonSettings.pointsTable).map(([finish, points]) => (
                                <label key={finish} className="flex flex-col gap-2">
                                    <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">{finish}</span>
                                    <input
                                        type="number"
                                        min="0"
                                        value={points}
                                        onChange={(event) => handleSeasonPointsChange(finish, event.target.value)}
                                        className={inputClass}
                                    />
                                </label>
                            ))}
                        </div>

                        <div className="mt-6 flex gap-4">
                            <button
                                onClick={() => updateSeason(currentSeason.id, seasonSettings)}
                                className="bg-primary text-black hover:bg-white px-6 py-4 font-sans font-bold uppercase tracking-wider flex items-center gap-3 transition-colors"
                            >
                                <Save size={18} strokeWidth={3} /> Save season
                            </button>
                        </div>

                        <div className="mt-8 border-t border-white/10 pt-6">
                            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">Current season leaderboard</p>
                            <div className="space-y-3">
                                {seasonLeaderboard.map((row) => (
                                    <div key={row.playerId} className="bg-background border border-white/10 p-4 flex items-center justify-between">
                                        <div>
                                            <p className="font-sans text-xl font-bold uppercase text-white">
                                                #{row.rank} {row.flagEmoji} {row.name}
                                            </p>
                                            <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mt-2">
                                                {row.eventsPlayed} events • {row.wins} wins
                                            </p>
                                        </div>
                                        <p className="font-sans text-3xl font-bold text-primary">{row.points}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <aside className={`${panelClass} p-6`}>
                        <div className="flex items-center gap-3 mb-6">
                            <Plus className="text-primary" />
                            <h2 className="font-sans text-3xl font-bold uppercase">New season</h2>
                        </div>

                        <div className="space-y-4">
                            <label className="flex flex-col gap-2">
                                <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">Name</span>
                                <input
                                    value={seasonDraft.name}
                                    onChange={(event) => setSeasonDraft((current) => ({ ...current, name: event.target.value }))}
                                    className={inputClass}
                                />
                            </label>
                            <label className="flex flex-col gap-2">
                                <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">Start date</span>
                                <input
                                    type="date"
                                    value={seasonDraft.startDate}
                                    onChange={(event) => setSeasonDraft((current) => ({ ...current, startDate: event.target.value }))}
                                    className={inputClass}
                                />
                            </label>
                            <label className="flex flex-col gap-2">
                                <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">End date</span>
                                <input
                                    type="date"
                                    value={seasonDraft.endDate}
                                    onChange={(event) => setSeasonDraft((current) => ({ ...current, endDate: event.target.value }))}
                                    className={inputClass}
                                />
                            </label>
                            <button
                                onClick={handleCreateSeason}
                                className="w-full bg-primary text-black hover:bg-white px-6 py-4 font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-3 transition-colors"
                            >
                                <Plus size={18} strokeWidth={3} /> Create season
                            </button>
                        </div>
                    </aside>
                </div>
            )}

            {activeTab === 'competitions' && currentSeason && (
                <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_420px] gap-6">
                    <section className={`${panelClass} p-6`}>
                        {competitionSettings && (
                            <>
                                <div className="flex items-center gap-3 mb-6">
                                    <Calendar className="text-primary" />
                                    <h2 className="font-sans text-3xl font-bold uppercase">Competition builder</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <label className="flex flex-col gap-2">
                                        <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">Event name</span>
                                        <input
                                            value={competitionSettings.name}
                                            onChange={(event) => setCompetitionSettings((current) => ({ ...current, name: event.target.value }))}
                                            className={inputClass}
                                        />
                                    </label>
                                    <label className="flex flex-col gap-2">
                                        <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">Venue</span>
                                        <input
                                            value={competitionSettings.venue}
                                            onChange={(event) => setCompetitionSettings((current) => ({ ...current, venue: event.target.value }))}
                                            className={inputClass}
                                        />
                                    </label>
                                    <label className="flex flex-col gap-2">
                                        <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">Date</span>
                                        <input
                                            type="date"
                                            value={competitionSettings.startDate}
                                            onChange={(event) => setCompetitionSettings((current) => ({ ...current, startDate: event.target.value }))}
                                            className={inputClass}
                                        />
                                    </label>
                                    <label className="flex flex-col gap-2">
                                        <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">Host country</span>
                                        <select
                                            value={competitionSettings.countryCode}
                                            onChange={(event) => setCompetitionSettings((current) => ({ ...current, countryCode: event.target.value }))}
                                            className={selectClass}
                                        >
                                            {COUNTRY_OPTIONS.map((country) => (
                                                <option key={country.code} value={country.code}>
                                                    {country.name}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                    <label className="flex flex-col gap-2">
                                        <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">Status</span>
                                        <select
                                            value={competitionSettings.status}
                                            onChange={(event) => setCompetitionSettings((current) => ({ ...current, status: event.target.value }))}
                                            className={selectClass}
                                        >
                                            <option value="DRAFT">Draft</option>
                                            <option value="OPEN">Open</option>
                                            <option value="LIVE">Live</option>
                                            <option value="COMPLETED">Completed</option>
                                        </select>
                                    </label>
                                    <label className="flex flex-col gap-2">
                                        <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">Qualifying sets</span>
                                        <input
                                            type="number"
                                            min="1"
                                            value={competitionSettings.rules.qualifyingSets}
                                            onChange={(event) => handleCompetitionRuleChange('qualifyingSets', event.target.value)}
                                            className={inputClass}
                                        />
                                    </label>
                                    <label className="flex flex-col gap-2">
                                        <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">Shots per set</span>
                                        <input
                                            type="number"
                                            min="1"
                                            value={competitionSettings.rules.shotsPerSet}
                                            onChange={(event) => handleCompetitionRuleChange('shotsPerSet', event.target.value)}
                                            className={inputClass}
                                        />
                                    </label>
                                    <label className="flex flex-col gap-2">
                                        <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">Signup link</span>
                                        <input
                                            value={competitionSettings.signupLink}
                                            onChange={(event) => setCompetitionSettings((current) => ({ ...current, signupLink: event.target.value }))}
                                            className={inputClass}
                                        />
                                    </label>
                                    <label className="flex flex-col gap-2 md:col-span-2">
                                        <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">Payment link</span>
                                        <input
                                            value={competitionSettings.paymentLink}
                                            onChange={(event) => setCompetitionSettings((current) => ({ ...current, paymentLink: event.target.value }))}
                                            className={inputClass}
                                        />
                                    </label>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                    {competitionSettings.rules.divisions.map((division, index) => (
                                        <div key={division.id} className="bg-background border border-white/10 p-4">
                                            <p className="font-sans text-lg font-bold uppercase text-white">{division.name}</p>
                                            <label className="flex flex-col gap-2 mt-4">
                                                <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">Bracket size</span>
                                                <input
                                                    type="number"
                                                    min="2"
                                                    value={division.size}
                                                    onChange={(event) => handleDivisionSizeChange(index, event.target.value)}
                                                    className={inputClass}
                                                />
                                            </label>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 flex gap-4">
                                    <button
                                        onClick={() => updateCompetition(activeCompetition.id, competitionSettings)}
                                        className="bg-primary text-black hover:bg-white px-6 py-4 font-sans font-bold uppercase tracking-wider flex items-center gap-3 transition-colors"
                                    >
                                        <Save size={18} strokeWidth={3} /> Save competition
                                    </button>
                                </div>
                            </>
                        )}
                    </section>

                    <aside className={`${panelClass} p-6`}>
                        <div className="flex items-center gap-3 mb-6">
                            <Plus className="text-primary" />
                            <h2 className="font-sans text-3xl font-bold uppercase">New competition</h2>
                        </div>

                        <div className="space-y-4">
                            <input
                                placeholder="Competition name"
                                value={competitionDraft.name}
                                onChange={(event) => setCompetitionDraft((current) => ({ ...current, name: event.target.value }))}
                                className={inputClass}
                            />
                            <input
                                placeholder="Venue"
                                value={competitionDraft.venue}
                                onChange={(event) => setCompetitionDraft((current) => ({ ...current, venue: event.target.value }))}
                                className={inputClass}
                            />
                            <input
                                type="date"
                                value={competitionDraft.startDate}
                                onChange={(event) => setCompetitionDraft((current) => ({ ...current, startDate: event.target.value }))}
                                className={inputClass}
                            />
                            <select
                                value={competitionDraft.countryCode}
                                onChange={(event) => setCompetitionDraft((current) => ({ ...current, countryCode: event.target.value }))}
                                className={selectClass}
                            >
                                {COUNTRY_OPTIONS.map((country) => (
                                    <option key={country.code} value={country.code}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={handleCreateCompetition}
                                className="w-full bg-primary text-black hover:bg-white px-6 py-4 font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-3 transition-colors"
                            >
                                <Plus size={18} strokeWidth={3} /> Create competition
                            </button>
                        </div>

                        <div className="mt-8 border-t border-white/10 pt-6 space-y-3">
                            {seasonCompetitions.map((competition) => (
                                <button
                                    key={competition.id}
                                    onClick={() => setActiveCompetition(competition.id)}
                                    className={`w-full text-left border p-4 transition-colors ${
                                        activeCompetition?.id === competition.id
                                            ? 'border-primary bg-primary/10'
                                            : 'border-white/10 bg-background hover:border-white/20'
                                    }`}
                                >
                                    <p className="font-sans text-lg font-bold uppercase text-white">{competition.name}</p>
                                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mt-2">
                                        {competition.status} • {formatCompetitionDate(competition.startDate)}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </aside>
                </div>
            )}

            {activeTab === 'signups' && activeCompetition && (
                <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_380px] gap-6">
                    <section className={`${panelClass} p-6`}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-background border border-white/10 p-4">
                                <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mb-2">Total signups</p>
                                <p className="font-sans text-4xl font-bold text-white">{rankedEntrants.length}</p>
                            </div>
                            <div className="bg-background border border-white/10 p-4">
                                <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mb-2">Paid</p>
                                <p className="font-sans text-4xl font-bold text-primary">{paidEntrants}</p>
                            </div>
                            <div className="bg-background border border-white/10 p-4">
                                <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mb-2">Pending</p>
                                <p className="font-sans text-4xl font-bold text-red-400">{pendingEntrants}</p>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[900px]">
                                <thead>
                                    <tr className="border-b border-white/10 text-left">
                                        <th className="py-4 pr-4 font-mono text-xs uppercase tracking-[0.3em] text-white/40">Player</th>
                                        <th className="py-4 pr-4 font-mono text-xs uppercase tracking-[0.3em] text-white/40">Pool</th>
                                        <th className="py-4 pr-4 font-mono text-xs uppercase tracking-[0.3em] text-white/40">Email</th>
                                        <th className="py-4 pr-4 font-mono text-xs uppercase tracking-[0.3em] text-white/40">Payment</th>
                                        <th className="py-4 pr-4 font-mono text-xs uppercase tracking-[0.3em] text-white/40">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rankedEntrants.map((entrant) => (
                                        <tr key={entrant.id} className="border-b border-white/5">
                                            <td className="py-4 pr-4">
                                                <p className="font-sans text-lg font-bold uppercase text-white">
                                                    {entrant.flagEmoji} {entrant.name}
                                                </p>
                                                <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mt-2">
                                                    {entrant.countryName}
                                                </p>
                                            </td>
                                            <td className="py-4 pr-4 font-mono text-sm text-white/60">{entrant.pool}</td>
                                            <td className="py-4 pr-4 font-mono text-sm text-white/60">{entrant.email}</td>
                                            <td className="py-4 pr-4">
                                                <span className={`font-mono text-xs uppercase tracking-[0.3em] ${entrant.paid ? 'text-primary' : 'text-red-400'}`}>
                                                    {entrant.paid ? 'Paid' : 'Pending'}
                                                </span>
                                            </td>
                                            <td className="py-4 pr-4">
                                                <button
                                                    onClick={() => setEntrantPaymentStatus(activeCompetition.id, entrant.id, !entrant.paid)}
                                                    className={`px-4 py-2 font-sans font-bold uppercase tracking-[0.2em] ${
                                                        entrant.paid
                                                            ? 'bg-white/10 text-white hover:bg-white/20'
                                                            : 'bg-primary text-black hover:bg-white'
                                                    } transition-colors`}
                                                >
                                                    {entrant.paid ? 'Mark unpaid' : 'Mark paid'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <aside className={`${panelClass} p-6`}>
                        <div className="flex items-center gap-3 mb-6">
                            <Users className="text-primary" />
                            <h2 className="font-sans text-3xl font-bold uppercase">New signup</h2>
                        </div>

                        <div className="space-y-4">
                            <input
                                placeholder="Player name"
                                value={entrantDraft.name}
                                onChange={(event) => setEntrantDraft((current) => ({ ...current, name: event.target.value }))}
                                className={inputClass}
                            />
                            <input
                                placeholder="Email"
                                value={entrantDraft.email}
                                onChange={(event) => setEntrantDraft((current) => ({ ...current, email: event.target.value }))}
                                className={inputClass}
                            />
                            <select
                                value={entrantDraft.countryCode}
                                onChange={(event) => setEntrantDraft((current) => ({ ...current, countryCode: event.target.value }))}
                                className={selectClass}
                            >
                                {COUNTRY_OPTIONS.map((country) => (
                                    <option key={country.code} value={country.code}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={entrantDraft.pool}
                                onChange={(event) => setEntrantDraft((current) => ({ ...current, pool: event.target.value }))}
                                className={selectClass}
                            >
                                <option value="A">Pool A</option>
                                <option value="B">Pool B</option>
                                <option value="C">Pool C</option>
                            </select>
                            <label className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-white/50">
                                <input
                                    type="checkbox"
                                    checked={entrantDraft.paid}
                                    onChange={(event) => setEntrantDraft((current) => ({ ...current, paid: event.target.checked }))}
                                />
                                Paid already
                            </label>
                            <textarea
                                placeholder="Notes"
                                value={entrantDraft.notes}
                                onChange={(event) => setEntrantDraft((current) => ({ ...current, notes: event.target.value }))}
                                className={textareaClass}
                            />
                            <a
                                href={activeCompetition.paymentLink}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-primary"
                            >
                                <CreditCard size={14} /> Open payment link
                            </a>
                            <button
                                onClick={handleAddEntrant}
                                className="w-full bg-primary text-black hover:bg-white px-6 py-4 font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-3 transition-colors"
                            >
                                <Plus size={18} strokeWidth={3} /> Add entrant
                            </button>
                        </div>
                    </aside>
                </div>
            )}

            {activeTab === 'scoring' && activeCompetition && (
                <div className="grid grid-cols-1 xl:grid-cols-[340px_minmax(0,1fr)] gap-6">
                    <aside className={`${panelClass} p-4`}>
                        <div className="space-y-3">
                            {rankedEntrants.map((entrant) => (
                                <button
                                    key={entrant.id}
                                    onClick={() => setSelectedEntrantId(entrant.id)}
                                    className={`w-full text-left border p-4 transition-colors ${
                                        selectedEntrantId === entrant.id
                                            ? 'border-primary bg-primary/10'
                                            : 'border-white/10 bg-background hover:border-white/20'
                                    }`}
                                >
                                    <p className="font-sans text-lg font-bold uppercase text-white">
                                        #{entrant.rank} {entrant.flagEmoji} {entrant.name}
                                    </p>
                                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mt-2">
                                        {entrant.bestDistance || '-'} long • {divisionLookup[entrant.id] || 'Qualifier only'}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </aside>

                    <section className={`${panelClass} p-6`}>
                        {selectedEntrant ? (
                            <>
                                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
                                    <div>
                                        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-3">Shot entry</p>
                                        <h2 className="font-sans text-5xl font-bold uppercase text-white">
                                            {selectedEntrant.flagEmoji} {selectedEntrant.name}
                                        </h2>
                                        <p className="font-mono text-sm uppercase tracking-[0.3em] text-white/40 mt-3">
                                            {divisionLookup[selectedEntrant.id] || 'Qualifier only'} • Pool {selectedEntrant.pool}
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-background border border-white/10 p-4">
                                            <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mb-2">Best drive</p>
                                            <p className="font-sans text-4xl font-bold text-primary">{selectedEntrant.bestDistance || '-'}</p>
                                        </div>
                                        <div className="bg-background border border-white/10 p-4">
                                            <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mb-2">Payment</p>
                                            <p className={`font-sans text-2xl font-bold uppercase ${selectedEntrant.paid ? 'text-primary' : 'text-red-400'}`}>
                                                {selectedEntrant.paid ? 'Paid' : 'Pending'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {selectedEntrant.sets.map((setItem) => {
                                        const setLong = Math.max(0, ...setItem.shots)

                                        return (
                                            <div key={setItem.id} className="bg-background border border-white/10 p-5">
                                                <div className="flex items-center justify-between mb-4">
                                                    <p className="font-sans text-2xl font-bold uppercase text-white">Set 0{setItem.id}</p>
                                                    <p className="font-mono text-sm uppercase tracking-[0.3em] text-primary">Long {setLong || '-'}</p>
                                                </div>
                                                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
                                                    {setItem.shots.map((shot, index) => (
                                                        <label key={index} className="flex flex-col gap-2">
                                                            <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">Shot {index + 1}</span>
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                value={shot}
                                                                onChange={(event) => updateEntrantShot(activeCompetition.id, selectedEntrant.id, setItem.id, index, event.target.value)}
                                                                className={inputClass}
                                                            />
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <p className="font-sans text-3xl font-bold uppercase tracking-[0.2em] text-white/30">Select an entrant to score.</p>
                            </div>
                        )}
                    </section>
                </div>
            )}

            {activeTab === 'brackets' && activeCompetition && (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {divisions.map((division) => (
                        <section key={division.id} className={`${panelClass} p-6`}>
                            <div className="flex items-end justify-between mb-6">
                                <div>
                                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-3">Division bracket</p>
                                    <h2 className="font-sans text-3xl font-bold uppercase text-white">{division.name}</h2>
                                </div>
                                <div className="text-right">
                                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mb-2">Champion</p>
                                    <p className="font-sans text-xl font-bold uppercase text-primary">
                                        {division.rounds[division.rounds.length - 1]?.[0]?.winner
                                            ? `${division.rounds[division.rounds.length - 1][0].winner.flagEmoji} ${division.rounds[division.rounds.length - 1][0].winner.name}`
                                            : 'TBD'}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {division.rounds.map((round, roundIndex) => (
                                    <div key={roundIndex} className="space-y-4">
                                        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Round {roundIndex + 1}</p>
                                        {round.map((match) => (
                                            <div key={match.id} className="bg-background border border-white/10 p-4 space-y-2">
                                                {match.entrants.map((entrant, entrantIndex) => (
                                                    <button
                                                        key={`${match.id}-${entrantIndex}`}
                                                        disabled={!entrant}
                                                        onClick={() => entrant && setBracketWinner(activeCompetition.id, division.id, match.roundIndex, match.matchIndex, entrant.id)}
                                                        className={`w-full flex items-center justify-between px-3 py-3 text-left transition-colors ${
                                                            match.winner?.id === entrant?.id
                                                                ? 'bg-primary text-black'
                                                                : 'bg-slate-950 text-white hover:bg-white/5'
                                                        } ${!entrant ? 'cursor-not-allowed text-white/25' : ''}`}
                                                    >
                                                        <span className="font-sans text-sm font-bold uppercase">
                                                            {entrant ? `${entrant.seed}. ${entrant.flagEmoji} ${entrant.name}` : 'BYE'}
                                                        </span>
                                                        <span className="font-mono text-xs">{entrant?.bestDistance || '-'}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            )}

            {activeTab === 'media' && activeCompetition && (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {mediaPosts.map((post) => (
                        <section key={post.id} className={`${panelClass} p-6`}>
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-3">Winner content</p>
                                    <h2 className="font-sans text-3xl font-bold uppercase text-white">
                                        {post.flagEmoji} {post.championName}
                                    </h2>
                                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mt-3">
                                        {post.divisionName}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleCopyCaption(post)}
                                    className="bg-primary text-black hover:bg-white px-4 py-3 font-sans font-bold uppercase tracking-[0.2em] flex items-center gap-2 transition-colors"
                                >
                                    <Copy size={16} strokeWidth={3} /> {copiedPostId === post.id ? 'Copied' : 'Copy'}
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-background border border-white/10 p-4">
                                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mb-2">Asset to render</p>
                                    <p className="font-sans text-xl font-bold uppercase text-white">{post.assetName}</p>
                                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mt-2">
                                        Use the premade winner-card template and insert the champion flag and division mark.
                                    </p>
                                </div>
                                <textarea value={post.caption} readOnly className={textareaClass} />
                                <textarea value={post.storyCaption} readOnly className={textareaClass} />
                            </div>
                        </section>
                    ))}
                    {mediaPosts.length === 0 && (
                        <div className={`${panelClass} p-8 xl:col-span-2 text-center`}>
                            <Flag className="mx-auto text-primary mb-4" size={32} />
                            <p className="font-sans text-3xl font-bold uppercase text-white/60">
                                Finish the brackets to generate winner captions and asset briefs.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
