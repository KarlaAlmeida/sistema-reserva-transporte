import './styles.css';
import Button from '../Button';
import ReservationsTable from '../ReservationsTable';

import { useReservations } from '../../contexts/ReservationsContext';

const ReservaForm = () => {

    const {
        formData,
        handleChange,
        handleSubmit,
        isEditing,
        setIsEditing,
        notification,
        showReservations,
        setShowReservations,
        filterStartDate,
        setFilterStartDate,
        filterEndDate,
        setFilterEndDate,
    } = useReservations();


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
                <ReservationsTable />
            )}
        </div>
    );
};

export default ReservaForm;