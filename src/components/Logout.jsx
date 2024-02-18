import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { API_URL } from "../constants";
import { LogOut } from "feather-icons-react";

const Logout = ({ clickFunction, styleClasses }) => {
  const navigate = useNavigate();
  const { saveToken } = useAuth();

  const { auth } = useAuth();

  const handleClick = async (e) => {
    e.preventDefault();
    clickFunction();
    await fetch(`${API_URL}/users/sign_out`, {
      method: "DELETE",
      headers: {
        Authorization: auth.accessToken,
      },
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
      <LogOut />
      <div>Logout</div>
    </div>
  );
};

export default Logout;
