import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Signup } from './pages/Signup'
import { PublicRoute } from './services/PublicRoute'
import { Header } from './components/Header'
import { CreatePoll } from './pages/CreatePoll'
import { ProtectedRoute } from './services/ProtectedRoute'

function App() {
  return (
    <div className="min-h-screen">
      <Header/>
      <Routes>
        <Route path="/signup" element={<PublicRoute><Signup/></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/" element={<Home />} />
        <Route path="/create-poll" element={<ProtectedRoute><CreatePoll/></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App
