import React, { useEffect } from 'react'
import { useStore } from '../store/useStore'
import { Trophy } from 'lucide-react'

export default function Leaderboard() {
    const getRankedHitters = useStore(state => state.getRankedHitters)
    const rankedHitters = getRankedHitters()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b-2 border-white/10 pb-6">
                <div className="border-l-4 border-primary pl-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.8)]"></div>
                        <span className="font-sans text-xl text-red-500 tracking-widest font-bold drop-shadow-md">LIVE BROADCAST</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-sans font-bold uppercase tracking-tight text-white drop-shadow-md">The Field.</h1>
                </div>

                <div className="flex gap-4">
                    <select className="bg-surface border-2 border-white/20 text-white rounded-none px-6 py-3 text-lg font-sans font-bold uppercase tracking-wider outline-none cursor-pointer hover:border-primary transition-colors">
                        <option>All Divisions</option>
                        <option>Men's Open</option>
                        <option>Women's Open</option>
                    </select>
                    <select className="bg-surface border-2 border-white/20 text-white rounded-none px-6 py-3 text-lg font-sans font-bold uppercase tracking-wider outline-none cursor-pointer hover:border-primary transition-colors">
                        <option>All Groups</option>
                        <option>Group A</option>
                        <option>Group B</option>
                        <option>Group C</option>
                    </select>
                </div>
            </div>

            <div className="w-full overflow-x-auto border-[3px] border-surface bg-slate-950 shadow-[0_0_30px_rgba(57,255,20,0.05)] relative">
                <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-primary/5 blur-[100px] pointer-events-none"></div>

                <table className="w-full text-left border-collapse min-w-[1000px] relative z-10">
                    <thead>
                        <tr className="bg-surface border-b-[3px] border-primary">
                            <th className="p-6 font-sans text-xl text-text/50 tracking-widest uppercase w-20 text-center">Rank</th>
                            <th className="p-6 font-sans text-xl text-text/50 tracking-widest uppercase">Competitor</th>
                            <th className="p-6 font-sans text-xl text-text/50 tracking-widest uppercase text-center">Group</th>
                            <th className="p-6 font-sans text-xl tracking-widest uppercase text-center">Set 1</th>
                            <th className="p-6 font-sans text-xl tracking-widest uppercase text-center">Set 2</th>
                            <th className="p-6 font-sans text-xl tracking-widest uppercase text-center">Set 3</th>
                            <th className="p-6 font-sans text-2xl text-primary font-bold tracking-widest uppercase text-right drop-shadow-[0_0_5px_rgba(57,255,20,0.5)]">LONG</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rankedHitters.map((hitter, idx) => (
                            <tr
                                key={hitter.id}
                                className={`border-b border-white/10 transition-colors hover:bg-white/5 group
                  ${idx === 0 ? 'bg-primary/10 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'}`
                                }
                            >
                                <td className="p-6 font-sans text-4xl text-center font-bold">
                                    {idx === 0 ? (
                                        <span className="text-primary drop-shadow-[0_0_10px_rgba(57,255,20,0.6)]">{hitter.rank}</span>
                                    ) : (
                                        <span className="text-white/40 group-hover:text-white">{hitter.rank}</span>
                                    )}
                                </td>
                                <td className="p-6 font-sans font-bold text-3xl uppercase tracking-wide flex items-center gap-4">
                                    {hitter.name}
                                    {idx === 0 && <Trophy size={24} className="text-primary drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]" />}
                                </td>
                                <td className="p-6 text-center font-mono text-xl text-white/50">{hitter.group}</td>

                                {hitter.sets.map((set, i) => (
                                    <td key={i} className={`p-6 text-center font-mono text-xl ${set.long > 0 ? 'text-white' : 'text-white/20'}`}>
                                        {set.long > 0 ? set.long : '-'}
                                    </td>
                                ))}

                                <td className="p-6 text-right font-sans font-bold text-5xl text-primary drop-shadow-[0_0_8px_rgba(57,255,20,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(57,255,20,0.6)] transition-all">
                                    {hitter.bestDistance > 0 ? hitter.bestDistance : '-'}
                                </td>
                            </tr>
                        ))}
                        {rankedHitters.length === 0 && (
                            <tr>
                                <td colSpan={7} className="p-10 text-center text-text/50 font-sans text-xl uppercase tracking-widest">No hitters matching criteria.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
