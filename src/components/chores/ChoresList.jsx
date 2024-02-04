import { useEffect, useState } from "react";
import { API_URL, API_VERSION } from "../../constants";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation } from "react-router-dom";

const ChoresList = () => {
  const { auth } = useAuth();
  const [chores, setChores] = useState({});
  const location = useLocation();
  const { teamId } = location?.state || {};

  const truncateText = (str) => {
    return str.length > 100 ? str.substring(0, 80) + "..." : str;
  };

  useEffect(() => {
    const showTeamId = teamId
      ? "?" +
        new URLSearchParams({
          team_ids: teamId,
        })
      : "";
    fetch(`${API_URL}${API_VERSION}/chores${showTeamId}`, {
      headers: {
        Authorization: auth.accessToken,
      },
    })
      .then((response) => response.json())
      .then((payload) => {
        setChores(payload);
      });
  }, []);
  return chores.length > 0 ? (
    <main className="min-w-full min-h-full flex gap-4 flex-wrap justify-center content-start">
      {chores?.map((chore) => (
        <Link
          to={`/teams/${chore.team_id}/chores/${chore.id}`}
          className="border p-4 px-6 rounded-xl hover:bg-slate-700 transition-colors h-32 min-h-32 w-2/5"
          key={chore.id}
        >
          <div className="text-4xl font-bold mb-1">{chore.name}</div>
          <div className="text-lg">{truncateText(chore.description)}</div>
        </Link>
      ))}
      {teamId && (
        <>
          {auth.role === "manager" && (
            <Link to="/teams/${teamId}/chores/new">Create a new chore</Link>
          )}
          <Link to={`/teams/${teamId}`}>Back to team</Link>
        </>
      )}
    </main>
  ) : (
    <main className="chores-list">
      <p>No chores to show :(</p>
      {teamId && (
        <>
          {auth.role === "manager" && (
            <Link to="/teams/${teamId}/chores/new">Create a new chore</Link>
          )}
          <Link to={`/teams/${teamId}`}>Back to team</Link>
        </>
      )}
    </main>
  );
};

export default ChoresList;
