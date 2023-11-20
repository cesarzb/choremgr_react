import { useEffect, useState } from "react";
import { API_URL, API_VERSION } from "../../constants";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const TeamsList = () => {
  const { auth } = useAuth();
  const [teams, setTeams] = useState({});
  useEffect(() => {
    fetch(API_URL + API_VERSION + "/teams", {
      headers: {
        Authorization: auth.accessToken,
      },
    })
      .then((response) => response.json())
      .then((payload) => {
        setTeams(payload);
      });
  }, []);

  return teams.length > 0 ? (
    <main className="teams-list">
      {teams?.map((team) => (
        <div className="team-item" key={team.id}>
          <div className="team-name">{team.name}</div>
          <div className="team-description">{team.description}</div>
          <Link to={`/teams/${team.id}`} className="team-link">
            Show team
          </Link>
        </div>
      ))}
      <Link to="/teams/new">Create a new team</Link>
    </main>
  ) : (
    <main>
      <p>No teams to show :(</p>
      <Link to="/teams/new">Create a new team</Link>
    </main>
  );
};

export default TeamsList;
