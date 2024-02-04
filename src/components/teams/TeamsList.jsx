import { useEffect, useState } from "react";
import { API_URL, API_VERSION } from "../../constants";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const TeamsList = () => {
  const { auth } = useAuth();
  const [teams, setTeams] = useState({});
  useEffect(() => {
    fetch(API_URL + API_VERSION + "/teams", {
      headers: {
        Authorization: auth.accessToken,
      },
    })
      .then((response) => response.json())
      .then((payload) => {
        setTeams(payload);
      });
  }, []);

  const truncateText = (str) => {
    return str.length > 100 ? str.substring(0, 80) + "..." : str;
  };

  return (
    <main className="min-w-full flex flex-col gap-4">
      {auth.role === "manager" && (
        <Link
          to="/teams/new"
          className="max-w-fit p-2 bg-orange-500 hover:bg-orange-400 rounded transition-colors"
        >
          Create a new team
        </Link>
      )}
      {teams.length > 0 ? (
        teams?.map((team) => (
          <Link
            to={`/teams/${team.id}`}
            className="border p-4 px-6 rounded-xl hover:bg-slate-700 transition-colors min-w-1/2 w-1/2"
            key={team.id}
          >
            <div className="text-3xl font-bold mb-4">{team.name}</div>
            <div className="mb-4">{truncateText(team.description)}</div>
          </Link>
        ))
      ) : (
        <p>No teams to show :(</p>
      )}
    </main>
  );
};

export default TeamsList;
