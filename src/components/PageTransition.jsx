import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

export default function PageTransition() {
    const location = useLocation();
    const containerRef = useRef(null);
    const wipeRef = useRef(null);
    const ballRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Wipe starts fully covering the screen
            gsap.set(wipeRef.current, { xPercent: 0 });
            gsap.set(ballRef.current, { rotation: 0 });

            // Move wipe to the right (xPercent: 100) revealing the page, and spin the ball
            tl.to(wipeRef.current, {
                xPercent: 100,
                duration: 1.2,
                ease: 'power3.inOut'
            })
                .to(ballRef.current, {
                    rotation: 1080, // 3 full spins
                    duration: 1.2,
                    ease: 'power3.inOut'
                }, 0);

        }, containerRef);

        return () => ctx.revert();
    }, [location.pathname]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[100] pointer-events-none overflow-hidden block">
            <div ref={wipeRef} className="absolute inset-0 w-full h-full bg-background border-l-[3px] border-primary shadow-[-30px_0_50px_rgba(62,231,16,0.3)]">

                {/* The Golf Ball attached to the left edge of the wipe */}
                <div ref={ballRef} className="absolute top-1/2 -left-[64px] -translate-y-1/2 w-32 h-32 drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] flex-shrink-0 origin-center">

                    {/* Golf ball SVG */}
                    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
                        <circle cx="100" cy="100" r="95" fill="#f8fafc" stroke="#3EE710" strokeWidth="2" />
                        <circle cx="50" cy="50" r="10" fill="#cbd5e1" />
                        <circle cx="100" cy="30" r="10" fill="#cbd5e1" />
                        <circle cx="150" cy="50" r="10" fill="#cbd5e1" />
                        <circle cx="30" cy="100" r="10" fill="#cbd5e1" />
                        <circle cx="75" cy="85" r="10" fill="#cbd5e1" />
                        <circle cx="125" cy="85" r="10" fill="#cbd5e1" />
                        <circle cx="170" cy="100" r="10" fill="#cbd5e1" />
                        <circle cx="50" cy="150" r="10" fill="#cbd5e1" />
                        <circle cx="100" cy="170" r="10" fill="#cbd5e1" />
                        <circle cx="150" cy="150" r="10" fill="#cbd5e1" />
                        <circle cx="75" cy="130" r="10" fill="#cbd5e1" />
                        <circle cx="125" cy="130" r="10" fill="#cbd5e1" />
                        <circle cx="100" cy="100" r="10" fill="#cbd5e1" />
                    </svg>

                    {/* Motion trails pointing left (behind the ball) */}
                    <div className="absolute top-1/2 right-[80%] w-48 h-2 bg-gradient-to-l from-primary to-transparent -translate-y-1/2 opacity-70 blur-sm rounded-full pointer-events-none"></div>
                    <div className="absolute top-[35%] right-[70%] w-32 h-1 bg-gradient-to-l from-white to-transparent -translate-y-1/2 opacity-50 blur-sm rounded-full pointer-events-none"></div>
                    <div className="absolute top-[65%] right-[70%] w-24 h-1 bg-gradient-to-l from-white to-transparent -translate-y-1/2 opacity-50 blur-sm rounded-full pointer-events-none"></div>
                </div>

            </div>
        </div>
    );
}
