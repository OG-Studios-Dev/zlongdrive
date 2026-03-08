import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: 'League', path: '/' },
        { name: 'Leaderboard', path: '/leaderboard' },
        { name: 'Bracket', path: '/bracket' },
        { name: 'Standings', path: '/standings' }
    ]

    const isTransparentPath = location.pathname === '/' && !scrolled

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full px-4 pt-4 sm:pt-6 pointer-events-none">
            <div
                className={`pointer-events-auto flex items-center justify-between w-full max-w-[1200px] transition-all duration-500 rounded-full px-6 py-4 
          ${isTransparentPath
                        ? 'bg-transparent text-white border-transparent'
                        : 'bg-background/70 backdrop-blur-xl border border-white/5 text-text'}`}
            >
                <Link to="/" className="flex items-center gap-2 group tracking-wide">
                    <img src="/images/logo.jpg" alt="Z Long Drive" className="h-12 w-auto mix-blend-screen mix-blend-lighten object-contain drop-shadow-[0_0_8px_rgba(62,231,16,0.5)] group-hover:drop-shadow-[0_0_12px_rgba(62,231,16,0.8)] transition-all" />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-lg font-sans font-bold tracking-widest uppercase transition-transform duration-300 hover:-translate-y-[1px]
                ${location.pathname === link.path ? 'text-primary drop-shadow-[0_0_8px_rgba(57,255,20,0.4)]' : 'text-white/80 hover:text-white'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/contact" className="magnetic-btn bg-primary text-black px-6 py-2 rounded-none text-xl font-sans font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(57,255,20,0.4)] hover:shadow-[0_0_25px_rgba(57,255,20,0.7)] transition-shadow">
                        Competitor Login
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div className="absolute top-[80px] left-4 right-4 bg-surface/95 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 flex flex-col gap-4 md:hidden pointer-events-auto shadow-2xl">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-lg font-medium text-text/80 hover:text-white pb-2 border-b border-white/5"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/contact" className="bg-primary text-white px-6 py-3 rounded-xl text-center font-bold mt-2">
                        Contact
                    </Link>
                </div>
            )}
        </nav>
    )
}
