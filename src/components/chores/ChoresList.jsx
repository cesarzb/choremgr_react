import { useEffect, useState } from "react";
import { API_URL, API_VERSION } from "../../constants";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation } from "react-router-dom";

const ChoresList = () => {
  const { auth } = useAuth();
  const [chores, setChores] = useState({});
  const location = useLocation();
  const { teamId } = location?.state || {};

  useEffect(() => {
    fetch(
      API_URL +
        API_VERSION +
        "/chores?" +
        new URLSearchParams({
          team_ids: teamId,
        }),
      {
        headers: {
          Authorization: auth.accessToken,
        },
      }
    )
      .then((response) => response.json())
      .then((payload) => {
        setChores(payload);
      });
  }, []);
  return chores.length > 0 ? (
    <main className="chores-list">
      {chores?.map((chore) => (
        <div className="chore-item" key={chore.id}>
          <div className="chore-name">{chore.name}</div>
          <div className="chore-description">{chore.description}</div>
          <Link
            to={`/teams/${chore.team_id}/chores/${chore.id}`}
            className="chore-link"
          >
            Show chore
          </Link>
        </div>
      ))}
      {teamId ? (
        <>
          {auth.role === "manager" && (
            <Link to="/teams/${teamId}/chores/new">Create a new chore</Link>
          )}
          <Link to={`/teams/${teamId}`}>Back to team</Link>
        </>
      ) : (
        <Link to="/dashboard">Back to dashboard</Link>
      )}
    </main>
  ) : (
    <main className="chores-list">
      <p>No chores to show :(</p>
      {teamId ? (
        <>
          {auth.role === "manager" && (
            <Link to="/teams/${teamId}/chores/new">Create a new chore</Link>
          )}
          <Link to={`/teams/${teamId}`}>Back to team</Link>
        </>
      ) : (
        <Link to="/dashboard">Back to dashboard</Link>
      )}
    </main>
  );
};

export default ChoresList;
