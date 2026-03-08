import React from 'react'

export default function Footer() {
    return (
        <footer className="bg-[#090e18] mt-24 rounded-t-[4rem] px-8 py-16 text-text">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-5 flex flex-col gap-6">
                    <h2 className="text-3xl font-bold">
                        <span className="text-primary">Z</span> LONG DRIVE
                    </h2>
                    <p className="font-drama text-xl text-text/60 max-w-sm">
                        The premium indoor distance competition series. All hitters. All skill levels. Worldwide.
                    </p>
                    <div className="flex items-center gap-3 mt-4">
                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                        <span className="font-data text-xs text-text/50 uppercase tracking-widest">System Operational</span>
                    </div>
                </div>

                <div className="md:col-span-2 flex flex-col gap-4">
                    <h4 className="font-mono text-xs tracking-widest text-text/40 uppercase mb-2">Events</h4>
                    <a href="#" className="hover:text-primary transition-colors text-sm">Upcoming Qualifiers</a>
                    <a href="#" className="hover:text-primary transition-colors text-sm">Championship</a>
                    <a href="#" className="hover:text-primary transition-colors text-sm">Host an Event</a>
                </div>

                <div className="md:col-span-2 flex flex-col gap-4">
                    <h4 className="font-mono text-xs tracking-widest text-text/40 uppercase mb-2">Standings</h4>
                    <a href="/standings" className="hover:text-primary transition-colors text-sm">Current Season</a>
                    <a href="#" className="hover:text-primary transition-colors text-sm">Past Champions</a>
                    <a href="/leaderboard" className="hover:text-primary transition-colors text-sm">Live Board</a>
                </div>

                <div className="md:col-span-3 flex flex-col gap-4">
                    <h4 className="font-mono text-xs tracking-widest text-text/40 uppercase mb-2">Legal</h4>
                    <a href="#" className="hover:text-primary transition-colors text-sm">Terms & Conditions</a>
                    <a href="#" className="hover:text-primary transition-colors text-sm">Privacy Policy</a>
                    <a href="#" className="hover:text-primary transition-colors text-sm">Contact Us</a>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto mt-20 pt-8 border-t border-white/5 text-xs text-text/30 flex justify-between items-center">
                <p>&copy; {new Date().getFullYear()} Z Long Drive Events. All rights reserved.</p>
                <p className="font-data">v2.0.FINAL</p>
            </div>
        </footer>
    )
}
