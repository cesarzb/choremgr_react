import { useEffect, useState } from "react";
import { API_URL, API_VERSION } from "../../constants";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SingleSelect } from "../shared/SelectList";
import { useFormik } from "formik";
import { choreUpdateSchema } from "../../schemas";

const UpdateChore = () => {
  const [executor, setExecutor] = useState(null);
  const [manager, setManager] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [executorOptions, setExecutorOptions] = useState([]);
  const [managerOptions, setMangerOptions] = useState([]);
  const { teamId } = useParams();

  const { auth } = useAuth();
  const navigate = useNavigate();
  const { choreId } = useParams();

  const submitChore = (values) => {
    const choreData = {
      chore: {
        ...values,
      },
    };
    fetch(API_URL + API_VERSION + `/teams/${teamId}/chores/${choreId}`, {
      method: "PUT",
      headers: {
        Authorization: auth.accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(choreData),
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/chores", { state: { teamId: teamId }, replace: true });
      });
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(API_URL + API_VERSION + `/teams/${teamId}/chores/${choreId}`, {
      headers: {
        Authorization: auth.accessToken,
      },
    })
      .then((response) => response.json())
      .then((payload) => {
        setManager(payload.manager);
        setExecutor(payload.executor);
        setFieldValue("name", payload.name);
        setFieldValue("description", payload.description);
        setFieldValue("executor_id", payload.executor.id);
        setFieldValue("manager_id", payload.manager.id);
      });

    fetch(API_URL + API_VERSION + `/managers?team_id=${teamId}`, {
      headers: {
        Authorization: auth.accessToken,
      },
    })
      .then((response) => response.json())
      .then((payload) => {
        setMangerOptions(payload);
        setIsLoading(false);
      });

    fetch(API_URL + API_VERSION + `/users?team_id=${teamId}`, {
      headers: {
        Authorization: auth.accessToken,
      },
    })
      .then((response) => response.json())
      .then((payload) => {
        setExecutorOptions(payload);
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
      manager_id: null,
      executor_id: null,
    },
    onSubmit: submitChore,
    validationSchema: choreUpdateSchema,
  });

  const mapToSelect = (teamMembers) => {
    return teamMembers
      ? teamMembers?.map((teamMember) => ({
          value: teamMember.id,
          label: teamMember.email,
        }))
      : null;
  };

  const mapSingleToSelect = (teamMember) => {
    return teamMember !== null
      ? {
          value: teamMember.id,
          label: teamMember.email,
        }
      : null;
  };

  const handleExecutorChange = (newValue) => {
    setExecutor(
      newValue
        ? {
            id: newValue.value,
            email: newValue.label,
          }
        : {}
    );
    setFieldValue("executor_id", newValue.value);
  };

  const handleManagerChange = (newValue) => {
    setManager(
      newValue
        ? {
            id: newValue.value,
            email: newValue.label,
          }
        : {}
    );
    setFieldValue("manager_id", newValue.value);
  };

  return isLoading ? (
    <div className="loading">Loading...</div>
  ) : (
    <form
      onSubmit={handleSubmit}
      className="rounded border p-4 px-6 rounded-xl min-w-full flex flex-col gap-8"
    >
      <div className="flex flex-col gap-4">
        <label htmlFor="chore-name" className="text-2xl font-bold">
          Chore name
        </label>
        <input
          id="chore-name"
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
        <label htmlFor="chore-description" className="text-2xl font-bold">
          Chore description
        </label>
        <input
          id="chore-description"
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
        <label htmlFor="chore-executor" className="text-2xl font-bold">
          Chore executor
        </label>
        <SingleSelect
          id="chore-executor"
          defaultValue={mapSingleToSelect(executor)}
          options={mapToSelect(executorOptions)}
          onChange={handleExecutorChange}
          name="executor_id"
          onBlur={handleBlur}
        />
        {errors.executor_id && (
          <p className="text-red-500">{errors.executor_id}</p>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <label htmlFor="chore-manager" className="text-2xl font-bold">
          Chore manager
        </label>
        <SingleSelect
          id="chore-manager"
          defaultValue={mapSingleToSelect(manager)}
          options={mapToSelect(managerOptions)}
          onChange={handleManagerChange}
          name="manager_id"
          onBlur={handleBlur}
        />
        {errors.manager_id && (
          <p className="text-red-500">{errors.manager_id}</p>
        )}
      </div>
      <button
        className="bg-orange-500 hover:bg-orange-400 transition-colors rounded p-1"
        type="submit"
      >
        Submit
      </button>
      <Link to={`/teams/${teamId}/chores/${choreId}`} className="chore-link">
        Back to chore
      </Link>
    </form>
  );
};
export default UpdateChore;
