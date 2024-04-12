import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState({
    value: "",
    isTouched: false,
  });

  const { value, isTouched } = userName;

  const getIsFormValid = (): boolean => {
    return value.length > 0;
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    localStorage.setItem("userName", value);
    navigate("/chat");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="sr-only" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          type="text"
          className="form-control"
          name="username"
          placeholder="Username"
          value={value}
          onBlur={() => setUserName({ ...userName, isTouched: true })}
          onChange={(e) => setUserName({ ...userName, value: e.target.value })}
          autoComplete="off"
        />
        {isTouched && value.length === 0 && (
          <div className="alert alert-danger mt-2" role="alert">
            Username is required
          </div>
        )}
      </div>
      <div className="d-flex justify-content-center mt-2">
        <button
          type="submit"
          className="btn btn-secondary"
          disabled={!getIsFormValid()}
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
