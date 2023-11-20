import { useEffect, useState } from "react";
import { API_URL, API_VERSION } from "../../constants";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { SingleSelect } from "../shared/SelectList";

const CreateChore = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [executor, setExecutor] = useState(null);
  const [executorOptions, setExecutorOptions] = useState([]);
  const { teamId } = useParams();

  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(API_URL + API_VERSION + `/users`, {
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

  const handleSubmit = () => {
    const choreData = {
      chore: { name, description, executor_id: executor.id },
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

  return (
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
        defaultValue={mapSingleToSelect(executor)}
        options={mapToSelect(executorOptions)}
        onChange={handleExecutorChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </main>
  );
};

export default CreateChore;
