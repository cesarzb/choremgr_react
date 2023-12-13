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

      {choreExecutions?.map((choreExecution) => (
        <div className="chore-execution-item" key={choreExecution.id}>
          <div className="chore-execution-date">
            {formattedDate(choreExecution.date)}
          </div>
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
