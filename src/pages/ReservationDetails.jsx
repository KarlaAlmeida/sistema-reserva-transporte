import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useReservations } from '../contexts/ReservationsContext';

function ReservationDetails() {
  const { id } = useParams();
  const { reservations } = useReservations();
  
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState('');

  useEffect(() => {
    if (reservations.length > 0) {
      const foundReservation = reservations.find((res) => res.id === parseInt(id, 10));
      setReservation(foundReservation);
      setLoading(false);
    }
  }, [id, reservations]);

  useEffect(() => {
    if (reservation) {
      const fetchWeather = async () => {
        setWeatherLoading(true);
        setWeatherError('');
        try {
          // Extrai o nome da cidade, assumindo formato "Cidade-UF"
          const cityName = reservation.destination.split('-')[0];
          const response = await axios.get(`https://api.hgbrasil.com/weather?format=json-cors&city_name=${cityName}`);
          
          if (response.data.results.forecast.length > 0) {
            // Tenta encontrar a previsão para a data específica
            const reservationDate = reservation.date.substring(5, 10).split('-').reverse().join('/'); // Formata para DD/MM
            const forecastForDay = response.data.results.forecast.find(f => f.date === reservationDate);
            
            if (forecastForDay) {
                setWeather(forecastForDay);
            } else {
                // Se não achar para o dia, pega a do dia atual como fallback
                setWeather(response.data.results.forecast[0]);
            }
          } else {
            setWeatherError('Previsão não encontrada para esta cidade.');
          }
        } catch {
          setWeatherError('Não foi possível buscar a previsão do tempo.');
        } finally {
          setWeatherLoading(false);
        }
      };
      
      fetchWeather();
    }
  }, [reservation]);

  if (loading) {
    return <p>Carregando detalhes da reserva...</p>;
  }

  if (!reservation) {
    return (
      <div>
        <h2>Reserva não encontrada</h2>
        <p>A reserva que você está procurando não existe ou foi removida.</p>
        <Link to="/">Voltar para a lista</Link>
      </div>
    );
  }

  return (
    <div className="reservation-details">
      <h1>Detalhes da Reserva</h1>
      <p><strong>Origem:</strong> {reservation.origin}</p>
      <p><strong>Destino:</strong> {reservation.destination}</p>
      <p><strong>Data:</strong> {new Date(reservation.date).toLocaleDateString()}</p>
      <p><strong>Hora:</strong> {reservation.time}</p>
      
      <div className="weather-info">
        <h3>Previsão do Tempo no Destino</h3>
        {weatherLoading && <p>Buscando previsão...</p>}
        {weatherError && <p style={{ color: 'red' }}>{weatherError}</p>}
        {weather && (
          <div>
            <p><strong>Data:</strong> {weather.date}</p>
            <p><strong>Temp.:</strong> {weather.min}°C - {weather.max}°C</p>
            <p><strong>Condição:</strong> {weather.description}</p>
          </div>
        )}
      </div>

      <hr />
      <Link to="/">Voltar para a lista de reservas</Link>
    </div>
  );
}

export default ReservationDetails;