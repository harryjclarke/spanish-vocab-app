import { useState } from "react";
import { setInPlayVerbs } from "./playSlice";
import { useDispatch } from "react-redux";

const Options = ({ onClick }) => {
  const [numQuestions, setNumQuestions] = useState(10);
  const [presentChecked, setPresentChecked] = useState(true);
  const [preteriteChecked, setPreteriteChecked] = useState(true);
  const [imperfectChecked, setImperfectChecked] = useState(true);
  const [futureChecked, setFutureChecked] = useState(true);
  const [conditionalChecked, setConditionalChecked] = useState(true);
  const [irregularChecked, setIrregularChecked] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  const dispatch = useDispatch();

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (
      !presentChecked &&
      !preteriteChecked &&
      !imperfectChecked &&
      !futureChecked &&
      !conditionalChecked
    ) {
      setErrMsg("Select at least one tense");
      return;
    }

    dispatch(
      setInPlayVerbs({
        options: {
          numQuestions,
          presentChecked,
          preteriteChecked,
          imperfectChecked,
          futureChecked,
          conditionalChecked,
          irregularChecked,
        },
      })
    );

    onClick();
  };

  return (
    <div className="bg-gray-900 h-[91.9vh] flex flex-col items-center pt-20">
      <h1 className="text-lg text-gray-200 lg:text-xl">
        Select which tenses you want to be quizzed on.
      </h1>
      <form className="pt-10 max-w-96" onSubmit={onSubmitForm}>
        <div className="text- font-medium text-gray-300 -mt-3 mb-1.5 ml-1">
          Tenses:
        </div>
        <div className="grid gap-4 mb-6 md:grid-cols-2">
          <div className="flex items-start mb-6">
            <label
              className="ml-1 text-sm font-medium text-gray-300"
              htmlFor="present"
            >
              <div className="flex items-center h-5">
                <input
                  className="w-4 h-4 border rounded-sm focus:ring-3 bg-gray-700 border-gray-600 focus:ring-blue-600 dark:ring-offset-gray-800"
                  type="checkbox"
                  id="present"
                  name="present"
                  checked={presentChecked}
                  onChange={() => setPresentChecked(!presentChecked)}
                />
                <p className="pl-2">Present</p>
              </div>
            </label>
          </div>
          <div className="flex items-start mb-6">
            <label
              className="ml-1 text-sm font-medium text-gray-300"
              htmlFor="preterite"
            >
              <div className="flex items-center h-5">
                <input
                  className="w-4 h-4 border rounded-sm focus:ring-3 bg-gray-700 border-gray-600 focus:ring-blue-600 dark:ring-offset-gray-800"
                  type="checkbox"
                  id="preterite"
                  name="preterite"
                  checked={preteriteChecked}
                  onChange={() => setPreteriteChecked(!preteriteChecked)}
                />
                <p className="pl-2">Preterite</p>
              </div>
            </label>
          </div>
          <div className="flex items-start mb-6">
            <label
              className="ml-1 text-sm font-medium text-gray-300"
              htmlFor="imperfect"
            >
              <div className="flex items-center h-5">
                <input
                  className="w-4 h-4 border rounded-sm focus:ring-3 bg-gray-700 border-gray-600 focus:ring-blue-600 dark:ring-offset-gray-800"
                  type="checkbox"
                  id="imperfect"
                  name="imperfect"
                  checked={imperfectChecked}
                  onChange={() => setImperfectChecked(!imperfectChecked)}
                />
                <p className="pl-2">Imperfect</p>
              </div>
            </label>
          </div>
          <div className="flex items-start mb-6">
            <label
              className="ml-1 text-sm font-medium text-gray-300"
              htmlFor="future"
            >
              <div className="flex items-center h-5">
                <input
                  className="w-4 h-4 border rounded-sm focus:ring-3 bg-gray-700 border-gray-600 focus:ring-blue-600 dark:ring-offset-gray-800"
                  type="checkbox"
                  id="future"
                  name="future"
                  checked={futureChecked}
                  onChange={() => setFutureChecked(!futureChecked)}
                />
                <p className="pl-2">Future</p>
              </div>
            </label>
          </div>
          <div className="flex items-start mb-6">
            <label
              className="ml-1 text-sm font-medium text-gray-300"
              htmlFor="conditional"
            >
              <div className="flex items-center h-5">
                <input
                  className="w-4 h-4 border rounded-sm  focus:ring-3 bg-gray-700 border-gray-600 focus:ring-blue-600 dark:ring-offset-gray-800"
                  type="checkbox"
                  id="conditional"
                  name="conditional"
                  checked={conditionalChecked}
                  onChange={() => setConditionalChecked(!conditionalChecked)}
                />
                <p className="pl-2">Conditional</p>
              </div>
            </label>
          </div>
          <div className="flex items-start mb-6">
            <label
              className="ml-1 text-sm font-medium text-gray-300"
              htmlFor="irregular"
            >
              <div className="flex items-center h-5">
                <input
                  className="w-4 h-4 border rounded-sm focus:ring-3 bg-gray-700 border-gray-600 focus:ring-blue-600 dark:ring-offset-gray-800"
                  type="checkbox"
                  id="irregular"
                  name="irregular"
                  checked={irregularChecked}
                  onChange={() => setIrregularChecked(!irregularChecked)}
                />
                <p className="pl-2">Irregular</p>
              </div>
            </label>
          </div>
        </div>
        <div className="flex items-center -mt-4">
          <label
            className="mr-4 whitespace-nowrap block  text-sm font-medium text-white"
            htmlFor="numQuestions"
          >
            Number of Questions:
          </label>

          <input
            className="border w-full text-sm rounded-lg  focus:border-blue-500 block  p-2.5 bg-gray-700 border-gray-600 dark:placeholder-gray-400 text-white focus:ring-blue-500"
            type="number"
            value={numQuestions}
            id="numQuestions"
            name="numQuestions"
            required
            onChange={(e) => setNumQuestions(e.target.value)}
            min="1"
          />
        </div>
        {errMsg && (
          <div className="flex justify-center mt-4 -mb-4">
            <p className="text-gray-300 font-bold">{errMsg}</p>
          </div>
        )}
        <div className="flex justify-center">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-8"
          >
            Start Game
          </button>
        </div>
      </form>
    </div>
  );
};

export default Options;
