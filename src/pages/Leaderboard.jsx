import React, { useEffect, useState } from 'react'
import { formatCompetitionDate, getCompetitionDivisions, rankCompetitionEntrants } from '../lib/competition'
import { useStore } from '../store/useStore'

export default function Leaderboard() {
    const competitions = useStore((state) => state.competitions)
    const activeCompetitionId = useStore((state) => state.activeCompetitionId)
    const [poolFilter, setPoolFilter] = useState('ALL')
    const [paymentFilter, setPaymentFilter] = useState('ALL')

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const activeCompetition =
        competitions.find((competition) => competition.id === activeCompetitionId) || competitions[0] || null
    const rankedEntrants = rankCompetitionEntrants(activeCompetition?.entrants || [])
    const divisionMap = {}

    getCompetitionDivisions(activeCompetition).forEach((division) => {
        division.entrants.forEach((entrant) => {
            divisionMap[entrant.id] = division.name
        })
    })

    const pools = ['ALL', ...new Set(rankedEntrants.map((entrant) => entrant.pool))]
    const visibleEntrants = rankedEntrants
        .filter((entrant) => poolFilter === 'ALL' || entrant.pool === poolFilter)
        .filter((entrant) => {
            if (paymentFilter === 'ALL') {
                return true
            }

            return paymentFilter === 'PAID' ? entrant.paid : !entrant.paid
        })

    const leader = visibleEntrants[0] || null

    if (!activeCompetition) {
        return null
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-[1400px] mx-auto">
            <div className="flex flex-col xl:flex-row justify-between items-end mb-12 gap-6 border-b-2 border-white/10 pb-6">
                <div className="border-l-4 border-primary pl-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.8)]"></div>
                        <span className="font-sans text-xl text-red-500 tracking-widest font-bold drop-shadow-md">{activeCompetition.status} EVENT</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-sans font-bold uppercase tracking-tight text-white drop-shadow-md">
                        {activeCompetition.name}
                    </h1>
                    <p className="mt-3 font-mono text-sm uppercase tracking-[0.3em] text-white/45">
                        {activeCompetition.venue} • {formatCompetitionDate(activeCompetition.startDate)}
                    </p>
                </div>

                <div className="flex gap-4 flex-wrap justify-end">
                    <select
                        value={poolFilter}
                        onChange={(event) => setPoolFilter(event.target.value)}
                        className="bg-surface border-2 border-white/20 text-white rounded-none px-6 py-3 text-lg font-sans font-bold uppercase tracking-wider outline-none cursor-pointer hover:border-primary transition-colors"
                    >
                        {pools.map((pool) => (
                            <option key={pool} value={pool}>
                                {pool === 'ALL' ? 'All Pools' : `Pool ${pool}`}
                            </option>
                        ))}
                    </select>
                    <select
                        value={paymentFilter}
                        onChange={(event) => setPaymentFilter(event.target.value)}
                        className="bg-surface border-2 border-white/20 text-white rounded-none px-6 py-3 text-lg font-sans font-bold uppercase tracking-wider outline-none cursor-pointer hover:border-primary transition-colors"
                    >
                        <option value="ALL">All Payments</option>
                        <option value="PAID">Paid</option>
                        <option value="UNPAID">Unpaid</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-surface border border-white/10 p-5">
                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mb-2">Signed Up</p>
                    <p className="font-sans text-4xl font-bold text-white">{rankedEntrants.length}</p>
                </div>
                <div className="bg-surface border border-white/10 p-5">
                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mb-2">Current Leader</p>
                    <p className="font-sans text-2xl font-bold text-white">{leader ? `${leader.flagEmoji} ${leader.name}` : 'No Qualifying Data'}</p>
                </div>
                <div className="bg-surface border border-white/10 p-5">
                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mb-2">Longest Drive</p>
                    <p className="font-sans text-4xl font-bold text-primary">{leader?.bestDistance || '-'}</p>
                </div>
            </div>

            <div className="w-full overflow-x-auto border-[3px] border-surface bg-slate-950 shadow-[0_0_30px_rgba(57,255,20,0.05)] relative">
                <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-primary/5 blur-[100px] pointer-events-none"></div>

                <table className="w-full text-left border-collapse min-w-[1180px] relative z-10">
                    <thead>
                        <tr className="bg-surface border-b-[3px] border-primary">
                            <th className="p-6 font-sans text-xl text-text/50 tracking-widest uppercase w-20 text-center">Rank</th>
                            <th className="p-6 font-sans text-xl text-text/50 tracking-widest uppercase">Competitor</th>
                            <th className="p-6 font-sans text-xl text-text/50 tracking-widest uppercase text-center">Pool</th>
                            <th className="p-6 font-sans text-xl text-text/50 tracking-widest uppercase text-center">Division</th>
                            <th className="p-6 font-sans text-xl tracking-widest uppercase text-center">Set 1</th>
                            <th className="p-6 font-sans text-xl tracking-widest uppercase text-center">Set 2</th>
                            <th className="p-6 font-sans text-xl tracking-widest uppercase text-center">Set 3</th>
                            <th className="p-6 font-sans text-xl tracking-widest uppercase text-center">Paid</th>
                            <th className="p-6 font-sans text-2xl text-primary font-bold tracking-widest uppercase text-right">Long</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visibleEntrants.map((entrant, index) => (
                            <tr
                                key={entrant.id}
                                className={`border-b border-white/10 transition-colors hover:bg-white/5 ${
                                    index === 0 ? 'bg-primary/10 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'
                                }`}
                            >
                                <td className="p-6 font-sans text-4xl text-center font-bold">
                                    <span className={index === 0 ? 'text-primary' : 'text-white/40'}>{entrant.rank}</span>
                                </td>
                                <td className="p-6">
                                    <p className="font-sans font-bold text-3xl uppercase tracking-wide text-white">
                                        {entrant.flagEmoji} {entrant.name}
                                    </p>
                                    <p className="font-mono text-sm text-white/40 uppercase tracking-[0.3em] mt-2">
                                        {entrant.countryName}
                                    </p>
                                </td>
                                <td className="p-6 text-center font-mono text-xl text-white/50">{entrant.pool}</td>
                                <td className="p-6 text-center font-mono text-sm text-white/70 uppercase tracking-[0.2em]">
                                    {divisionMap[entrant.id] || 'Qualifier Only'}
                                </td>
                                {entrant.sets.map((setItem) => (
                                    <td key={setItem.id} className="p-6 text-center font-mono text-xl text-white">
                                        {Math.max(0, ...setItem.shots) || '-'}
                                    </td>
                                ))}
                                <td className="p-6 text-center">
                                    <span className={`font-mono text-xs uppercase tracking-[0.3em] ${entrant.paid ? 'text-primary' : 'text-red-400'}`}>
                                        {entrant.paid ? 'Paid' : 'Pending'}
                                    </span>
                                </td>
                                <td className="p-6 text-right font-sans font-bold text-5xl text-primary">
                                    {entrant.bestDistance > 0 ? entrant.bestDistance : '-'}
                                </td>
                            </tr>
                        ))}
                        {visibleEntrants.length === 0 && (
                            <tr>
                                <td colSpan={9} className="p-10 text-center text-text/50 font-sans text-xl uppercase tracking-widest">
                                    No competitors matching the active filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
