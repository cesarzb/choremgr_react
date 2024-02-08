import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { API_URL } from "../constants";

const Logout = ({ styleClasses }) => {
  const navigate = useNavigate();
  const { saveToken } = useAuth();

  const handleClick = async (e) => {
    e.preventDefault();
    await fetch(`${API_URL}/users/sign_out`, {
      method: "DELETE",
    });

    saveToken({
      jwt: null,
      expiration: null,
      role: null,
      id: null,
    });

    navigate("/");
  };

  return (
    <div onClick={handleClick} className={`${styleClasses} cursor-pointer`}>
      Logout
    </div>
  );
};

export default Logout;
