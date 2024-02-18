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
  return (
    <main className="min-w-full min-h-full flex flex-col">
      {teamId && (
        <div className="self-center mb-4">
          {auth.role === "manager" && (
            <Link
              className="max-w-fit p-2 bg-orange-500 hover:bg-orange-400 rounded transition-colors"
              to={`/teams/${teamId}/chores/new`}
            >
              Create a new chore
            </Link>
          )}
          {/* <Link
            className="max-w-fit p-2 bg-orange-500 hover:bg-orange-400 rounded transition-colors"
            to={`/teams/${teamId}`}
          >
            Back to team
          </Link> */}
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-4 flex-wrap justify-center content-start">
        {chores.length > 0 ? (
          chores?.map((chore) => (
            <Link
              to={`/teams/${chore.team_id}/chores/${chore.id}`}
              className="border p-4 px-6 rounded-xl hover:bg-slate-700 transition-colors h-32 min-h-32 w-full lg:w-2/5"
              key={chore.id}
            >
              <div className="text-xl lg:text-4xl font-bold mb-1">
                {chore.name}
              </div>
              <div className="text-md lg:text-lg">
                {truncateText(chore.description)}
              </div>
            </Link>
          ))
        ) : (
          <p>No chores to show :(</p>
        )}
      </div>
    </main>
  );
};

export default ChoresList;
