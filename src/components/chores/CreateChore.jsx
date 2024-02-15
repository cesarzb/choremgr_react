import { useEffect, useState } from "react";
import { API_URL, API_VERSION } from "../../constants";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { SingleSelect } from "../shared/SelectList";
import { useFormik } from "formik";
import { choreSchema } from "../../schemas";

const CreateChore = () => {
  const [executor, setExecutor] = useState(null);
  const [executorOptions, setExecutorOptions] = useState([]);
  const { teamId } = useParams();

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
      const choreData = {
        chore: { ...values },
      };
      fetch(API_URL + API_VERSION + `/teams/${teamId}/chores`, {
        method: "POST",
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
    },
    validationSchema: choreSchema,
  });

  useEffect(() => {
    fetch(API_URL + API_VERSION + `/users?team_id=${teamId}`, {
      headers: {
        Authorization: auth.accessToken,
      },
    })
      .then((response) => response.json())
      .then((payload) => {
        setExecutorOptions(payload);
      });
  }, []);

  const mapToSelect = (teamMembers) => {
    return teamMembers
      ? teamMembers?.map((teamMember) => mapSingleToSelect(teamMember))
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

  return (
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
        <label htmlFor="chore-executor" className="chore-executor-label">
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
      <button
        className="bg-orange-500 hover:bg-orange-400 transition-colors rounded p-1"
        type="submit"
      >
        Create chore
      </button>
    </form>
  );
};

export default CreateChore;
