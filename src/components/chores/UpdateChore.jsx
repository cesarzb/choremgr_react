import { useEffect, useState } from "react";
import { API_URL, API_VERSION } from "../../constants";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SingleSelect } from "../shared/SelectList";

const UpdateChore = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [executor, setExecutor] = useState(null);
  const [manager, setManager] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [executorOptions, setExecutorOptions] = useState([]);
  const [managerOptions, setMangerOptions] = useState([]);
  const { teamId } = useParams();

  const { auth } = useAuth();
  const navigate = useNavigate();
  const { choreId } = useParams();

  const handleSubmit = () => {
    const choreData = {
      chore: {
        name,
        description,
        executor_id: executor.id,
        manager_id: manager.id,
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
        setName(payload.name);
        setDescription(payload.description);
        setManager(payload.manager);
        setExecutor(payload.executor);
      });

    fetch(API_URL + API_VERSION + `/managers`, {
      headers: {
        Authorization: auth.accessToken,
      },
    })
      .then((response) => response.json())
      .then((payload) => {
        setMangerOptions(payload);
        setIsLoading(false);
      });

    fetch(API_URL + API_VERSION + `/users`, {
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

  const mapToSelect = (teamMembers) => {
    return teamMembers
      ? teamMembers.map((teamMember) => ({
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
  };
  return isLoading ? (
    <div className="loading">Loading...</div>
  ) : (
    <main className="rounded border p-4 px-6 rounded-xl min-w-full flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <label htmlFor="chore-name" className="text-2xl font-bold">
          Chore name
        </label>
        <input
          id="chore-name"
          className="rounded py-2 px-3 text-black focus:outline-orange-500 focus:outline"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-4">
        <label htmlFor="chore-description" className="text-2xl font-bold">
          Chore description
        </label>
        <input
          id="chore-description"
          className="rounded py-2 px-3 text-black focus:outline-orange-500 focus:outline"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
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
        />
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
        />
      </div>
      <button
        className="bg-orange-500 hover:bg-orange-400 transition-colors rounded p-1"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <Link to={`/teams/${teamId}/chores/${choreId}`} className="chore-link">
        Back to chore
      </Link>
    </main>
  );
};
export default UpdateChore;
