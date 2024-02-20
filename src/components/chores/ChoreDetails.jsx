import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useParams } from "react-router-dom";
import { API_URL, API_VERSION } from "../../constants";
import DeleteChore from "./DeleteChore";
import ChoreExecutionsList from "../chore_executions/ChoreExecutionsList";
import { User } from "feather-icons-react";
import { Spinner } from "../shared/Spinner";

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

  const isChoreManager = () =>
    Number(chore?.manager?.id) === Number(auth.currentUserId);

  const isChoreExecutor = () =>
    Number(chore?.executor?.id) === Number(auth.currentUserId);

  return isLoading ? (
    <Spinner />
  ) : (
    <main className="min-w-full">
      <div
        className="rounded border p-4 px-6 rounded-xl min-w-full"
        key={chore.id}
      >
        <div className="text-4xl lg:text-8xl font-bold mb-4 lg:mb-8">
          {chore.name}
        </div>
        <div className="text-xl lg:text-3xl mb-4 lg:mb-8">
          {chore.description}
        </div>
        <div className="flex flex-col gap-2 lg:flex-row mb-4">
          <div className="w-full lg:w-1/2 max-h-80 overflow-auto">
            <div className="text-md lg:text-xl mb-2">Executor:</div>
            <div className="text-sm lg:text-md flex justify-start gap-2">
              <User />
              <div className="font-semibold">{chore.executor.email}</div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 max-h-80 overflow-auto">
            <div className="text-md lg:text-xl mb-2">Manager:</div>
            <div className="text-sm lg:text-md flex justify-start gap-2">
              <User />
              <div className="font-semibold">{chore.manager.email}</div>
            </div>
          </div>
        </div>
        {isChoreManager() && (
          <div className="flex flex-col lg:flex-row gap-2 mb-4">
            <Link
              to={`/teams/${teamId}/chores/${chore.id}/edit`}
              className="flex justify-center lg:justify-start  w-full lg:max-w-fit p-2 bg-orange-500 hover:bg-orange-400 rounded transition-colors"
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
