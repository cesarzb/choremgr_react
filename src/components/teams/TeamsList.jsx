import { useEffect, useState } from "react";
import { API_URL, API_VERSION } from "../../constants";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import Pagination from "../shared/Pagination";

const TeamsList = () => {
  const { auth } = useAuth();
  const [teams, setTeams] = useState({});
  const [page, setPage] = useState(1);
  const [pageItems, setPageItems] = useState(0);

  useEffect(() => {
    fetch(API_URL + API_VERSION + `/teams?page=${page}`, {
      headers: {
        Authorization: auth.accessToken,
      },
    })
      .then((response) => response.json())
      .then((payload) => {
        setTeams(payload);
      });
  }, []);

  useEffect(() => {
    setPageItems(teams.length || 0);
  }, [teams]);

  const truncateText = (str) => {
    return str.length > 100 ? str.substring(0, 80) + "..." : str;
  };

  return (
    <main className="min-w-full min-h-full flex flex-col gap-4 justify-between">
      <div className="flex flex-col gap-8">
        {auth.role === "manager" && (
          <div className="self-center">
            <Link
              to="/teams/new"
              className="sm:max-w-fit p-2 bg-orange-500 hover:bg-orange-400 rounded transition-colors"
            >
              Create a new team
            </Link>
          </div>
        )}
        {teams.length > 0 ? (
          <div className="w-full sm:max-w-fit flex gap-4 flex-wrap justify-center content-start">
            {teams?.map((team) => (
              <Link
                to={`/teams/${team.id}`}
                className="min-w-full sm:max-w-fit border p-4 px-6 rounded-xl hover:bg-slate-700 transition-colors min-w-1/2 w-1/2"
                key={team.id}
              >
                <div className="text-3xl font-bold mb-4">{team.name}</div>
                <div className="mb-4">{truncateText(team.description)}</div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="w-3/5 flex justify-center">
            <div className="text-semibold text-4xl">No teams to show</div>
          </div>
        )}
      </div>
      {teams.length > 0 && (
        <Pagination page={page} setPage={setPage} pageItems={pageItems} />
      )}
    </main>
  );
};

export default TeamsList;
