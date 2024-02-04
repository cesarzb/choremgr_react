import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useParams } from "react-router-dom";
import { API_URL, API_VERSION } from "../../constants";
import DeleteChore from "./DeleteChore";
import ChoreExecutionsList from "../chore_executions/ChoreExecutionsList";

const ChoreDetails = () => {
  const { auth } = useAuth();
  const [chore, setChore] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { teamId } = useParams();
  const { choreId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetch(API_URL + API_VERSION + `/teams/${teamId}/chores/${choreId}`, {
      headers: {
        Authorization: auth.accessToken,
      },
    })
      .then((response) => response.json())
      .then((payload) => {
        setChore(payload);
        setIsLoading(false);
      });
  }, []);

  const isChoreManager = () => chore?.manager?.id === auth.currentUserId;

  const isChoreExecutor = () => chore?.executor?.id === auth.currentUserId;

  return isLoading ? (
    <div className="loading">Loading...</div>
  ) : (
    <main className="min-w-full">
      <div
        className="rounded border p-4 px-6 rounded-xl min-w-full"
        key={chore.id}
      >
        <div className="text-8xl font-bold mb-8">{chore.name}</div>
        <div className="text-3xl mb-8">{chore.description}</div>
        <div className="flex mb-4">
          <div className="w-1/2 max-h-80 overflow-auto">
            <div className="text-xl mb-2">Executor:</div>
            <div className="font-bold">{chore.executor.email}</div>
          </div>
          <div className="w-1/2 max-h-80 overflow-auto">
            <div className="text-xl mb-2">Manager:</div>
            <div className="font-bold">{chore.manager.email}</div>
          </div>
        </div>
        {isChoreManager() && (
          <div className="flex gap-2 mb-4">
            <Link
              to={`/teams/${teamId}/chores/${chore.id}/edit`}
              className="max-w-fit p-2 bg-orange-500 hover:bg-orange-400 rounded transition-colors"
            >
              Edit chore
            </Link>
            <DeleteChore choreId={choreId} teamId={teamId} />
          </div>
        )}
        {(isChoreManager() || isChoreExecutor()) && (
          <ChoreExecutionsList
            choreId={choreId}
            teamId={teamId}
            isChoreExecutor={isChoreExecutor()}
          />
        )}
      </div>
    </main>
  );
};

export default ChoreDetails;
