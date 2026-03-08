import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Leaderboard from './pages/Leaderboard'
import Standings from './pages/Standings'
import AdminConsole from './pages/AdminConsole'
import Bracket from './pages/Bracket'

function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col relative z-10 selection:bg-primary/30 selection:text-white">
                <Navbar />
                <main className="flex-1 w-full">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                        <Route path="/bracket" element={<Bracket />} />
                        <Route path="/standings" element={<Standings />} />
                        <Route path="/admin" element={<AdminConsole />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    )
}

export default App
