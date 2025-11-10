
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { ReservationsProvider } from './contexts/ReservationsContext';
import Reserva from './pages/Reserva';
import ReservationDetails from './pages/ReservationDetails';


function App() {
  
  return (
    <ReservationsProvider>
      <Routes>
        <Route path="/" element={<Reserva />} />
        <Route path="/reserva/:id" element={<ReservationDetails />} />
      </Routes>
    </ReservationsProvider>
  )
}

export default App;
