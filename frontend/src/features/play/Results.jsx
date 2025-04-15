import { Link } from "react-router-dom";

const Results = ({ score, numQuestions }) => {
  return (
    <div className="bg-gray-900 flex justify-center h-[91.9vh]">
      <div className="mt-32">
        <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          You Scored:
        </h1>
        <div className="flex justify-center">
          <div className="mt-6 text-gray-900 dark:text-white text-lg">
            {score} / {numQuestions}
          </div>
        </div>
        <div className="mt-12 flex justify-between">
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Save Score
          </button>
          <Link to="/">
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Results;

// className="flex flex-col justify-around items-center h-[50%]"
