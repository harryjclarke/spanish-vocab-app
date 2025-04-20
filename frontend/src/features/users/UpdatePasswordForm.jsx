import { useState, useEffect } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { useSendLogoutMutation } from "../auth/authApiSlice";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const UpdatePasswordForm = () => {
  const user = useAuth();
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const [
    sendLogout,
    { isSuccess: isLogoutSuccess, isError: isLogoutError, error: logoutError },
  ] = useSendLogoutMutation();

  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [invalidPasswordMsg, setInvalidPasswordMsg] = useState("");

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(newPassword));
  }, [newPassword]);

  useEffect(() => {
    if (isSuccess) {
      setNewPassword("");
      setPassword("");
      navigate("/");
    }
  }, [isSuccess, navigate]);

  const onNewPasswordChanged = (e) => {
    setNewPassword(e.target.value);
    setInvalidPasswordMsg("");
  };
  const onPasswordChanged = (e) => setPassword(e.target.value);
  let canSave;

  canSave = [validPassword].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    if (canSave) {
      try {
        await updateUser({
          id: user.id,
          password,
          newPassword,
          type: "password",
        }).unwrap();
        setNewPassword("");
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
          setErrMsg("Unable to update password, please try again");
        }
      }
    } else {
      setErrMsg("");
      if (!validPassword)
        setInvalidPasswordMsg("Password should be 4-12 chars incl. !@#$%");
    }
  };

  const errClass = errMsg ? "text-[#d4111e] font-thin ml-2 -mt-5 mb-2" : "";

  const validPassClass = invalidPasswordMsg
    ? "bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-red-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
  const validPasswordMessageClass = invalidPasswordMsg
    ? "text-[#d4111e] font-thin ml-2 -mt-5 -mb-1"
    : "";
  return (
    <div className="bg-gray-900 h-[91.9vh] flex flex-col items-center pt-20">
      <form className="w-[30%]" onSubmit={(e) => e.preventDefault()}>
        <div class="grid gap-6 mb-6 md:grid-cols-1">
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="password"
            >
              Current Password <span className="nowrap"></span>
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="password"
              name="password"
              type="text"
              autoComplete="off"
              value={password}
              onChange={onPasswordChanged}
            />
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="newPassword"
            >
              New Password:
            </label>
            <input
              className={validPassClass}
              id="newPassword"
              name="newPassword"
              type="newPassword"
              value={newPassword}
              onChange={onNewPasswordChanged}
            />
          </div>
          {invalidPasswordMsg && (
            <p className={validPasswordMessageClass} aria-live="assertive">
              {invalidPasswordMsg}
            </p>
          )}
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

export default UpdatePasswordForm;
