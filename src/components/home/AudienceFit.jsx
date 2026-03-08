import React from 'react'

const targets = [
    { group: "Event Owners", pain: "Messy spreadsheets, manual input errors", solution: "Configurable event templates & automated advancement rules." },
    { group: "Scorekeepers", pain: "Stressful pace, confusing live math", solution: "Fast intuitive set-entry interface that auto-calculates LONG." },
    { group: "Hitters", pain: "Blind to exact standings mid-event", solution: "Live mobile-friendly broadcast ranking board." },
    { group: "Spectators", pain: "Hard to follow who is advancing", solution: "Clear division tracking and match play finals visualizations." }
]

export default function AudienceFit() {
    return (
        <section className="py-32 px-6 max-w-[1400px] mx-auto">
            <div className="text-center md:text-left mb-16">
                <h2 className="text-4xl font-bold mb-4">Built for Everyone in the Arena.</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {targets.map((tgt, i) => (
                    <div key={i} className="bg-gradient-to-b from-surface to-background border border-white/5 rounded-3xl p-8 flex flex-col shadow-lg">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-2 h-2 rounded-full bg-primary/80"></div>
                            <h3 className="text-2xl font-bold">{tgt.group}</h3>
                        </div>

                        <div className="flex flex-col gap-6 h-full">
                            <div className="flex-1 bg-background/50 p-6 rounded-2xl border border-red-500/10 border-l-[3px] border-l-red-500/50">
                                <h4 className="text-xs text-red-400 font-data mb-2 uppercase tracking-widest">Pain Point</h4>
                                <p className="text-text/80 font-light">{tgt.pain}</p>
                            </div>

                            <div className="flex-1 bg-background/50 p-6 rounded-2xl border border-primary/10 border-l-[3px] border-l-primary/50">
                                <h4 className="text-xs text-primary/80 font-data mb-2 uppercase tracking-widest">ZLD Platform Solution</h4>
                                <p className="text-white font-medium">{tgt.solution}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
