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
  return isLoading ? (
    <div className="loading">Loading...</div>
  ) : (
    <main className="chore-details">
      <div className="chore-details-item chore-item" key={chore.id}>
        <div className="chore-details-name chore-name">{chore.name}</div>
        <div className="chore-details-description chore-description">
          {chore.description}
        </div>
        <div className="chore-details-executors">
          <div className="chore-details-executors">
            <div className="chore-details-executors-title">Executor:</div>
            <div className="chore-details-executors-list">
              <div className="chore-details-executor-email">
                {chore.executor.email}
              </div>
            </div>
          </div>
        </div>
        <div className="chore-details-managers">
          <div className="chore-details-managers">
            <div className="chore-details-managers-title">Manager:</div>
            <div className="chore-details-managers-list">
              <div className="chore-details-manager-email">
                {chore.manager.email}
              </div>
            </div>
          </div>
        </div>
        <ChoreExecutionsList choreId={choreId} teamId={teamId} />
        <DeleteChore choreId={choreId} teamId={teamId} />
        <Link
          to={`/teams/${teamId}/chores/${chore.id}/edit`}
          className="chore-edit-link"
        >
          Edit chore
        </Link>
        <Link to={`/teams/${teamId}`} className="team-link">
          Back to team
        </Link>
      </div>
    </main>
  );
};

export default ChoreDetails;
