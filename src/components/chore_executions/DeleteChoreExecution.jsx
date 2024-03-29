import { useNavigate } from "react-router-dom";
import { API_URL, API_VERSION } from "../../constants";
import useAuth from "../../hooks/useAuth";

const DeleteChoreExecution = ({
  choreId,
  teamId,
  choreExecutionId,
  setChoreExecutions,
}) => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        API_URL +
          API_VERSION +
          `/teams/${teamId}/chores/${choreId}/chore_executions/${choreExecutionId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: auth.accessToken,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        setChoreExecutions((prev) =>
          prev.filter((exec) => exec.id !== choreExecutionId)
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <button
      className="max-w-fit p-2 bg-red-500 hover:bg-red-400 rounded transition-colors"
      onClick={handleSubmit}
    >
      Cancel
    </button>
  );
};

export default DeleteChoreExecution;
