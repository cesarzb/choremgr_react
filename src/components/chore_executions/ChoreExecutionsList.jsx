import { useEffect, useState } from "react";
import { API_URL, API_VERSION } from "../../constants";
import useAuth from "../../hooks/useAuth";
import DeleteChoreExecution from "./DeleteChoreExecution";
import CreateChoreExecution from "./CreateChoreExecution";

const ChoreExecutionsList = ({ teamId, choreId, isChoreExecutor }) => {
  const { auth } = useAuth();
  const [choreExecutions, setChoreExecutions] = useState({});

  useEffect(() => {
    fetch(
      API_URL +
        API_VERSION +
        `/teams/${teamId}/chores/${choreId}/chore_executions`,
      {
        headers: {
          Authorization: auth.accessToken,
        },
      }
    )
      .then((response) => response.json())
      .then((payload) => {
        setChoreExecutions(payload);
      });
  }, []);

  const formattedDate = (isoDateString) => {
    const date = new Date(isoDateString);

    const options = {
      hour: "numeric",
      minute: "numeric",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };

    return date.toLocaleString("pl-PL", options);
  };

  return choreExecutions.length > 0 ? (
    <main className="max-h-80">
      {isChoreExecutor && (
        <CreateChoreExecution
          choreId={choreId}
          teamId={teamId}
          choreExecutions={choreExecutions}
          setChoreExecutions={setChoreExecutions}
        />
      )}
      <div className="text-xl mb-2">Chore executions:</div>

      <div className="max-h-60 overflow-auto grid grid-cols-3 gap-4">
        {choreExecutions?.map((choreExecution) => (
          <div
            className="rounded border p-4 px-6 rounded-xl flex justify-between items-baseline"
            key={choreExecution.id}
          >
            <div className="text-xl">{formattedDate(choreExecution.date)}</div>
            {isChoreExecutor && (
              <DeleteChoreExecution
                choreId={choreId}
                teamId={teamId}
                choreExecutionId={choreExecution.id}
                choreExecutions={choreExecutions}
                setChoreExecutions={setChoreExecutions}
              />
            )}
          </div>
        ))}
      </div>
    </main>
  ) : (
    <main className="chore-executions-list">
      <div className="create-chore-execution">
        <p>Chore executions:</p>
        {isChoreExecutor && (
          <CreateChoreExecution
            choreId={choreId}
            teamId={teamId}
            choreExecutions={choreExecutions}
            setChoreExecutions={setChoreExecutions}
          />
        )}
      </div>
      <p>Chore has never been executed</p>
    </main>
  );
};

export default ChoreExecutionsList;
