import { useState, ChangeEvent, FormEvent } from "react";
import { API_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [role, setRole] = useState(0);

  const navigate = useNavigate();
  const { saveToken } = useAuth();

  const handleChange = (e) => {
    if (e.target.id === "email") {
      setEmail(e.target.value);
    } else if (e.target.id === "password") {
      setPassword(e.target.value);
    } else if (e.target.id === "password-confirmation") {
      setPasswordConfirmation(e.target.value);
    } else if (e.target.id === "role") {
      setRole(Number(e.target.value));
    }
  };

  const validatePassword = () => {
    return password === passwordConfirmation ? true : false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword()) {
      console.log("Passwords don't match!");
      return;
    }

    const userData = {
      user: {
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
        role: role,
      },
    };

    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const tomorrow = new Date();
        tomorrow.setDate(new Date().getDate() + 1);
        saveToken({
          jwt: response.headers.get("authorization"),
          expiration: tomorrow,
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          id="email"
          className="form-input"
          value={email}
          onChange={handleChange}
        ></input>
      </div>

      <div className="form-field">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          id="password"
          className="form-input"
          type="password"
          value={password}
          onChange={handleChange}
        ></input>
      </div>

      <div className="form-field">
        <label htmlFor="password-confirmation" className="form-label">
          Password Confirmation
        </label>
        <input
          id="password-confirmation"
          className="form-input"
          type="password"
          value={passwordConfirmation}
          onChange={handleChange}
        ></input>
      </div>

      <div className="form-field">
        <label htmlFor="role" className="form-label">
          Role
        </label>
        <select
          id="role"
          className="form-input"
          value={role}
          onChange={handleChange}
        >
          <option value="0">Executor</option>
          <option value="1">Manager</option>
        </select>
      </div>

      <button className="register-btn">Register</button>
    </form>
  );
};

export default Register;
