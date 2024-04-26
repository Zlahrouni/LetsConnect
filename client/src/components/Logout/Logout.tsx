import "./Logout.css";
import { LoginProps } from "../../types/types.tsx";
import { useNavigate } from "react-router-dom";

const Logout = ({ socket }: LoginProps) => {
  const navigate = useNavigate();

  const logout = (): void => {
    socket.emit(
      "logout",
      { username: localStorage.getItem("username") },
      (response: { error?: string }) => {
        if (response.error) {
          console.error(response.error);
        } else {
          localStorage.removeItem("username");
          navigate("/");
        }
      }
    );
  };

  return (
    <div className="row logout d-flex flex-column align-items-end">
      <button className="btn btn-secondary" type="button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
