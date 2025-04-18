import { useRef, useState, useEffect } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useLoginMutation } from "../auth/authApiSlice";
import { setCredentials } from "../auth/authSlice";
import { useDispatch } from "react-redux";

const USER_REGEX = /^[A-z0-9]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const NewUserForm = () => {
  const userRef = useRef();

  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();
  const [login, { isLoadingLogin }] = useLoginMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [invalidUsernameMsg, setInvalidUsernameMsg] = useState("");
  const [invalidPasswordMsg, setInvalidPasswordMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      navigate("/");
    }
  }, [isSuccess, navigate]);

  const onUsernameChanged = (e) => {
    setUsername(e.target.value);
    setInvalidUsernameMsg("");
  };
  const onPasswordChanged = (e) => {
    setPassword(e.target.value);
    setInvalidPasswordMsg("");
  };

  const canSave = [validUsername, validPassword].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        await addNewUser({ username, password }).unwrap();
        const { accessToken } = await login({ username, password }).unwrap();
        dispatch(setCredentials({ accessToken }));
        setUsername("");
        setPassword("");
        navigate("/");
      } catch (err) {
        if (!err.status || err.status === "FETCH_ERROR") {
          setErrMsg("No server response");
        } else if (err.status === 409) {
          setErrMsg("This username already exists");
        } else {
          setErrMsg("Unable to register, please try again");
        }
      }
    } else {
      setErrMsg("");
      if (!validUsername)
        setInvalidUsernameMsg("Username should be between 3-20 characters");
      if (!validPassword) setInvalidPasswordMsg("Invalid Password");
    }
  };

  const errClass = errMsg ? "text-[#d4111e] font-thin ml-2 -mt-5 mb-2" : "";
  const validUserMessageClass = invalidUsernameMsg
    ? "text-[#d4111e] font-thin ml-2 -mt-5 -mb-1"
    : "";
  const validPasswordMessageClass = invalidPasswordMsg
    ? "text-[#d4111e] font-thin ml-2 -mt-5 mb-2"
    : "";
  const validUserClass = invalidUsernameMsg
    ? "bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-red-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
  const validPwdClass = invalidPasswordMsg
    ? "bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-red-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  const content = (
    <div className="bg-gray-900 h-[91.9vh] flex flex-col items-center pt-20">
      <form className="w-[30%]" onSubmit={onSaveUserClicked}>
        <div class="grid gap-6 mb-6 md:grid-cols-1">
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="username"
            >
              Username: <span className="nowrap"></span>
            </label>
            <input
              className={validUserClass}
              id="username"
              name="username"
              type="text"
              autoComplete="off"
              ref={userRef}
              value={username}
              onChange={onUsernameChanged}
            />
          </div>
          {invalidUsernameMsg && (
            <p className={validUserMessageClass} aria-live="assertive">
              {invalidUsernameMsg}
            </p>
          )}
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="password"
            >
              Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span>
            </label>
            <input
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${validPwdClass}`}
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={onPasswordChanged}
            />
          </div>
        </div>
        {isError && (
          <p className={errClass} aria-live="assertive">
            {errMsg}
          </p>
        )}{" "}
        {invalidPasswordMsg && (
          <p className={validPasswordMessageClass} aria-live="assertive">
            {invalidPasswordMsg}
          </p>
        )}
        <button
          title="Save"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register
        </button>
      </form>
    </div>
  );

  return content;
};
export default NewUserForm;
