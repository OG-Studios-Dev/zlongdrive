import React, { useState } from 'react'
import { useStore } from '../store/useStore'
import { Check, Edit2, Play, ChevronRight, X } from 'lucide-react'

export default function AdminConsole() {
    const { eventConfig, hitters, updateHitterSet } = useStore()
    const [selectedHitterId, setSelectedHitterId] = useState(hitters[0]?.id || null)
    const [activeTab, setActiveTab] = useState('scoring') // scoring, bracket, settings

    const selectedHitter = hitters.find(h => h.id === selectedHitterId)

    // Local state for the current edit
    const [ballInputs, setBallInputs] = useState(['', '', '', '', '', ''])
    const [summaryInput, setSummaryInput] = useState('')
    const [inputMode, setInputMode] = useState('summary') // 'summary' or 'balls'

    const handleSaveSet = (setId) => {
        let finalLong = 0
        if (inputMode === 'summary') {
            finalLong = parseInt(summaryInput) || 0
        } else {
            const validBalls = ballInputs.map(v => parseInt(v) || 0)
            finalLong = Math.max(...validBalls, 0)
        }

        updateHitterSet(selectedHitterId, setId, finalLong)

        // Reset inputs
        setBallInputs(['', '', '', '', '', ''])
        setSummaryInput('')
    }

    const handleBallChange = (index, val) => {
        const newInputs = [...ballInputs]
        newInputs[index] = val
        setBallInputs(newInputs)
    }

    return (
        <div className="min-h-screen pt-28 pb-10 px-4 md:px-8 max-w-[1400px] mx-auto flex flex-col h-screen">

            {/* Top Protocol Bar */}
            <div className="w-full bg-surface border-2 border-surface rounded-none p-4 flex flex-wrap items-center justify-between gap-4 mb-6 shadow-xl shrink-0">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
                        <span className="font-sans text-lg text-red-500 tracking-widest uppercase font-bold">{eventConfig.status}</span>
                    </div>
                    <div className="h-6 w-[2px] bg-white/10"></div>
                    <h2 className="font-sans font-bold text-2xl uppercase tracking-wider">{eventConfig.name}</h2>
                    <span className="px-3 py-1 bg-surface border border-white/10 rounded-none text-sm font-mono text-text/50">{eventConfig.format}</span>
                </div>

                <div className="flex bg-background border-2 border-surface p-1">
                    {['scoring', 'bracket', 'settings'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 text-lg font-sans font-bold uppercase tracking-wider transition-colors
                 ${activeTab === tab ? 'bg-primary text-black' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {activeTab === 'scoring' && (
                <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0 overflow-hidden">

                    {/* Competitor List Sidebar */}
                    <div className="w-full lg:w-96 flex flex-col bg-slate-950 border-[3px] border-surface overflow-hidden shrink-0">
                        <div className="p-4 border-b-2 border-surface bg-surface">
                            <h3 className="font-sans font-bold text-xl text-primary uppercase tracking-widest mb-3">Target Field</h3>
                            <input
                                type="text"
                                placeholder="Search hitters..."
                                className="w-full bg-background border-2 border-surface px-4 py-3 text-lg font-sans uppercase tracking-wider outline-none focus:border-primary transition-colors text-white placeholder:text-white/30"
                            />
                        </div>

                        <div className="flex-1 overflow-y-auto p-2">
                            {hitters.map(hitter => {
                                const bestDistance = Math.max(...hitter.sets.map(s => s.long))
                                return (
                                    <button
                                        key={hitter.id}
                                        onClick={() => setSelectedHitterId(hitter.id)}
                                        className={`w-full text-left p-4 mb-2 transition-all flex items-center justify-between group border-2
                  ${selectedHitterId === hitter.id ? 'bg-primary/10 border-primary' : 'bg-surface border-transparent hover:border-white/20'}`}
                                    >
                                        <div>
                                            <p className={`font-sans font-bold text-2xl tracking-wide uppercase ${selectedHitterId === hitter.id ? 'text-primary drop-shadow-[0_0_5px_rgba(57,255,20,0.5)]' : 'text-white group-hover:text-primary'}`}>{hitter.name}</p>
                                            <p className={`text-sm font-mono mt-1 ${selectedHitterId === hitter.id ? 'text-primary/70' : 'text-white/40'}`}>GRP {hitter.group} • {hitter.division}</p>
                                        </div>
                                        <div className={`font-sans font-bold text-4xl ${selectedHitterId === hitter.id ? 'text-primary drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]' : 'text-white/30 group-hover:text-white/60'}`}>
                                            {bestDistance > 0 ? bestDistance : '-'}
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Main Scoring Desk */}
                    {selectedHitter ? (
                        <div className="flex-1 flex flex-col bg-slate-950 border-[3px] border-surface overflow-hidden shadow-2xl relative">
                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] pointer-events-none"></div>

                            {/* Hitter Header */}
                            <div className="p-8 border-b-2 border-surface flex justify-between items-end bg-surface relative z-10">
                                <div>
                                    <span className="font-sans font-bold tracking-widest text-primary text-xl uppercase block mb-1">Active Competitor</span>
                                    <h2 className="text-6xl md:text-7xl font-sans font-bold uppercase tracking-tight text-white drop-shadow-md">{selectedHitter.name}</h2>
                                </div>
                                <div className="text-right">
                                    <span className="font-sans font-bold tracking-widest text-white/50 text-xl uppercase block mb-1">Current LONG</span>
                                    <div className="text-7xl font-sans font-bold text-primary drop-shadow-[0_0_10px_rgba(57,255,20,0.5)]">
                                        {Math.max(...selectedHitter.sets.map(s => s.long), 0) || '-'}
                                    </div>
                                </div>
                            </div>

                            {/* Sets Area */}
                            <div className="p-8 flex-1 overflow-y-auto relative z-10">
                                <div className="flex justify-between items-end mb-8">
                                    <h3 className="font-sans font-bold text-4xl uppercase tracking-wide">Qualifying Sets</h3>
                                    <div className="flex bg-background border-2 border-surface p-1">
                                        <button onClick={() => setInputMode('summary')} className={`px-6 py-2 text-lg font-sans font-bold uppercase ${inputMode === 'summary' ? 'bg-white text-black' : 'text-white/50 hover:text-white bg-transparent'}`}>Summary</button>
                                        <button onClick={() => setInputMode('balls')} className={`px-6 py-2 text-lg font-sans font-bold uppercase ${inputMode === 'balls' ? 'bg-white text-black' : 'text-white/50 hover:text-white bg-transparent'}`}>6 Balls</button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    {selectedHitter.sets.map((set, idx) => (
                                        <div key={set.id} className="bg-surface border-2 border-surface p-6 flex flex-col md:flex-row items-center gap-8 group hover:border-white/20 transition-colors">

                                            <div className="flex flex-col justify-center shrink-0 w-24">
                                                <span className="font-sans text-xl text-white/40 tracking-widest mb-0 uppercase font-bold">SET</span>
                                                <span className="text-5xl font-sans font-bold text-white">0{set.id}</span>
                                            </div>

                                            <div className="flex-1 w-full">
                                                {set.long > 0 ? (
                                                    <div className="h-16 flex items-center px-6 bg-primary/10 border-2 border-primary">
                                                        <Check className="text-primary mr-3" strokeWidth={3} />
                                                        <span className="text-primary font-sans font-bold uppercase tracking-widest text-2xl drop-shadow-[0_0_5px_rgba(57,255,20,0.5)]">Locked: {set.long}</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex gap-2 w-full h-16">
                                                        {inputMode === 'summary' ? (
                                                            <input
                                                                type="number"
                                                                placeholder="ENTER LONG..."
                                                                value={summaryInput}
                                                                onChange={e => setSummaryInput(e.target.value)}
                                                                className="w-full bg-background border-2 border-surface px-6 font-sans font-bold text-3xl outline-none focus:border-primary transition-colors text-center uppercase tracking-widest placeholder:text-white/20"
                                                            />
                                                        ) : (
                                                            ballInputs.map((val, i) => (
                                                                <input
                                                                    key={i}
                                                                    type="number"
                                                                    placeholder={i + 1}
                                                                    value={ballInputs[i]}
                                                                    onChange={e => handleBallChange(i, e.target.value)}
                                                                    className="w-1/6 bg-background border-2 border-surface text-center font-sans font-bold text-3xl outline-none focus:border-primary transition-colors placeholder:text-white/20"
                                                                />
                                                            ))
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-6 shrink-0">
                                                <div className="text-right w-24">
                                                    <span className="font-sans text-xl font-bold uppercase text-white/40 tracking-widest block">LONG</span>
                                                    <span className="font-sans text-5xl font-bold text-primary drop-shadow-[0_0_8px_rgba(57,255,20,0.4)]">{set.long || '-'}</span>
                                                </div>

                                                {set.long === 0 && (
                                                    <button
                                                        onClick={() => handleSaveSet(set.id)}
                                                        className="bg-primary hover:bg-white text-black w-20 h-20 flex justify-center items-center transition-colors shadow-[0_0_20px_rgba(57,255,20,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]"
                                                    >
                                                        <ChevronRight size={40} strokeWidth={3} />
                                                    </button>
                                                )}
                                                {set.long > 0 && (
                                                    <button
                                                        onClick={() => updateHitterSet(selectedHitterId, set.id, 0)}
                                                        className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border-2 border-red-500 w-20 h-20 flex justify-center items-center transition-colors"
                                                    >
                                                        <X size={32} strokeWidth={3} />
                                                    </button>
                                                )}
                                            </div>

                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center bg-slate-950 border-[3px] border-surface">
                            <p className="text-primary/50 font-sans text-3xl font-bold uppercase tracking-widest">Select Competitor to Score</p>
                        </div>
                    )}

                </div>
            )}

            {activeTab === 'bracket' && (
                <div className="flex-1 flex flex-col items-center justify-center bg-slate-950 border-[3px] border-surface mt-4 relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[150px] pointer-events-none"></div>
                    <p className="text-primary font-sans text-4xl font-bold tracking-widest mb-8 uppercase drop-shadow-[0_0_8px_rgba(57,255,20,0.4)] relative z-10">FINALS ADVANCEMENT ENGINE</p>
                    <button onClick={() => window.location.href = '/bracket'} className="bg-white text-black hover:bg-primary py-4 px-8 font-bold text-2xl font-sans uppercase tracking-wider flex items-center gap-3 transition-colors relative z-10">
                        <Play size={24} strokeWidth={3} /> Live Seed Bracket
                    </button>
                </div>
            )}
        </div>
    )
}
