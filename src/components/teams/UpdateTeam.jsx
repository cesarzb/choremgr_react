import { useEffect, useState } from "react";
import { API_URL, API_VERSION } from "../../constants";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useParams } from "react-router-dom";
import SelectList from "../shared/SelectList";
import { teamUpdateSchema } from "../../schemas";
import { useFormik } from "formik";

const UpdateTeam = () => {
  const [executors, setExecutors] = useState([]);
  const [managers, setManagers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [executorsOptions, setExecutorsOptions] = useState([]);
  const [managersOptions, setMangersOptions] = useState([]);

  const { auth } = useAuth();
  const navigate = useNavigate();
  const { teamId } = useParams();

  const submitTeam = (values) => {
    const teamData = {
      team: {
        name: values.name,
        description: values.description,
        manager_ids: mapToSubmit(values.managers),
        executor_ids: mapToSubmit(values.executors),
      },
    };

    fetch(API_URL + API_VERSION + `/teams/${teamId}`, {
      method: "PUT",
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
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(API_URL + API_VERSION + `/teams/${teamId}`, {
      headers: {
        Authorization: auth.accessToken,
      },
    })
      .then((response) => response.json())
      .then((payload) => {
        setManagers(payload.managers);
        setExecutors(payload.executors);
        setFieldValue("name", payload.name);
        setFieldValue("description", payload.description);
        setFieldValue("executors", payload.executors);
        setFieldValue("managers", payload.managers);
      });

    fetch(API_URL + API_VERSION + `/managers`, {
      headers: {
        Authorization: auth.accessToken,
      },
    })
      .then((response) => response.json())
      .then((payload) => {
        setMangersOptions(payload);
        setIsLoading(false);
      });

    fetch(API_URL + API_VERSION + `/users`, {
      headers: {
        Authorization: auth.accessToken,
      },
    })
      .then((response) => response.json())
      .then((payload) => {
        setExecutorsOptions(payload);
        setIsLoading(false);
      });

    setIsLoading(false);
  }, []);

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
      managers: [],
      executors: [],
    },
    onSubmit: submitTeam,
    validationSchema: teamUpdateSchema,
  });

  const mapToSelect = (teamMembers) => {
    return teamMembers
      ? teamMembers?.map((teamMember) => ({
          value: teamMember.id,
          label: teamMember.email,
        }))
      : {};
  };

  const mapToSubmit = (teamMembers) => {
    return teamMembers ? teamMembers?.map((teamMember) => teamMember.id) : [];
  };

  const handleExecutorsChange = (newValues) => {
    setExecutors(newValues);
    setFieldValue("executors", newValues);
  };

  const handleManagersChange = (newValues) => {
    setManagers(newValues);
    setFieldValue("managers", newValues);
  };

  return isLoading ? (
    <div className="loading">Loading...</div>
  ) : (
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

      <div className="flex flex-col gap-4">
        <label htmlFor="team-executors" className="text-2xl font-bold">
          Team executors
        </label>
        <SelectList
          id="team-executors"
          className="rounded py-2 px-3 text-black focus:outline-orange-500 focus:outline"
          value={mapToSelect(executors)}
          options={mapToSelect(executorsOptions)}
          name="executors"
          onBlur={handleBlur}
          onChange={handleExecutorsChange}
        />
        {errors.executors && <p className="text-red-500">{errors.executors}</p>}
      </div>
      <div className="flex flex-col gap-4">
        <label htmlFor="team-managers" className="text-2xl font-bold">
          Team managers
        </label>
        <SelectList
          id="team-managers"
          className="rounded py-2 px-3 text-black focus:outline-orange-500 focus:outline"
          value={mapToSelect(managers)}
          options={mapToSelect(managersOptions)}
          onChange={handleManagersChange}
          name="managers"
          onBlur={handleBlur}
        />
        {errors.managers && <p className="text-red-500">{errors.managers}</p>}
      </div>
      <button
        className="bg-orange-500 hover:bg-orange-400 transition-colors rounded p-1"
        type="submit"
      >
        Submit
      </button>
      <Link to={`/teams/${teamId}`} className="team-link">
        Back to team
      </Link>
    </form>
  );
};
export default UpdateTeam;
