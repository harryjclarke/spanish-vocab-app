import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  if (token) {
    const decoded = jwtDecode(token);
    const { id, username } = decoded.UserInfo;

    return { id, username };
  }

  return { id: "", username: "" };
};

export default useAuth;
