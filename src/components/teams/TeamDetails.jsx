import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useParams } from "react-router-dom";
import { API_URL, API_VERSION } from "../../constants";
import DeleteTeam from "./DeleteTeam";

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
    <main className="team-details">
      <div className="team-details-item team-item" key={team.id}>
        <div className="team-details-name team-name">{team.name}</div>
        <div className="team-details-description team-description">
          {team.description}
        </div>
        <div className="team-details-executors">
          {team.executors ? (
            <div className="team-details-executors">
              <div className="team-details-executors-title">Executors:</div>
              <div className="team-details-executors-list">
                {team.executors?.map((executor) => (
                  <div
                    className="team-details-executor-email"
                    key={executor.id}
                  >
                    {executor.email}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>No executors yet...</p>
          )}
        </div>
        <div className="team-details-managers">
          {team.managers ? (
            <div className="team-details-managers">
              <div className="team-details-managers-title">Managers:</div>
              <div className="team-details-managers-list">
                {team.managers?.map((manager) => (
                  <div className="team-details-manager-email" key={manager.id}>
                    {manager.email}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>No managers yet...</p>
          )}
        </div>
        {auth.role === "manager" && (
          <Link
            to={`/teams/${team.id}/chores/new`}
            className="create-chore-link"
          >
            Create a chore
          </Link>
        )}
        <Link
          to={`/chores`}
          state={{ teamId: team.id }}
          className="show-team-chores-link"
        >
          Show team chores
        </Link>
        {auth.role === "manager" && (
          <>
            <Link to={`/teams/${team.id}/edit`} className="team-edit-link">
              Edit team
            </Link>
            <DeleteTeam teamId={teamId} />
          </>
        )}
        <Link to={`/dashboard`} className="teams-link">
          Back to dashboard
        </Link>
      </div>
    </main>
  );
};

export default TeamDetails;
