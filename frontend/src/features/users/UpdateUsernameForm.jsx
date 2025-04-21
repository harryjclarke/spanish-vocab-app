import { useState, useEffect } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { useSendLogoutMutation } from "../auth/authApiSlice";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const USER_REGEX = /^[A-z0-9]{3,20}$/;

const UpdateUsernameForm = () => {
  const user = useAuth();
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const [
    sendLogout,
    { isSuccess: isLogoutSuccess, isError: isLogoutError, error: logoutError },
  ] = useSendLogoutMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [invalidUsernameMsg, setInvalidUsernameMsg] = useState("");

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      navigate("/");
    }
  }, [isSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  let canSave;

  canSave = [validUsername].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    if (canSave) {
      try {
        await updateUser({
          id: user.id,
          username,
          password,
          type: "username",
        }).unwrap();
        setUsername("");
        setPassword("");
        await sendLogout({}).unwrap();
        navigate("/");
      } catch (err) {
        console.log(err);
        if (!err.status || err.status === "FETCH_ERROR") {
          setErrMsg("No server response");
        } else if (
          err.status === 400 ||
          err.status === 409 ||
          err.status === 401
        ) {
          setErrMsg(err?.data?.message);
        } else {
          setErrMsg("Unable to update username, please try again");
        }
      }
    } else {
      setErrMsg("");
      if (!validUsername)
        setInvalidUsernameMsg("Username should be between 3-20 characters");
    }
  };

  const errClass = errMsg ? "text-[#d4111e] font-thin ml-2 -mt-5 mb-2" : "";

  const validUserClass = invalidUsernameMsg
    ? "bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-red-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
  const validUserMessageClass = invalidUsernameMsg
    ? "text-[#d4111e] font-thin ml-2 -mt-5 -mb-1"
    : "";
  return (
    <div className="bg-gray-900 h-[91.9vh] flex flex-col items-center pt-20">
      <form className="w-[30%]" onSubmit={(e) => e.preventDefault()}>
        <div class="grid gap-6 mb-6 md:grid-cols-1">
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="username"
            >
              New Username: <span className="nowrap">[3-20 letters]</span>
            </label>
            <input
              className={validUserClass}
              id="username"
              name="username"
              type="text"
              autoComplete="off"
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
              Password:
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
        )}
        <button
          onClick={onSaveUserClicked}
          title="Save"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateUsernameForm;
