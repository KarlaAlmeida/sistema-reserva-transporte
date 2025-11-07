
import Button from '../Button';

const ReservationsTable = ({ reservations, handleEdit, handleDelete }) => {
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ReservationsTable;