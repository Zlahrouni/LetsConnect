import "./Logout.css";
import { LoginProps } from "../../types/types.tsx";

const Logout = ({ socket }: LoginProps) => {
  const logout = (): void => {
    socket.emit("logout", { username: localStorage.getItem("username") });
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
