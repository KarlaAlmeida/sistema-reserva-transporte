import { Link } from 'react-router-dom';
import Button from '../Button';
import { useReservations } from '../../contexts/ReservationsContext';

const ReservationsTable = () => {
    const { reservations, handleEdit, handleDelete } = useReservations();

    return (
        <div>
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
                            <th>Ações</th>
                            <th>Detalhes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map(({ id, origin, destination, date, time }) => (
                            <tr key={id}>
                                <td>{origin}</td>
                                <td>{destination}</td>
                                <td>{date}</td>
                                <td>{time}</td>
                                <td>
                                    <Button onClick={() => handleEdit(id)}>Editar</Button>
                                    <Button onClick={() => handleDelete(id)}>Deletar</Button>
                                </td>
                                <td>
                                    <Link to={`/reserva/${id}`}>Ver Detalhes</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ReservationsTable;
