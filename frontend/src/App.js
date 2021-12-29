import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
import './App.css';
import MainNavigation from './components/Navigation/MainNavigation';
import { AuthProvider } from './context/auth-context';
import Auth from './pages/Auth';
import Booking from './pages/Booking';
import Events from './pages/Events';
import 'bootstrap/dist/css/bootstrap.css'

function App() {

  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)

  const login = (token, userId, tokenExpiration) => {
    setToken(token)
    setUserId(userId)
  }

  const logout = () => {
    setToken(null)
    setUserId(null)
  }
  
  return (
    <div className="App">
      <Router>
        <AuthProvider value={{token, userId, login, logout}} >
          <MainNavigation />

          <main className="main-content">
            <Routes className="main-content">
              <Route path="/grapgql" element={<Navigate replace to="/" />} />
              <Route path="/" element={null} />
              <Route path="/auth" element={<Auth/>} />
              <Route path="/events" element={<Events />} />
              <Route path="/bookings" element={<Booking />} />
            </Routes>
          </main>

        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
