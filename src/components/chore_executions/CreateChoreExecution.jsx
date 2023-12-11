import { useNavigate } from "react-router-dom";
import { API_URL, API_VERSION } from "../../constants";
import useAuth from "../../hooks/useAuth";

const CreateChoreExecution = ({ choreId, teamId, setChoreExecutions }) => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        API_URL +
          API_VERSION +
          `/teams/${teamId}/chores/${choreId}/chore_executions`,
        {
          method: "POST",
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          } else {
            return response.json();
          }
        })
        .then((payload) => {
          setChoreExecutions((prev) => [payload.chore_execution, ...prev]);
        });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="delete-chore">
      <button className="delete-chore-button" onClick={handleSubmit}>
        Execute chore
      </button>
    </div>
  );
};

export default CreateChoreExecution;
