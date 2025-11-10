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

    const API_URL = 'http://localhost:3001/reservations';

    // Função para buscar reservas da API
    const fetchReservations = async (startDate, endDate, signal) => {
        let url = API_URL;
        const params = new URLSearchParams();

        // Adiciona parâmetros de data se eles existirem, para filtragem no lado do servidor
        if (startDate) params.append('date_gte', startDate);
        if (endDate) params.append('date_lte', endDate);

        const queryString = params.toString();
        if (queryString) {
            url += `?${queryString}`;
        }

        try {
            const response = await fetch(url, { signal });
            if (!response.ok) {
                throw new Error('Falha ao buscar reservas');
            }
            const data = await response.json();
            setReservations(data);
        } catch (error) {
            // Ignora o erro de abortar, que é esperado
            if (error.name !== 'AbortError') {
                setNotification({ message: `Erro ao buscar reservas: ${error.message}`, type: 'error' });
            }
        }
    };

    // Efeito inicial para buscar todas as reservas
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        if (filterStartDate && filterEndDate) {
            fetchReservations(filterStartDate, filterEndDate, signal);
        } else {
            // Se os filtros estiverem vazios, busca todas as reservas
            fetchReservations(null, null, signal);
        }

        // Função de limpeza para abortar a requisição quando o componente for desmontado ou os filtros mudarem
        return () => {
            controller.abort();
        };
    }, [filterStartDate, filterEndDate]);

    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    // Create and Update
    const handleSubmit = async (event) => {
        event.preventDefault();

        const method = isEditing ? 'PUT' : 'POST';
        const url = isEditing ? `${API_URL}/${isEditing}` : API_URL;

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(isEditing ? 'Falha ao atualizar reserva' : 'Falha ao criar reserva');
            }

            setNotification({
                message: `Reserva ${isEditing ? 'atualizada' : 'criada'} com sucesso!`,
                type: 'success',
            });

            setIsEditing(null);
            resetForm();
            fetchReservations(); // Busca todas as reservas novamente
        } catch (error) {
            setNotification({ message: error.message, type: 'error' });
        }

    };

    // Set form to edit
    const handleEdit = (id) => {
        const reservationToEdit = reservations.find((res) => res.id === id);
        if (reservationToEdit) {
            setFormData(reservationToEdit);
            setIsEditing(id);
        }
    };

    // Delete
    const handleDelete = async (id) => {
        const reservationToDelete = reservations.find((res) => res.id === id);
        if (window.confirm(`Tem certeza que deseja excluir a reserva de ${reservationToDelete.origin} para ${reservationToDelete.destination} no dia ${reservationToDelete.date}?`)) {
            try {
                const response = await fetch(`${API_URL}/${id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Falha ao excluir reserva');
                }

                setNotification({ message: 'Reserva excluída com sucesso!', type: 'success' });
                fetchReservations(); // Busca todas as reservas novamente
            } catch (error) {
                setNotification({ message: error.message, type: 'error' });
            }
        }
    };

    const value = {
        formData,
        handleChange,
        resetForm,
        reservations, // Usa o estado de reservas diretamente
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