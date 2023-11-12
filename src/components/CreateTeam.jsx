import { useEffect, useState } from "react";
import { API_URL, API_VERSION } from "../constants";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const CreateTeam = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { auth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = () => {
    const teamData = { team: { name, description } };
    fetch(API_URL + API_VERSION + `/teams`, {
      method: "POST",
      headers: {
        Authorization: auth.accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(teamData),
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/dashboard", { replace: true });
      });
  };

  return (
    <main className="create-team-form">
      <label htmlFor="team-name" className="team-name-label">
        Team name
      </label>
      <input
        id="team-name"
        className="team-name-input"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      <label htmlFor="team-description" className="team-description-label">
        Team description
      </label>
      <input
        id="team-description"
        className="team-description-input"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></input>
      <button onClick={handleSubmit}>Submit</button>
    </main>
  );
};
export default CreateTeam;
