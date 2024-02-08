import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useParams } from "react-router-dom";
import { API_URL, API_VERSION } from "../../constants";
import DeleteTeam from "./DeleteTeam";
import { User } from "feather-icons-react";

const TeamDetails = () => {
  const { auth } = useAuth();
  const [team, setTeam] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { teamId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetch(API_URL + API_VERSION + `/teams/${teamId}`, {
      headers: {
        Authorization: auth.accessToken,
      },
    })
      .then((response) => response.json())
      .then((payload) => {
        setTeam(payload);
        setIsLoading(false);
      });
  }, []);
  return isLoading ? (
    <div className="loading">Loading...</div>
  ) : (
    <main className="min-w-full">
      <div className="rounded border p-4 px-6 rounded-xl">
        <div className="text-8xl font-bold mb-8">{team.name}</div>
        <div className="text-3xl mb-8">{team.description}</div>
        <div className="flex mb-4">
          <div className="w-1/2 max-h-80 overflow-auto">
            {team.executors ? (
              <div className="">
                <div className="text-xl mb-2">Executors:</div>
                <div className="font-semibold">
                  {team.executors?.map((executor) => (
                    <div className="mb-4" key={executor.id}>
                      <div className="flex justify-start gap-2">
                        <User />
                        {executor.email}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p>No executors yet...</p>
            )}
          </div>
          <div className="w-1/2 max-h-80 overflow-auto">
            {team.managers ? (
              <div className="">
                <div className="text-xl mb-2">Managers:</div>
                <div className="font-semibold">
                  {team.managers?.map((manager) => (
                    <div className="mb-3" key={manager.id}>
                      <div className="flex justify-start gap-2">
                        <User />
                        {manager.email}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p>No managers yet...</p>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          {auth.role === "manager" && (
            <Link
              to={`/teams/${team.id}/chores/new`}
              className="max-w-fit p-2 bg-orange-500 hover:bg-orange-400 rounded transition-colors"
            >
              Create a chore
            </Link>
          )}
          <Link
            to={`/chores`}
            state={{ teamId: team.id }}
            className="max-w-fit p-2 bg-orange-500 hover:bg-orange-400 rounded transition-colors"
          >
            Show team chores
          </Link>
          {auth.role === "manager" && (
            <>
              <Link
                to={`/teams/${team.id}/edit`}
                className="max-w-fit p-2 bg-orange-500 hover:bg-orange-400 rounded transition-colors"
              >
                Edit team
              </Link>
              <DeleteTeam teamId={teamId} />
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default TeamDetails;
