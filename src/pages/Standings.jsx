import React, { useEffect } from 'react'
import { useStore } from '../store/useStore'

export default function Standings() {
    const standings = useStore(state => state.standings)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-[1200px] mx-auto">
            <div className="mb-12 border-l-4 border-primary pl-6">
                <div className="flex items-center gap-3 mb-2">
                    <span className="font-sans text-sm text-primary tracking-widest font-bold border-2 border-primary px-3 py-1 bg-primary/10 shadow-[0_0_10px_rgba(57,255,20,0.2)]">SEASON 25/26</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-sans font-bold uppercase tracking-tight text-white drop-shadow-md">Global Standings.</h1>
            </div>

            <div className="w-full bg-surface border-[3px] border-surface shadow-[0_0_30px_rgba(57,255,20,0.05)] overflow-hidden relative">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 blur-[100px] pointer-events-none"></div>

                <table className="w-full text-left border-collapse relative z-10">
                    <thead>
                        <tr className="bg-slate-950 border-b-2 border-white/10 shadow-lg">
                            <th className="p-6 font-sans text-xl text-text/50 tracking-widest uppercase w-20 text-center">Rnk</th>
                            <th className="p-6 font-sans text-xl text-text/50 tracking-widest uppercase">Competitor</th>
                            <th className="p-6 font-sans text-xl text-text/50 tracking-widest uppercase text-center hidden md:table-cell">Events</th>
                            <th className="p-6 font-sans text-2xl text-primary tracking-widest uppercase text-right drop-shadow-[0_0_5px_rgba(57,255,20,0.5)]">Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {standings.map((hitter, idx) => (
                            <tr
                                key={idx}
                                className={`border-b border-white/5 transition-all hover:bg-white/5 group 
                  ${idx === 0 ? 'bg-primary/5 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'}`}
                            >
                                <td className={`p-6 font-sans text-4xl text-center font-bold ${idx === 0 ? 'text-primary drop-shadow-[0_0_8px_rgba(57,255,20,0.4)]' : 'text-white/50 group-hover:text-white'}`}>
                                    {hitter.rank}
                                </td>
                                <td className="p-6 font-sans text-3xl font-bold uppercase tracking-wide">{hitter.name}</td>
                                <td className="p-6 text-center font-mono text-lg text-white/50 hidden md:table-cell group-hover:text-white/80">{hitter.eventsPlayed}</td>
                                <td className="p-6 text-right font-sans font-bold text-5xl text-primary drop-shadow-[0_0_8px_rgba(57,255,20,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(57,255,20,0.6)]">
                                    {hitter.points.toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
