import React from 'react'

const signals = [
    "SEASON 25/26 LIVE",
    "GLOBAL RANKINGS",
    "ELITE BRACKET FORMATS",
    "CHAMPIONSHIP SERIES",
    "ALL SKILL LEVELS"
]

export default function TrustBar() {
    return (
        <div className="w-full border-y-2 border-primary/20 bg-surface/80 uppercase font-sans text-xl font-bold overflow-hidden relative z-20 shadow-[0_0_30px_rgba(57,255,20,0.1)]">
            <div className="max-w-[1400px] mx-auto px-6 py-4 flex flex-wrap justify-between items-center gap-8">
                {signals.map((signal, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                        <div className="w-2 h-2 bg-primary animate-pulse shadow-[0_0_8px_rgba(57,255,20,0.8)]"></div>
                        <span className="text-white tracking-widest drop-shadow-md">{signal}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
