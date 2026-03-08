import React from 'react'

const formats = [
    {
        title: "36 Men / 16_12_8",
        groups: "3 Groups",
        cut: "Top 16 advance → 12 → 8",
        audience: "Standard Regional Qualifier"
    },
    {
        title: "36 Men / 12_16_6",
        groups: "3 Groups",
        cut: "Top 12 advance → 6 (Double Elim)",
        audience: "Alternative Qualifier Flow"
    },
    {
        title: "28 Men + 5 Ladies",
        groups: "3 Groups + Ladies Division",
        cut: "16_8_4 Men / Direct Finals Ladies",
        audience: "Mixed Division Event"
    },
    {
        title: "Custom Field",
        groups: "Dynamic",
        cut: "Owner Defined",
        audience: "Local Shootout / Charity"
    }
]

export default function EventFormats() {
    return (
        <section className="py-32 bg-surface/20 border-y border-white/5 relative">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
                    <div className="max-w-xl">
                        <h2 className="text-4xl font-bold mb-4">Configurable Formats.</h2>
                        <p className="text-text/60 text-lg font-light">Built directly around real Z Long Drive operational templates. Select your field size, group count, and cut logic with zero coding.</p>
                    </div>
                    <a href="/admin" className="magnetic-btn bg-white/5 border border-white/10 hover:bg-white/10 px-6 py-3 rounded-full font-bold text-sm">
                        Configure Event Setup
                    </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {formats.map((fmt, idx) => (
                        <div key={idx} className="panel p-8 duration-300 hover:border-primary/50 group">
                            <div className="font-data text-xs text-primary mb-6 tracking-wider">{fmt.audience}</div>
                            <h3 className="text-xl font-bold text-white mb-2">{fmt.title}</h3>
                            <p className="text-sm text-text/50 font-mono mb-8">{fmt.groups}</p>

                            <div className="pt-4 border-t border-white/10">
                                <span className="text-xs uppercase text-text/40 font-bold tracking-widest block mb-1">Bracket Flow</span>
                                <p className="text-sm font-light text-text/90 group-hover:text-white transition-colors">{fmt.cut}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
