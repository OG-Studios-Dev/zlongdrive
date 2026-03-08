import React, { useEffect } from 'react'
import Hero from '../components/home/Hero'
import TrustBar from '../components/home/TrustBar'
import Features from '../components/home/Features'
import Philosophy from '../components/home/Philosophy'
import Conversion from '../components/home/Conversion'

export default function Home() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="flex flex-col w-full min-h-screen bg-background text-text">
            <Hero />
            <TrustBar />
            <Features />
            <Philosophy />
            {/* We removed Protocol, AudienceFit, EventFormats since they are B2B saas pitched */}
            <Conversion />
        </div>
    )
}
