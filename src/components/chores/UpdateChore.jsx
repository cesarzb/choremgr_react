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
    <main className="create-chore-form">
      <label htmlFor="chore-name" className="chore-name-label">
        Chore name
      </label>
      <input
        id="chore-name"
        className="chore-name-input"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      <label htmlFor="chore-description" className="chore-description-label">
        Chore description
      </label>
      <input
        id="chore-description"
        className="chore-description-input"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></input>

      <label htmlFor="chore-executor" className="chore-executor-label">
        Chore executor
      </label>
      <SingleSelect
        id="chore-executor"
        className="chore-executor-input"
        defaultValue={mapSingleToSelect(executor)}
        options={mapToSelect(executorOptions)}
        onChange={handleExecutorChange}
      />

      <label htmlFor="chore-manager" className="chore-manager-label">
        Chore manager
      </label>
      <SingleSelect
        id="chore-manager"
        className="chore-manager-input"
        defaultValue={mapSingleToSelect(manager)}
        options={mapToSelect(managerOptions)}
        onChange={handleManagerChange}
      />
      <button onClick={handleSubmit}>Submit</button>
      <Link to={`/teams/${teamId}/chores/${choreId}`} className="chore-link">
        Back to chore
      </Link>
    </main>
  );
};
export default UpdateChore;
