import React from 'react'
import { Link } from 'react-router-dom'
import { Trophy, Compass } from 'lucide-react'

export default function Conversion() {
    return (
        <section className="py-24 px-6 relative max-w-[1400px] mx-auto">
            <div className="bg-surface border-[3px] border-primary p-10 md:p-20 text-center relative overflow-hidden group shadow-[0_0_50px_rgba(57,255,20,0.15)]">

                {/* Decorative Grid & Lights inside panel */}
                <div className="absolute inset-0 z-0 opacity-20 transition-transform duration-1000 group-hover:scale-105"
                    style={{ backgroundImage: 'linear-gradient(rgba(57,255,20,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.2) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-primary/20 blur-[120px] rounded-full z-0 pointer-events-none"></div>

                <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
                    <h2 className="text-6xl md:text-8xl font-sans font-bold uppercase mb-6 drop-shadow-lg text-white">Enter the Bracket.</h2>
                    <p className="text-2xl text-text/80 font-serif font-light mb-12">Whether you are competing on the grid or following the season race, your portal is here.</p>

                    <div className="flex flex-col sm:flex-row w-full gap-6 justify-center">
                        <Link to="/leaderboard" className="bg-primary text-black hover:bg-primary/80 py-6 px-10 font-bold text-2xl uppercase tracking-wider flex items-center justify-center gap-3 transition-colors shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:shadow-[0_0_40px_rgba(57,255,20,0.6)]">
                            <Compass size={28} strokeWidth={3} />
                            Live Events
                        </Link>

                        <Link to="/standings" className="bg-transparent border-[3px] border-white text-white hover:border-primary hover:text-primary py-6 px-10 font-bold text-2xl uppercase tracking-wider flex items-center justify-center gap-3 transition-colors">
                            <Trophy size={28} strokeWidth={3} />
                            Standings
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
