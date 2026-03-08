import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ArrowUpRight } from 'lucide-react'

export default function Hero() {
    const containerRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.hero-element', {
                y: 40,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: 'power3.out',
                delay: 0.2
            })

            // Slideshow animation
            const slides = gsap.utils.toArray('.slide')
            if (slides.length > 0) {
                const tl = gsap.timeline({ repeat: -1 })
                slides.forEach((slide, i) => {
                    tl.to(slide, { opacity: 1, duration: 1.5, ease: 'power2.inOut' }, i * 4)
                        .to(slide, { opacity: 0, duration: 1.5, ease: 'power2.inOut' }, (i * 4) + 3)
                })
            }

        }, containerRef)
        return () => ctx.revert()
    }, [])

    const slideImages = [
        "/images/ig1.jpg",
        "/images/ig2.jpg",
        "/images/ig3.jpg",
        "/images/ig4.jpg"
    ]

    return (
        <section ref={containerRef} className="relative w-full h-[100dvh] pb-24 px-6 md:px-16 overflow-hidden bg-background flex flex-col justify-end">

            {/* Background elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-background z-10"></div>

                {/* Right side Slideshow */}
                <div className="absolute top-0 right-0 w-[70vw] h-full z-20">
                    {slideImages.map((src, i) => (
                        <div key={i} className="slide absolute inset-0 opacity-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${src})`, backgroundPosition: 'center 20%' }}></div>
                    ))}
                    {/* Heavy Edge Fades */}
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent z-30 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-30 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-l from-background via-transparent to-transparent opacity-50 z-30 pointer-events-none"></div>
                </div>

                {/* Neon accent glow */}
                <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-primary/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none z-30"></div>
            </div>

            {/* Content */}
            <div className="relative z-40 max-w-4xl flex flex-col items-start pt-[20vh]">
                <div className="hero-element flex items-center gap-3 mb-6">
                    <div className="w-12 h-[2px] bg-primary shadow-[0_0_10px_rgba(62,231,16,0.8)]"></div>
                    <p className="font-mono text-primary tracking-widest text-sm uppercase font-bold drop-shadow-[0_0_5px_rgba(62,231,16,0.5)]">The Ultimate Distance League</p>
                </div>

                <h1 className="hero-element text-6xl md:text-8xl lg:text-9xl font-sans font-bold leading-[0.9] tracking-normal mb-8 uppercase text-white drop-shadow-lg">
                    Dominate <br />
                    <span className="text-primary italic">The Grid.</span>
                </h1>

                <p className="hero-element text-white/70 text-lg md:text-2xl max-w-2xl font-serif font-light leading-relaxed mb-10">
                    The premier global indoor long drive series. View live leaderboards, track season standings, and watch the championship brackets unfold.
                </p>

                <div className="hero-element flex flex-wrap gap-4">
                    <Link to="/leaderboard" className="magnetic-btn group bg-primary text-black px-8 py-4 rounded-none font-bold text-xl uppercase tracking-wider flex items-center gap-2 hover:bg-primary/90 shadow-[0_0_20px_rgba(62,231,16,0.3)] hover:shadow-[0_0_30px_rgba(62,231,16,0.6)] transition-all">
                        Live Leaderboard
                        <ArrowUpRight strokeWidth={3} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                    <Link to="/standings" className="magnetic-btn group bg-transparent border-2 border-white/20 text-white px-8 py-4 rounded-none font-bold text-xl uppercase tracking-wider flex items-center gap-2 hover:border-primary hover:text-primary transition-all">
                        Season Standings
                    </Link>
                </div>
            </div>
        </section>
    )
}
