import { useNavigate } from "react-router-dom";
import { API_URL, API_VERSION } from "../../constants";
import useAuth from "../../hooks/useAuth";

const DeleteTeam = ({ teamId }) => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const handleSubmit = async () => {
    try {
      const response = await fetch(API_URL + API_VERSION + `/teams/${teamId}`, {
        method: "DELETE",
        headers: {
          Authorization: auth.accessToken,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <button
      className="w-full lg:max-w-fit p-2 bg-red-500 hover:bg-red-400 rounded transition-colors"
      onClick={handleSubmit}
    >
      Delete team
    </button>
  );
};

export default DeleteTeam;
