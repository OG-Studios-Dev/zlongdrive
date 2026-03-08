import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const protocolCards = [
    {
        id: '01',
        title: 'Check-In',
        desc: 'Register incoming hitters quickly. Assign groups accurately without messy spreadsheet errors.',
        visualText: '[SCAN_ROSTER]'
    },
    {
        id: '02',
        title: 'Qualifying',
        desc: 'Enter 3 sets of 6 balls fluidly. Instantly calculate LONG distance and live RANK the field.',
        visualText: '[ENTER_SETS]'
    },
    {
        id: '03',
        title: 'Bracket + Finals',
        desc: 'Advance winners based on format rules. Run live match play. Crown the champion.',
        visualText: '[SEED_FINALS]'
    }
]

export default function Protocol() {
    const containerRef = useRef(null)

    useEffect(() => {
        let ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.protocol-card')

            cards.forEach((card, i) => {
                ScrollTrigger.create({
                    trigger: card,
                    start: 'top 15%',
                    end: 'bottom top',
                    pin: true,
                    pinSpacing: false,
                    id: `card-${i}`
                })

                // When next card overlaps this one, scale/blur it
                if (i < cards.length - 1) {
                    gsap.to(card, {
                        scale: 0.9,
                        opacity: 0.5,
                        filter: 'blur(10px)',
                        scrollTrigger: {
                            trigger: cards[i + 1],
                            start: 'top 50%',
                            end: 'top 15%',
                            scrub: true
                        }
                    })
                }
            })
        }, containerRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} className="py-20 relative w-full">
            <div className="max-w-[1200px] mx-auto px-6 mb-20">
                <h2 className="text-4xl md:text-5xl font-bold">Standard Operating Protocol.</h2>
                <p className="text-text/60 mt-4 text-xl font-light">The exact lifecycle of a global qualifier event.</p>
            </div>

            <div className="relative max-w-[1200px] mx-auto h-[300vh] px-6">
                {protocolCards.map((card, idx) => (
                    <div
                        key={card.id}
                        className="protocol-card w-full h-[70vh] rounded-[2.5rem] p-1 shadow-2xl absolute left-6 right-6 lg:left-0 lg:right-0 bg-gradient-to-br from-white/10 to-transparent"
                        style={{ top: `${idx * 20}px`, zIndex: idx }}
                    >
                        <div className="w-full h-full bg-[#111620] rounded-[2.4rem] p-10 md:p-16 flex flex-col md:flex-row justify-between items-center gap-10 overflow-hidden relative">

                            {/* Content */}
                            <div className="w-full md:w-1/2 flex flex-col justify-center h-full z-10 relative">
                                <span className="font-data text-primary text-xl font-bold mb-4">{card.id}.</span>
                                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">{card.title}</h3>
                                <p className="text-xl text-text/70 font-light leading-relaxed max-w-md">{card.desc}</p>
                            </div>

                            {/* Visual Element Placeholder */}
                            <div className="w-full md:w-1/2 h-full bg-surface/50 border border-white/5 rounded-3xl flex items-center justify-center relative overflow-hidden group">
                                <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
                                {/* Visual decoration */}
                                <div className="w-32 h-32 rounded-full border border-primary/30 absolute group-hover:scale-110 transition-transform duration-1000 ease-in-out"></div>
                                <div className="w-48 h-48 rounded-full border border-primary/20 absolute group-hover:scale-125 transition-transform duration-1000 ease-in-out delay-75"></div>
                                <div className="w-64 h-64 rounded-full border border-primary/10 absolute group-hover:scale-150 transition-transform duration-1000 ease-in-out delay-150"></div>

                                <span className="font-data tracking-[0.3em] text-primary z-10">{card.visualText}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
