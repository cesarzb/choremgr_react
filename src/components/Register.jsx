import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { API_URL } from "../constants";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useFormik } from "formik";
import { userSchema } from "../schemas";

const Register = () => {
  const [errorMsg, setErrorMsg] = useState([]);

  const navigate = useNavigate();
  const { saveToken } = useAuth();

  const submitUser = (values) => {
    const userData = {
      user: {
        ...values,
      },
    };

    fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          response.json().then((data) => {
            if (data) {
              setErrorMsg(data.errors);
            } else {
              setErrorMsg(["Failed to register"]);
            }
          });
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
      })
      .catch(() => {
        setErrorMsg(["No server response"]);
      });
  };

  const { values, errors, handleChange, handleSubmit, handleBlur, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        password_confirmation: "",
        role: "executor",
      },
      onSubmit: submitUser,
      validationSchema: userSchema,
    });

  return (
    <main className="min-h-full min-w-full max-h-full max-w-full flex justify-center items-center overflow-auto">
      <form onSubmit={handleSubmit} className="min-h-80 flex flex-col gap-8">
        {errorMsg.length !== 0 && (
          <div className="w-80 bg-red-300 text-red-800 py-2 px-3 rounded flex flex-col gap-4">
            {errorMsg.map((error, index) => (
              <div className="" key={index}>
                {error}
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className={`w-80 rounded py-1 px-3 text-black ${
              errors.email && touched.email
                ? "outline-red-500 outline"
                : "focus:outline-orange-500 focus:outline"
            }`}
            value={values.email}
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email && (
            <p className="text-red-500">{errors.email}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className={`w-80 rounded py-1 px-3 text-black ${
              errors.password && touched.password
                ? "outline-red-500 outline"
                : "focus:outline-orange-500 focus:outline"
            }`}
            type="password"
            value={values.password}
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched.password && (
            <div className="text-red-500 w-80">{errors.password}</div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password-confirmation">Password Confirmation</label>
          <input
            id="password-confirmation"
            className={`w-80 rounded py-1 px-3 text-black ${
              errors.password_confirmation && touched.password_confirmation
                ? "outline-red-500 outline"
                : "focus:outline-orange-500 focus:outline"
            }`}
            type="password"
            value={values.password_confirmation}
            name="password_confirmation"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password_confirmation && touched.password_confirmation && (
            <p className="text-red-500">{errors.password_confirmation}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            className={`w-80 rounded py-2 px-3 text-black ${
              errors.role && touched.role
                ? "outline-red-500 outline"
                : "focus:outline-orange-500 focus:outline"
            }`}
            value={values.role}
            name="role"
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="executor">Executor</option>
            <option value="manager">Manager</option>
          </select>
          {errors.role && touched.role && (
            <p className="text-red-500">{errors.role}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="submit"
            className="w-80 bg-orange-500 hover:bg-orange-400 rounded p-1 transition-colors"
          >
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
