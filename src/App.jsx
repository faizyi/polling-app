import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Signup } from './pages/Signup'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App
