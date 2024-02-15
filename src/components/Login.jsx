import { useEffect, useState } from "react";
import { API_URL } from "../constants";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const { saveToken } = useAuth();

  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (e.target.id === "email") {
      setEmail(e.target.value);
    } else if (e.target.id === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { user: { email: email, password: password } };

    try {
      const response = await fetch(`${API_URL}/users/sign_in`, {
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
          navigate(from, { replace: true });
        });
      }
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <main className="min-h-full min-w-full max-h-full max-w-full flex justify-center items-center overflow-auto">
      <form className="min-h-80 flex flex-col gap-8" onSubmit={handleSubmit}>
        {error && (
          <div className="w-80 bg-red-300 text-red-800 py-2 px-3 rounded">
            {error}
          </div>
        )}
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
          <label htmlFor="password" className="">
            Password
          </label>
          <input
            id="password"
            className="w-80 rounded py-2 px-3 text-black focus:outline-orange-500 focus:outline"
            type="password"
            value={password}
            onChange={handleChange}
          ></input>
        </div>

        <div className="flex flex-col gap-2">
          <button className="w-80 bg-orange-500 hover:bg-orange-400 transition-colors rounded p-1">
            Login
          </button>
          <Link
            to="/register"
            className="text-orange-500 hover:text-orange-400 transition-colors"
          >
            Create new account
          </Link>
        </div>
      </form>
    </main>
  );
};

export default Login;
