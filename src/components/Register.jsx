import { useState, ChangeEvent, FormEvent } from "react";
import { API_URL } from "../constants";
import { Link, useNavigate } from "react-router-dom";
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
        response.json().then((payload) => {
          const tomorrow = new Date();
          tomorrow.setDate(new Date().getDate() + 1);
          saveToken({
            jwt: response.headers.get("authorization"),
            expiration: tomorrow,
            role: payload.role,
            id: payload.id,
          });
          navigate("/dashboard");
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <main className="min-h-full min-w-full flex justify-center items-center">
      <form className="min-h-80 flex flex-col gap-8" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="w-80 rounded py-2 px-3 text-black focus:outline-orange-500 focus:outline"
            value={email}
            onChange={handleChange}
          ></input>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="w-80 rounded py-2 px-3 text-black focus:outline-orange-500 focus:outline"
            type="password"
            value={password}
            onChange={handleChange}
          ></input>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password-confirmation">Password Confirmation</label>
          <input
            id="password-confirmation"
            className="w-80 rounded py-2 px-3 text-black focus:outline-orange-500 focus:outline"
            type="password"
            value={passwordConfirmation}
            onChange={handleChange}
          ></input>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            className="w-80 rounded py-2 px-3 text-black focus:outline-orange-500 focus:outline"
            value={role}
            onChange={handleChange}
          >
            <option value="0">Executor</option>
            <option value="1">Manager</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <button className="w-80 bg-orange-500 hover:bg-orange-400 rounded p-1 transition-colors">
            Register
          </button>
          <Link
            to="/login"
            className="text-orange-500 hover:text-orange-400 transition-colors"
          >
            Already have an account?
          </Link>
        </div>
      </form>
    </main>
  );
};

export default Register;
