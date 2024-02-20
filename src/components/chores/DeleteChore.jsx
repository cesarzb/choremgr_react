import { useNavigate } from "react-router-dom";
import { API_URL, API_VERSION } from "../../constants";
import useAuth from "../../hooks/useAuth";

const DeleteChore = ({ choreId, teamId }) => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        API_URL + API_VERSION + `/teams/${teamId}/chores/${choreId}`,
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
        navigate(`/chores`, { state: { teamId: teamId }, replace: true });
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <button
      className="flex justify-center lg:justify-start  w-full lg:max-w-fit p-2 bg-red-500 hover:bg-red-400 rounded transition-colors"
      onClick={handleSubmit}
    >
      Delete chore
    </button>
  );
};

export default DeleteChore;
