import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import Signin from './components/Signin'
import Register from './components/Register'
import UserDash from './components/UserDash'
function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>wdiou?</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item"><Link className="nav-link" to={'/sign-in'}>Sign In</Link></li>
                <li className="nav-item"><Link className="nav-link" to={'/sign-up'}>Register</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route path="/" element={<Navigate to="/sign-in" replace />} />
              <Route path="/sign-in" element={<Signin />} />
              <Route path="/register" element={<Register />} />
              <Route path='/home' element={<UserDash />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}
export default App