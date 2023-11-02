import { useEffect, useState } from "react";
import { API_URL, API_VERSION } from "../constants";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useParams } from "react-router-dom";
import SelectList from "./shared/SelectList";

const UpdateTeam = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [executors, setExecutors] = useState([]);
  const [managers, setManagers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [executorsOptions, setExecutorsOptions] = useState([]);
  const [managersOptions, setMangersOptions] = useState([]);

  const { auth } = useAuth();
  const navigate = useNavigate();
  const { teamId } = useParams();

  const handleSubmit = () => {
    const teamData = {
      team: {
        name,
        description,
        manager_ids: mapToSubmit(managers),
        executor_ids: mapToSubmit(executors),
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
        setName(payload.name);
        setDescription(payload.description);
        setManagers(payload.managers);
        setExecutors(payload.executors);
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

  const mapToSelect = (teamMembers) => {
    return teamMembers
      ? teamMembers.map((teamMember) => ({
          value: teamMember.id,
          label: teamMember.email,
        }))
      : {};
  };

  const mapToSubmit = (teamMembers) => {
    return teamMembers ? teamMembers.map((teamMember) => teamMember.id) : [];
  };

  return isLoading ? (
    <div className="loading">Loading...</div>
  ) : (
    <main className="create-team-form">
      <label htmlFor="team-name" className="team-name-label">
        Team name
      </label>
      <input
        id="team-name"
        className="team-name-input"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      <label htmlFor="team-description" className="team-description-label">
        Team description
      </label>
      <input
        id="team-description"
        className="team-description-input"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></input>

      <label htmlFor="team-executors" className="team-executors-label">
        Team executors
      </label>

      <SelectList
        id="team-executors"
        className="team-executors-input"
        value={mapToSelect(executors)}
        options={mapToSelect(executorsOptions)}
        onChange={(e) => {
          setExecutors(e);
        }}
      />
      <label htmlFor="team-managers" className="team-managers-label">
        Team managers
      </label>
      <SelectList
        id="team-managers"
        className="team-managers-input"
        value={mapToSelect(managers)}
        options={mapToSelect(managersOptions)}
        onChange={(e) => {
          setManagers(e);
        }}
      />
      <button onClick={handleSubmit}>Submit</button>
      <Link to={`/teams/${teamId}`} className="team-link">
        Back to team
      </Link>
    </main>
  );
};
export default UpdateTeam;
