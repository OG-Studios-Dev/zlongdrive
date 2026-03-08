import React, { useEffect } from 'react'
import { formatCompetitionDate, getCompetitionDivisions } from '../lib/competition'
import { useStore } from '../store/useStore'

export default function Bracket() {
    const competitions = useStore((state) => state.competitions)
    const activeCompetitionId = useStore((state) => state.activeCompetitionId)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const activeCompetition =
        competitions.find((competition) => competition.id === activeCompetitionId) || competitions[0] || null

    if (!activeCompetition) {
        return null
    }

    const divisions = getCompetitionDivisions(activeCompetition)

    return (
        <div className="min-h-screen pt-24 pb-8 px-4 lg:px-12 max-w-[1800px] mx-auto flex flex-col">
            <div className="mb-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 border-b pb-4 border-white/10 shrink-0">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <span className="font-sans text-[10px] md:text-xs text-primary tracking-widest font-bold border border-primary px-2 py-0.5 bg-primary/10 uppercase">
                            {activeCompetition.status} bracket
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold uppercase tracking-tight text-white drop-shadow-md leading-none">
                        {activeCompetition.name}
                    </h1>
                    <p className="mt-3 font-mono text-sm uppercase tracking-[0.3em] text-white/40">
                        {activeCompetition.venue} • {formatCompetitionDate(activeCompetition.startDate)}
                    </p>
                </div>
                <div className="text-right hidden sm:block">
                    <p className="font-mono text-primary text-sm font-bold uppercase tracking-widest">Division champions</p>
                    <p className="font-sans text-white/50 text-sm uppercase tracking-wide">Single elimination after 3x6 qualifying</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {divisions.map((division) => (
                    <section key={division.id} className="bg-slate-950/80 border border-white/10 shadow-[0_0_50px_rgba(62,231,16,0.03)] rounded-lg p-6 lg:p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] pointer-events-none rounded-full"></div>
                        <div className="relative z-10">
                            <div className="flex items-end justify-between mb-6">
                                <div>
                                    <h2 className="font-sans text-3xl font-bold uppercase text-white">{division.name}</h2>
                                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mt-2">
                                        {division.entrants.length} qualified entrants
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">Champion</p>
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
                                        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                                            Round {roundIndex + 1}
                                        </p>
                                        {round.map((match) => (
                                            <div key={match.id} className="bg-background border border-white/10 p-4">
                                                {match.entrants.map((entrant, entrantIndex) => (
                                                    <div
                                                        key={`${match.id}-${entrantIndex}`}
                                                        className={`flex items-center justify-between py-2 ${
                                                            entrantIndex === 0 ? 'border-b border-white/5' : ''
                                                        } ${match.winner?.id === entrant?.id ? 'text-primary' : 'text-white/70'}`}
                                                    >
                                                        <span className="font-sans text-sm font-bold uppercase tracking-wide">
                                                            {entrant ? `${entrant.seed}. ${entrant.flagEmoji} ${entrant.name}` : 'BYE'}
                                                        </span>
                                                        <span className="font-mono text-xs">{entrant?.bestDistance || '-'}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                ))}
            </div>
        </div>
    )
}
