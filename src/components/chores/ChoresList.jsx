import { useEffect, useState } from "react";
import { API_URL, API_VERSION } from "../../constants";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation } from "react-router-dom";
import Pagination from "../shared/Pagination";

const ChoresList = () => {
  const { auth } = useAuth();
  const [chores, setChores] = useState({});
  const location = useLocation();
  const { teamId } = location?.state || {};
  const [page, setPage] = useState(1);
  const [pageItems, setPageItems] = useState(0);
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
    fetch(`${API_URL}${API_VERSION}/chores${showTeamId}?page=${page}`, {
      headers: {
        Authorization: auth.accessToken,
      },
    })
      .then((response) => response.json())
      .then((payload) => {
        setChores(payload);
      });
  }, [page]);

  useEffect(() => {
    setPageItems(chores.length || 0);
  }, [chores]);

  return (
    <main className="min-w-full min-h-full flex flex-col justify-between">
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
        </div>
      )}
      {chores.length > 0 ? (
        <div className="flex flex-col md:flex-row gap-4 flex-wrap justify-center content-start">
          {chores?.map((chore) => (
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
          ))}
        </div>
      ) : (
        <div className="w-3/5 flex justify-center">
          <div className="text-semibold text-4xl">No chores to show</div>
        </div>
      )}
      {chores.length > 0 && (
        <Pagination page={page} setPage={setPage} pageItems={pageItems} />
      )}
    </main>
  );
};

export default ChoresList;
