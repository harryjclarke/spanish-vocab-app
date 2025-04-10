import { useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";

const SETTINGS_REGEX = /^\/settings(\/)?$/;

const Navbar = () => {
  const linkClass =
    "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2";

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  const sendLogoutHandler = async () => {
    try {
      await sendLogout({}).unwrap();
      if (SETTINGS_REGEX.test(pathname)) navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const token = useSelector(selectCurrentToken);
  let buttons;
  if (!token) {
    buttons = (
      <div className="flex space-x-2">
        <Link to="/verbs" className={linkClass}>
          Verbs
        </Link>
        <Link to="/login" className={linkClass}>
          Log in
        </Link>
        <Link to="/register" className={linkClass}>
          Sign up
        </Link>
      </div>
    );
  } else {
    buttons = (
      <div className="flex space-x-2">
        <Link to="/verbs" className={linkClass}>
          Verbs
        </Link>
        <button className={linkClass} onClick={sendLogoutHandler}>
          Logout
        </button>
        <Link to="/settings" className={linkClass}>
          Settings
        </Link>
      </div>
    );
  }

  return (
    <nav className="bg-red-500 border-b border-red-400 ">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <Link className="flex flex-shrink-0 items-center mr-4" to="/">
              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                Spanish Project
              </span>
            </Link>
            <div className="md:ml-auto">{buttons}</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
