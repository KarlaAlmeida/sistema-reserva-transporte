import React, { useState } from 'react'

const ReservaForm = () => {

    const [reservations, setReservations] = useState([]);
    const [formData, setFormData] = useState({
        origin: 'Campina Grande-PB',
        destination: 'Cabaceiras-PB',
        date: '',
        time: '7h',
    });
    const [isEditing, setIsEditing] = useState(null);

    // Arrow function and destructuring
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Create
    const handleSubmit = (e) => {
        e.preventDefault();

        // Create logic using spread operator
        const newReservation = { ...formData, id: Date.now() };
        setReservations([...reservations, newReservation]);

        // Reset form
        setFormData({
            origin: 'Campina Grande-PB',
            destination: 'Cabaceiras-PB',
            date: '',
            time: '7h',
        });
    };

    return (
        <div>
            <h2>{'Faça sua Reserva'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="origin">Origem:</label>
                    <select id="origin" name="origin" value={formData.origin} onChange={handleChange}>
                        <option value="Campina Grande-PB">Campina Grande-PB</option>
                        <option value="Cabaceiras-PB">Cabaceiras-PB</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="destination">Destino:</label>
                    <select id="destination" name="destination" value={formData.destination} onChange={handleChange}>
                        <option value="Cabaceiras-PB">Cabaceiras-PB</option>
                        <option value="Campina Grande-PB">Campina Grande-PB</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="date">Data:</label>
                    <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="time">Horário:</label>
                    <select id="time" name="time" value={formData.time} onChange={handleChange}>
                        <option value="7h">7h</option>
                        <option value="10h">10h</option>
                        <option value="14h">14h</option>
                        <option value="17h">17h</option>
                    </select>
                </div>
                <button type="submit">{'Reservar'}</button>
            </form>

            <h2>Reservas Atuais</h2>
            {reservations.length === 0 ? (
                <p>Nenhuma reserva encontrada.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Origem</th>
                            <th>Destino</th>
                            <th>Data</th>
                            <th>Horário</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map(({ id, origin, destination, date, time }) => ( // Destructuring here
                            <tr key={id}>
                                <td>{origin}</td>
                                <td>{destination}</td>
                                <td>{date}</td>
                                <td>{time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ReservaForm;