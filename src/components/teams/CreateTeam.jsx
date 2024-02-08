import { useState } from "react";
import { API_URL, API_VERSION } from "../../constants";
import useAuth from "../../hooks/useAuth";
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
    <main className="rounded border p-4 px-6 rounded-xl min-w-full flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <label htmlFor="team-name" className="text-2xl font-bold">
          Team name
        </label>
        <input
          id="team-name"
          className="rounded py-1 px-3 text-black focus:outline-orange-500 focus:outline"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-4">
        <label htmlFor="team-description" className="text-2xl font-bold">
          Team description
        </label>
        <input
          id="team-description"
          className="rounded py-1 px-3 text-black focus:outline-orange-500 focus:outline"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </div>
      <button
        className="bg-orange-500 hover:bg-orange-400 transition-colors rounded p-1"
        onClick={handleSubmit}
      >
        Create team
      </button>
    </main>
  );
};
export default CreateTeam;
