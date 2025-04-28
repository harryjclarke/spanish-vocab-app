import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";

const Public = () => {
  const token = useSelector(selectCurrentToken);

  return (
    <div className="bg-gray-900 flex justify-center h-[91.9vh]">
      <div className="flex flex-col justify-around items-center">
        <div className="flex flex-col items-center h-[5%]">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-white">
            Welcome to Verb Trainer
          </h1>

          <p className="text-lg  lg:text-xl text-gray-400">
            A place to test yourself on Spanish verb conjugations.
          </p>

          <p className="text-lg  lg:text-xl text-gray-400">
            Check out the verbs section for a full list of verbs. Be sure to
            sign up if you want to save your score!
          </p>
          <div className="flex items-center mt-8">
            <Link to="/play">
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mr-10 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Test Yourself
              </button>
            </Link>
            {!token && (
              <Link to="/register">
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                  Sign Up
                </button>
              </Link>
            )}
          </div>
        </div>
        <div className="flex items-center"></div>
      </div>
    </div>
  );
};

export default Public;
