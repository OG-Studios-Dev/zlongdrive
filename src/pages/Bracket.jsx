import React, { useEffect } from 'react'

export default function Bracket() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    // Mocked matchup data for an Elite 8 bracket flow - Added AVG and DRIVE stats
    const matchups = {
        quarter: [
            { id: 1, p1: 'M. REID', s1: 1, avg1: 402, d1: 412, p2: 'T. STONE', s2: 8, avg2: 388, d2: 391, result: 1 },
            { id: 2, p1: 'D. CHEN', s1: 4, avg1: 391, d1: 385, p2: 'A. DAVIS', s2: 5, avg2: 394, d2: 401, result: 2 },
            { id: 3, p1: 'J. VOORHEES', s1: 2, avg1: 408, d1: 405, p2: 'S. PATEL', s2: 7, avg2: 385, d2: null, result: null },
            { id: 4, p1: 'K. BERKSHIRE', s1: 3, avg1: 415, d1: null, p2: 'L. SMITH', s2: 6, avg2: 390, d2: null, result: null },
        ],
        semi: [
            { id: 5, p1: 'M. REID', avg1: 402, d1: null, p2: 'A. DAVIS', avg2: 394, d2: null, result: null },
            { id: 6, p1: 'TBD', avg1: '-', d1: '-', p2: 'TBD', avg2: '-', d2: '-', result: null },
        ],
        final: [
            { id: 7, p1: 'TBD', avg1: '-', d1: '-', p2: 'TBD', avg2: '-', d2: '-', result: null }
        ]
    }

    const MatchupCard = ({ m, round }) => (
        <div className={`w-full bg-surface border-2 rounded-sm overflow-hidden shadow-xl relative z-10 flex flex-col group transition-colors 
        ${round === 'F' ? 'border-primary shadow-[0_0_20px_rgba(62,231,16,0.2)]' : 'border-surface/50 hover:border-white/20'}`}>

            {/* Header Row */}
            <div className="flex bg-slate-950/50 border-b border-white/5 py-1 px-3 text-[10px] font-mono text-white/40 uppercase tracking-widest justify-between">
                <span>Player</span>
                <div className="flex gap-4">
                    <span>AVG</span>
                    <span className="text-primary/70">DRIVE</span>
                </div>
            </div>

            {/* Player 1 Row */}
            <div className={`p-2 xl:p-3 border-b border-white/5 flex justify-between items-center transition-colors 
          ${m.result === 1 ? 'bg-primary/10 border-primary/30' : 'bg-slate-950 group-hover:bg-white/5'}`}>
                <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] xl:text-xs text-primary font-bold w-4">{m.s1 || '-'}</span>
                    <span className={`font-sans tracking-wide text-sm xl:text-lg font-bold uppercase truncate max-w-[100px] xl:max-w-[140px] 
                        ${m.result === 1 ? 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]' : 'text-white/70'}`}>
                        {m.p1}
                    </span>
                </div>
                <div className="flex items-center gap-3 xl:gap-4 font-mono text-xs xl:text-sm font-bold">
                    <span className="text-white/40 w-8 text-right">{m.avg1}</span>
                    <span className={`w-10 text-right ${m.result === 1 ? 'text-primary drop-shadow-[0_0_8px_rgba(62,231,16,0.6)]' : 'text-white/90'}`}>{m.d1 || '-'}</span>
                </div>
            </div>

            {/* Player 2 Row */}
            <div className={`p-2 xl:p-3 flex justify-between items-center transition-colors 
          ${m.result === 2 ? 'bg-primary/10 border-t border-primary/30' : 'bg-slate-950 group-hover:bg-white/5'}`}>
                <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] xl:text-xs text-primary font-bold w-4">{m.s2 || '-'}</span>
                    <span className={`font-sans tracking-wide text-sm xl:text-lg font-bold uppercase truncate max-w-[100px] xl:max-w-[140px] 
                        ${m.result === 2 ? 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]' : 'text-white/70'}`}>
                        {m.p2}
                    </span>
                </div>
                <div className="flex items-center gap-3 xl:gap-4 font-mono text-xs xl:text-sm font-bold">
                    <span className="text-white/40 w-8 text-right">{m.avg2}</span>
                    <span className={`w-10 text-right ${m.result === 2 ? 'text-primary drop-shadow-[0_0_8px_rgba(62,231,16,0.6)]' : 'text-white/90'}`}>{m.d2 || '-'}</span>
                </div>
            </div>
        </div>
    )

    return (
        <div className="h-screen pt-24 pb-8 px-4 lg:px-12 max-w-[1800px] mx-auto flex flex-col overflow-hidden">
            {/* Header - Compacted for TV */}
            <div className="mb-6 flex items-end justify-between border-b pb-4 border-white/10 shrink-0">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <span className="font-sans text-[10px] md:text-xs text-primary tracking-widest font-bold border border-primary px-2 py-0.5 bg-primary/10 uppercase">Finals Engine</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold uppercase tracking-tight text-white drop-shadow-md leading-none">Championship Flight</h1>
                </div>
                <div className="text-right hidden sm:block">
                    <p className="font-mono text-primary text-sm font-bold uppercase tracking-widest">Live Bracket</p>
                    <p className="font-sans text-white/50 text-sm uppercase tracking-wide">Updated Automatically</p>
                </div>
            </div>

            {/* Bracket Graph Area - Flex layout to fit screen */}
            <div className="flex-1 bg-slate-950/80 border border-white/10 shadow-[0_0_50px_rgba(62,231,16,0.03)] rounded-lg p-4 lg:p-8 flex relative overflow-hidden backdrop-blur-sm">

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary/5 blur-[120px] pointer-events-none rounded-full"></div>

                {/* Grid Layout for exact scaling */}
                <div className="w-full h-full grid grid-cols-4 gap-4 xl:gap-12 relative z-10">

                    {/* SVG Connector Overlay - Absolute Positioned using Percentages */}
                    <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block">
                        <svg width="100%" height="100%" preserveAspectRatio="none">
                            {/* Quarter to Semi - Top Half */}
                            <path d="M 25% 12.5% L 40% 12.5% L 40% 25% L 50% 25%" fill="transparent" stroke="#3EE710" strokeWidth="2" opacity="0.4" />
                            <path d="M 25% 37.5% L 40% 37.5% L 40% 25%" fill="transparent" stroke="#3EE710" strokeWidth="2" opacity="0.4" />

                            {/* Quarter to Semi - Bottom Half */}
                            <path d="M 25% 62.5% L 40% 62.5% L 40% 75% L 50% 75%" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                            <path d="M 25% 87.5% L 40% 87.5% L 40% 75%" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />

                            {/* Semi to Final */}
                            <path d="M 75% 25% L 85% 25% L 85% 50% L 100% 50%" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                            <path d="M 75% 75% L 85% 75% L 85% 50%" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                        </svg>
                    </div>

                    {/* Quarter Finals */}
                    <div className="col-span-1 flex flex-col justify-around relative z-10 h-full py-4">
                        <h4 className="absolute -top-6 left-0 right-0 font-sans text-lg tracking-widest text-primary font-bold uppercase text-center opacity-70">Elite 8</h4>
                        {matchups.quarter.map((m) => (
                            <div key={m.id} className="relative">
                                <MatchupCard m={m} round="Q" />
                            </div>
                        ))}
                    </div>

                    {/* Semi Finals */}
                    <div className="col-span-1 col-start-3 flex flex-col justify-around relative z-10 h-full py-16">
                        <h4 className="absolute top-2 left-0 right-0 font-sans text-lg tracking-widest text-white/50 font-bold uppercase text-center">Final 4</h4>
                        {matchups.semi.map((m) => (
                            <div key={m.id} className="relative">
                                <MatchupCard m={m} round="S" />
                            </div>
                        ))}
                    </div>

                    {/* Finals */}
                    <div className="col-span-1 col-start-4 flex flex-col justify-center relative z-10 h-full">
                        <div className="absolute top-[20%] left-0 right-0 text-center">
                            <h4 className="font-sans text-2xl tracking-widest text-primary font-bold mb-2 uppercase drop-shadow-[0_0_10px_rgba(62,231,16,0.5)]">The Final</h4>
                            <div className="w-1/2 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"></div>
                        </div>
                        {matchups.final.map((m) => (
                            <div key={m.id} className="relative z-20 scale-110 origin-center transition-transform">
                                <MatchupCard m={m} round="F" />
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}
