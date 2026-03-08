import React, { useEffect } from 'react'
import { useStore } from '../store/useStore'

export default function Standings() {
    const seasons = useStore((state) => state.seasons)
    const competitions = useStore((state) => state.competitions)
    const currentSeasonId = useStore((state) => state.currentSeasonId)
    const setCurrentSeason = useStore((state) => state.setCurrentSeason)
    const currentSeason = seasons.find((season) => season.id === currentSeasonId) || seasons[0] || null
    const standings = useStore((state) => state.getSeasonLeaderboard(currentSeason?.id))

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if (!currentSeason) {
        return null
    }

    const completedEvents = competitions.filter(
        (competition) => competition.seasonId === currentSeason.id && competition.status === 'COMPLETED',
    ).length

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-[1200px] mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-end gap-6 mb-12">
                <div className="border-l-4 border-primary pl-6">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="font-sans text-sm text-primary tracking-widest font-bold border-2 border-primary px-3 py-1 bg-primary/10 shadow-[0_0_10px_rgba(57,255,20,0.2)]">
                            {currentSeason.status}
                        </span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-sans font-bold uppercase tracking-tight text-white drop-shadow-md">
                        {currentSeason.name}
                    </h1>
                    <p className="mt-3 font-mono text-sm uppercase tracking-[0.3em] text-white/40">
                        {completedEvents} completed competitions counting toward the leaderboard
                    </p>
                </div>

                <select
                    value={currentSeason.id}
                    onChange={(event) => setCurrentSeason(event.target.value)}
                    className="bg-surface border-2 border-white/20 text-white rounded-none px-6 py-3 text-lg font-sans font-bold uppercase tracking-wider outline-none cursor-pointer hover:border-primary transition-colors"
                >
                    {seasons.map((season) => (
                        <option key={season.id} value={season.id}>
                            {season.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                {Object.entries(currentSeason.pointsTable).map(([finish, points]) => (
                    <div key={finish} className="bg-surface border border-white/10 p-4">
                        <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mb-2">{finish}</p>
                        <p className="font-sans text-3xl font-bold text-primary">{points}</p>
                    </div>
                ))}
            </div>

            <div className="w-full bg-surface border-[3px] border-surface shadow-[0_0_30px_rgba(57,255,20,0.05)] overflow-hidden relative">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 blur-[100px] pointer-events-none"></div>

                <table className="w-full text-left border-collapse relative z-10">
                    <thead>
                        <tr className="bg-slate-950 border-b-2 border-white/10 shadow-lg">
                            <th className="p-6 font-sans text-xl text-text/50 tracking-widest uppercase w-20 text-center">Rnk</th>
                            <th className="p-6 font-sans text-xl text-text/50 tracking-widest uppercase">Competitor</th>
                            <th className="p-6 font-sans text-xl text-text/50 tracking-widest uppercase text-center hidden md:table-cell">Events</th>
                            <th className="p-6 font-sans text-xl text-text/50 tracking-widest uppercase text-center hidden lg:table-cell">Wins</th>
                            <th className="p-6 font-sans text-2xl text-primary tracking-widest uppercase text-right">Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {standings.map((entrant, index) => (
                            <tr
                                key={entrant.playerId}
                                className={`border-b border-white/5 transition-all hover:bg-white/5 group ${
                                    index === 0 ? 'bg-primary/5 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'
                                }`}
                            >
                                <td className={`p-6 font-sans text-4xl text-center font-bold ${index === 0 ? 'text-primary' : 'text-white/50'}`}>
                                    {entrant.rank}
                                </td>
                                <td className="p-6">
                                    <p className="font-sans text-3xl font-bold uppercase tracking-wide">
                                        {entrant.flagEmoji} {entrant.name}
                                    </p>
                                </td>
                                <td className="p-6 text-center font-mono text-lg text-white/50 hidden md:table-cell">
                                    {entrant.eventsPlayed}
                                </td>
                                <td className="p-6 text-center font-mono text-lg text-white/50 hidden lg:table-cell">
                                    {entrant.wins}
                                </td>
                                <td className="p-6 text-right font-sans font-bold text-5xl text-primary">
                                    {entrant.points.toLocaleString()}
                                </td>
                            </tr>
                        ))}
                        {standings.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-10 text-center text-text/50 font-sans text-xl uppercase tracking-widest">
                                    No completed events are contributing to this season yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
