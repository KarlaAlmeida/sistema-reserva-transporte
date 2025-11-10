import './App.css'
import { ReservationsProvider } from './contexts/ReservationsContext'
import Reserva from './pages/Reserva'


function App() {
  
  return (
    <ReservationsProvider>
      <Reserva />
    </ReservationsProvider>
  )
}

export default App
