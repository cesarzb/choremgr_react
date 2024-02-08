import { useEffect, useState } from "react";
import { API_URL, API_VERSION } from "../../constants";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useParams } from "react-router-dom";
import SelectList from "../shared/SelectList";

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
    <main className="rounded border p-4 px-6 rounded-xl min-w-full flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <label htmlFor="team-name" className="text-2xl font-bold">
          Team name
        </label>
        <input
          id="team-name"
          className="rounded py-2 px-3 text-black focus:outline-orange-500 focus:outline"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-4">
        <label htmlFor="team-description" className="text-2xl font-bold">
          Team description
        </label>
        <input
          id="team-description"
          className="rounded py-2 px-3 text-black focus:outline-orange-500 focus:outline"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
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
          onChange={(e) => {
            setExecutors(e);
          }}
        />
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
          onChange={(e) => {
            setManagers(e);
          }}
        />
      </div>
      <button
        className="bg-orange-500 hover:bg-orange-400 transition-colors rounded p-1"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <Link to={`/teams/${teamId}`} className="team-link">
        Back to team
      </Link>
    </main>
  );
};
export default UpdateTeam;
