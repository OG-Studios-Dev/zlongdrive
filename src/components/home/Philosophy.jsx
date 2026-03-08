import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Philosophy() {
    const containerRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.philo-text', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 75%'
                },
                y: 40,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.out',
                stagger: 0.2
            })
        }, containerRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} className="w-full bg-background py-40 px-6 relative overflow-hidden border-y-2 border-primary/20 shadow-[inset_0_0_100px_rgba(57,255,20,0.05)]">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.05]"
                style={{ backgroundImage: 'linear-gradient(#39FF14 1px, transparent 1px), linear-gradient(90deg, #39FF14 1px, transparent 1px)', backgroundSize: '80px 80px' }}>
            </div>

            <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col gap-6 text-center">
                <h2 className="philo-text text-5xl md:text-7xl lg:text-8xl font-sans font-bold text-white uppercase tracking-tight drop-shadow-md">
                    Speed. Distance.
                </h2>
                <h2 className="philo-text text-6xl md:text-8xl lg:text-9xl font-sans font-bold text-primary uppercase tracking-tighter drop-shadow-[0_0_30px_rgba(57,255,20,0.6)]">
                    Total Control.
                </h2>
                <p className="philo-text font-serif text-2xl text-white/50 max-w-2xl mx-auto mt-8 font-light">
                    The grid rewards power. We deliver the stats.
                </p>
            </div>
        </section>
    )
}
