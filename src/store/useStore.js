import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
    persist(
        (set, get) => ({
            // Event Configuration
            eventConfig: {
                name: 'ZLD World Championship Series - Qualifier',
                format: '36 Men / 16_12_8 / 3 Groups',
                status: 'LIVE', // SETUP, LIVE, FINISHED
            },

            // Competitors Database (Mocked for realism)
            hitters: [
                { id: 'h1', name: 'Marcus Reid', group: 'A', division: 'Men', sets: [{ id: 1, long: 412 }, { id: 2, long: 0 }, { id: 3, long: 0 }], activeSet: 1 },
                { id: 'h2', name: 'David Chen', group: 'A', division: 'Men', sets: [{ id: 1, long: 398 }, { id: 2, long: 0 }, { id: 3, long: 0 }], activeSet: 1 },
                { id: 'h3', name: 'Jason Voorhees', group: 'A', division: 'Men', sets: [{ id: 1, long: 405 }, { id: 2, long: 0 }, { id: 3, long: 0 }], activeSet: 1 },
                { id: 'h4', name: 'Tyler Stone', group: 'B', division: 'Men', sets: [{ id: 1, long: 0 }, { id: 2, long: 0 }, { id: 3, long: 0 }], activeSet: 1 },
            ],

            // Season Standings (Mocked)
            standings: [
                { rank: 1, name: 'Marcus Reid', points: 1250, eventsPlayed: 3, season: '25/26' },
                { rank: 2, name: 'Tyler Stone', points: 980, eventsPlayed: 3, season: '25/26' },
                { rank: 3, name: 'David Chen', points: 840, eventsPlayed: 3, season: '25/26' },
                { rank: 4, name: 'Jason Voorhees', points: 760, eventsPlayed: 3, season: '25/26' },
            ],

            // Actions
            updateHitterSet: (id, setId, long) => set((state) => ({
                hitters: state.hitters.map(h =>
                    h.id === id
                        ? { ...h, sets: h.sets.map(s => s.id === setId ? { ...s, long } : s) }
                        : h
                )
            })),

            getRankedHitters: () => {
                const { hitters } = get()
                return [...hitters]
                    .map(h => {
                        const bestDistance = Math.max(...h.sets.map(s => s.long))
                        return { ...h, bestDistance }
                    })
                    .sort((a, b) => b.bestDistance - a.bestDistance)
                    .map((h, i) => ({ ...h, rank: i + 1 }))
            }
        }),
        {
            name: 'zld-event-operations',
        }
    )
)
