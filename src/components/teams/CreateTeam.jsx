import { useState } from "react";
import { API_URL, API_VERSION } from "../../constants";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { teamSchema } from "../../schemas";

const CreateTeam = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { auth } = useAuth();
  const navigate = useNavigate();

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setFieldValue,
    handleBlur,
    touched,
  } = useFormik({
    initialValues: {
      name: "",
      description: "",
      executor_id: "",
    },
    onSubmit: (values) => {
      const teamData = { team: { ...values } };
      fetch(API_URL + API_VERSION + `/teams`, {
        method: "POST",
        headers: {
          Authorization: auth.accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teamData),
      })
        .then((response) => response.json())
        .then(() => {
          navigate("/dashboard", { replace: true });
        });
    },
    validationSchema: teamSchema,
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded border p-4 px-6 rounded-xl min-w-full flex flex-col gap-8"
    >
      <div className="flex flex-col gap-4">
        <label htmlFor="team-name" className="text-2xl font-bold">
          Team name
        </label>
        <input
          id="team-name"
          className={`rounded py-1 px-3 text-black ${
            errors.name && touched.name
              ? "outline-red-500 outline"
              : "focus:outline-orange-500 focus:outline"
          }`}
          value={values.name}
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.name && touched.name && (
          <p className="text-red-500">{errors.name}</p>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <label htmlFor="team-description" className="text-2xl font-bold">
          Team description
        </label>
        <input
          id="team-description"
          className={`rounded py-1 px-3 text-black ${
            errors.description && touched.description
              ? "outline-red-500 outline"
              : "focus:outline-orange-500 focus:outline"
          }`}
          value={values.description}
          name="description"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.description && touched.description && (
          <p className="text-red-500">{errors.description}</p>
        )}
      </div>
      <button className="bg-orange-500 hover:bg-orange-400 transition-colors rounded p-1">
        Create team
      </button>
    </form>
  );
};
export default CreateTeam;
