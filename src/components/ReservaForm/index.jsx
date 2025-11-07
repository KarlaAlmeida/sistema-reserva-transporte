import './styles.css'
import Button from '../Button';
import ReservationsTable from '../ReservationsTable';

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
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Create and Update
    const handleSubmit = (event) => {
        event.preventDefault();

        if (isEditing !== null) {
            // Update logic using spread operator
            const updatedReservations = reservations.map((res) =>
                res.id === isEditing ? { ...formData, id: isEditing } : res
            );
            setReservations(updatedReservations);
            setIsEditing(null);
        } else {
            // Create logic using spread operator
            const newReservation = { ...formData, id: Date.now() };
            setReservations([...reservations, newReservation]);
        }

        // Reset form
        setFormData({
            origin: 'Campina Grande-PB',
            destination: 'Cabaceiras-PB',
            date: '',
            time: '7h',
        });
    };

    // Set form to edit
    const handleEdit = (id) => {
        const reservationToEdit = reservations.find((res) => res.id === id);
        if (reservationToEdit) {
            setFormData(reservationToEdit);
            setIsEditing(id);
        }
    };

    // Delete a reservation using template literals for confirmation
    const handleDelete = (id) => {
        const reservationToDelete = reservations.find((res) => res.id === id);
        if (window.confirm(`Tem certeza que deseja excluir a reserva de ${reservationToDelete.origin} para ${reservationToDelete.destination} no dia ${reservationToDelete.date}?`)) {
            const filteredReservations = reservations.filter((res) => res.id !== id);
            setReservations(filteredReservations);
        }
    };

    return (
        <div>
            <h2>{isEditing ? 'Editar Reserva' : 'Faça sua Reserva'}</h2>
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
                <Button type="submit">{isEditing ? 'Atualizar' : 'Reservar'}</Button>
                {isEditing && <Button onClick={() => setIsEditing(null)}>Cancelar</Button>}
            </form>

            <ReservationsTable 
                reservations={reservations}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </div>
    );
};

export default ReservaForm;