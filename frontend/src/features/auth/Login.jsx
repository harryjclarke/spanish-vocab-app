import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/");
    } catch (err) {
      if (!err.status || err.status === "FETCH_ERROR") {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Incorrect Username or Password");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);

  const errClass = errMsg ? "text-[#d4111e] font-thin ml-2 -mt-5 mb-2" : "";
  const inputFieldClass = errMsg
    ? "bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-red-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  if (isLoading)
    return (
      <div className="bg-gray-900 h-[91.9vh] flex flex-col items-center pt-20"></div>
    );

  const content = (
    <div className="bg-gray-900 h-[91.9vh] flex flex-col items-center pt-20 ">
      {/* <p ref={errRef} className={errClass} aria-live="assertive">
        {errMsg}
      </p> */}

      <form className="w-[30%]" onSubmit={handleSubmit}>
        <div class="grid gap-6 mb-6 md:grid-cols-1">
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="username"
            >
              Username:
            </label>
            <input
              className={inputFieldClass}
              type="text"
              id="username"
              ref={userRef}
              value={username}
              onChange={handleUserInput}
              autoComplete="off"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password:
            </label>
            <input
              className={inputFieldClass}
              type="password"
              id="password"
              onChange={handlePwdInput}
              value={password}
              required
            />
          </div>
        </div>
        <p ref={errRef} className={errClass} aria-live="assertive">
          {errMsg}
        </p>
        <div className="flex items-start mb-6">
          <label
            className="ml-1 text-sm font-medium text-gray-900 dark:text-gray-300"
            htmlFor="persist"
          >
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                id="persist"
                onChange={handleToggle}
                checked={persist}
                className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              />
              <p className="pl-2">Trust This Device</p>
            </div>
          </label>
        </div>

        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Sign In
        </button>
      </form>
    </div>
  );

  return content;
};
export default Login;
