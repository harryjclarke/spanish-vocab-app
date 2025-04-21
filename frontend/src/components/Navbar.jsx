import { useRef, useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import useAuth from "../hooks/useAuth";

const SETTINGS_REGEX = /^\/settings(\/)?$/;

const Navbar = () => {
  const linkClass =
    "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2";

  const user = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  // const dropdownRef = useRef(null);

  const menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  // const closeDropdown = (e) => {
  //   if (open && !dropdownRef.current?.contains(e.target)) {
  //     setOpen(false);
  //   } else if (!open && dropdownRef.current?.contains(e.target)) {
  //     setOpen(true);
  //   }
  // };

  const sendLogoutHandler = async () => {
    try {
      await sendLogout({}).unwrap();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const token = useSelector(selectCurrentToken);

  // document.addEventListener("mousedown", closeDropdown);

  let buttons;
  if (!token) {
    buttons = (
      <div className="flex space-x-2">
        <Link to="/play" className={linkClass}>
          Play
        </Link>
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
        <Link to="/play" className={linkClass}>
          Play
        </Link>
        <Link to="/verbs" className={linkClass}>
          Verbs
        </Link>
        <div className="relative inline-block text-left" ref={menuRef}>
          <div>
            <button
              type="button"
              className="inline-flex w-full text-white hover:text-white justify-center gap-x-1.5 rounded-md px-3 py-2 hover:bg-gray-900"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
              onClick={() => {
                setOpen(!open);
              }}
            >
              {user.username}
              <svg
                className="-mr-1 size-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div
            className={`${
              !open && "hidden"
            } absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-gray-600 shadow-lg ring-1 border-solid border-black border-1 ring-black/5 focus:outline-hidden`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex="-1"
          >
            <div className="py-1" role="none">
              <Link
                onClick={() => {
                  setOpen(!open);
                }}
                to="/scores"
                className="block px-4 py-2 text-sm text-white"
              >
                Scores
              </Link>
              <Link
                onClick={() => {
                  setOpen(!open);
                }}
                to="/settings/edit-profile"
                className="block px-4 py-2 text-sm text-white"
              >
                Edit Profile
              </Link>
              <button
                className="block px-4 py-2 text-sm text-white"
                onClick={() => {
                  setOpen(!open);
                  sendLogoutHandler();
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <nav className="bg-gray-800 border-b-[0.1px] border-gray-500 ">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
        <div className="flex h-[8vh] items-center justify-between">
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
