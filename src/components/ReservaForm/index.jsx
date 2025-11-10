import './styles.css';
import Button from '../Button';
import ReservationsTable from '../ReservationsTable';
import useForm from '../../hooks/useForm';


import React, { useState, useEffect } from 'react';

const ReservaForm = () => {

    const { formData, handleChange, resetForm, setFormData } = useForm({
        origin: 'Campina Grande-PB',
        destination: 'Cabaceiras-PB',
        date: '',
        time: '7h',
    });
    const [reservations, setReservations] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
    const [showReservations, setShowReservations] = useState(false);
    const [filterStartDate, setFilterStartDate] = useState('');
    const [filterEndDate, setFilterEndDate] = useState('');
    const [notification, setNotification] = useState({ message: '', type: '' });

    // Mock data for initial reservations
    const mockReservations = [
        { id: 1, origin: 'Campina Grande-PB', destination: 'Cabaceiras-PB', date: '2025-12-01', time: '7h' },
        { id: 2, origin: 'Cabaceiras-PB', destination: 'Campina Grande-PB', date: '2025-12-02', time: '10h' },
    ];

    // Effect for initial data loading
    useEffect(() => {
        setTimeout(() => {
            setReservations(mockReservations);
        }, 1000); // Simulate 1-second delay
    }, []);

    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const filteredReservations = reservations.filter(reservation => {
        if (!filterStartDate || !filterEndDate) {
            return true;
        }
        const reservationDate = new Date(reservation.date);
        const startDate = new Date(filterStartDate);
        const endDate = new Date(filterEndDate);
        return reservationDate >= startDate && reservationDate <= endDate;
    });


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
            setNotification({ message: 'Reserva atualizada com sucesso!', type: 'success' });
        } else {
            // Create logic using spread operator
            const newReservation = { ...formData, id: Date.now() };
            setReservations([...reservations, newReservation]);
            setNotification({ message: 'Reserva criada com sucesso!', type: 'success' });
        }

        // Reset form
        resetForm();
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
            setNotification({ message: 'Reserva excluída com sucesso!', type: 'success' });
        }
    };

    return (
        <div>
            {notification.message && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}
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

            <div className="reservations-controls">
                <Button onClick={() => setShowReservations(!showReservations)}>
                    {showReservations ? 'Ocultar Reservas' : 'Mostrar Reservas'}
                </Button>

                {showReservations && (
                    <>
                        <div className="date-filters">
                            <label htmlFor="filterStartDate">De:</label>
                            <input type="date" id="filterStartDate" value={filterStartDate} onChange={e => setFilterStartDate(e.target.value)} />
                            <label htmlFor="filterEndDate">Até:</label>
                            <input type="date" id="filterEndDate" value={filterEndDate} onChange={e => setFilterEndDate(e.target.value)} />
                        </div>
                        <Button onClick={() => {
                            setFilterStartDate('');
                            setFilterEndDate('');
                        }}>
                            Ver Todas
                        </Button>
                    </>
                )}
            </div>

            {showReservations && (
                <ReservationsTable
                    reservations={filteredReservations}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            )}
        </div>
    );
};

export default ReservaForm;