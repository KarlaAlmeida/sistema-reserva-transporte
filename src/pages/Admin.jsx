import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <h1>Bem vindo, {user ? user.username : 'Guest'}!</h1>
      <p>Este é o painel do Administrador.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Admin;