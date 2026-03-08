import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Features() {
    const containerRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.feature-card', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                },
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: 'power3.out'
            })
        }, containerRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} className="py-24 px-6 max-w-[1400px] mx-auto z-10 relative">
            <div className="mb-16 border-l-4 border-primary pl-6">
                <h2 className="text-6xl md:text-7xl font-sans font-bold uppercase tracking-tight text-white drop-shadow-[0_0_10px_rgba(57,255,20,0.3)]">The League.</h2>
                <p className="text-text/70 text-2xl font-serif max-w-2xl font-light mt-2">Elite competition structure. Live leaderboards. Match play finals.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Card 1: Rankings */}
                <div className="feature-card bg-surface border-2 border-surface p-8 shadow-2xl relative overflow-hidden group hover:border-primary/50 transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] group-hover:bg-primary/20 transition-all rounded-full pointer-events-none"></div>

                    <h3 className="text-4xl font-sans font-bold uppercase mb-2 text-white">Live Ranks</h3>
                    <p className="text-text/60 font-serif text-lg mb-8">Follow the fastest hitters as they lock in 3 sets of 6 balls to claim the longest drive of the night.</p>

                    <div className="mt-auto border border-white/10 bg-background p-4 text-sm font-mono flex flex-col gap-2">
                        <div className="flex justify-between items-center bg-primary/10 text-primary p-2">
                            <span className="font-bold">1. M. REID</span>
                            <span className="font-bold text-lg">412</span>
                        </div>
                        <div className="flex justify-between items-center text-white/50 p-2">
                            <span>2. D. CHEN</span>
                            <span>398</span>
                        </div>
                        <div className="flex justify-between items-center text-white/50 p-2">
                            <span>3. J. VOORHEES</span>
                            <span>395</span>
                        </div>
                    </div>
                </div>

                {/* Card 2: Season Race */}
                <div className="feature-card bg-surface border-2 border-surface p-8 shadow-2xl relative overflow-hidden group hover:border-primary/50 transition-colors">
                    <h3 className="text-4xl font-sans font-bold uppercase mb-2 text-white">Season Race</h3>
                    <p className="text-text/60 font-serif text-lg mb-8">Every event matters. Points accumulate throughout the season leading up to the world championship.</p>

                    <div className="mt-auto h-[150px] relative border-b-2 border-l-2 border-white/20 p-4 flex items-end justify-between">
                        <div className="w-1/4 bg-white/20 h-[30%] group-hover:h-[40%] transition-all"></div>
                        <div className="w-1/4 bg-white/40 h-[50%] group-hover:h-[65%] transition-all"></div>
                        <div className="w-1/4 bg-primary h-[80%] group-hover:h-[95%] transition-all shadow-[0_0_15px_rgba(57,255,20,0.5)] flex items-start justify-center pt-2">
                            <span className="text-black font-bold font-mono text-xs">P1</span>
                        </div>
                    </div>
                </div>

                {/* Card 3: Championships */}
                <div className="feature-card bg-surface border-2 border-surface p-8 shadow-2xl relative overflow-hidden group hover:border-primary/50 transition-colors">
                    <h3 className="text-4xl font-sans font-bold uppercase mb-2 text-white">The Bracket</h3>
                    <p className="text-text/60 font-serif text-lg mb-8">From qualifying groups to Elite 8 match play. Watch hitters advance through the bracket in real-time.</p>

                    <div className="mt-auto flex items-center justify-center gap-2 relative h-[150px]">
                        <div className="w-1/3 border-2 border-white/10 h-12 flex items-center justify-center text-white/50 font-mono text-xs">QTR</div>
                        <div className="w-8 border-t-2 border-white/20"></div>
                        <div className="w-1/3 border-2 border-primary bg-primary/10 h-16 flex items-center justify-center text-primary font-bold font-mono text-sm shadow-[0_0_10px_rgba(57,255,20,0.3)]">FINAL</div>
                    </div>
                </div>
            </div>
        </section>
    )
}
