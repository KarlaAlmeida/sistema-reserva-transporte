
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { ReservationsProvider } from './contexts/ReservationsContext';
import { AuthProvider } from './contexts/AuthContext';
import Reserva from './pages/Reserva';
import ReservationDetails from './pages/ReservationDetails';
import Login from './pages/Login';
import Admin from './pages/Admin';
import PrivateRoute from './components/PrivateRoute/index.jsx';


function App() {
  
  return (
    <AuthProvider>
      <ReservationsProvider>
        <Routes>
          <Route path="/" element={<Reserva />} />
          <Route path="/reserva/:id" element={<ReservationDetails />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
        </Routes>
      </ReservationsProvider>
    </AuthProvider>
  )
}

export default App;

