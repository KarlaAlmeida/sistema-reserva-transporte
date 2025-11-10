import React, { createContext, useState, useEffect, useContext } from 'react';
import useForm from '../hooks/useForm';

const ReservationsContext = createContext();

export const useReservations = () => useContext(ReservationsContext);

export const ReservationsProvider = ({ children }) => {
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

    const value = {
        formData,
        handleChange,
        resetForm,
        reservations: filteredReservations,
        isEditing,
        setIsEditing,
        showReservations,
        setShowReservations,
        filterStartDate,
        setFilterStartDate,
        filterEndDate,
        setFilterEndDate,
        notification,
        handleSubmit,
        handleEdit,
        handleDelete,
    };

    return (
        <ReservationsContext.Provider value={value}>
            {children}
        </ReservationsContext.Provider>
    );
};