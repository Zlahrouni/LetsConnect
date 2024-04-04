import { useNavigate } from 'react-router-dom';
import "./Logout.css";

function Logout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('userName');
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="row logout">
      <button className="btn" type="button" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Logout;