import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectAllUserAnswers, clearUserAnswers } from "./playSlice";
import { useAddNewScoreMutation } from "../score/scoreApiSlice";
import useAuth from "../../hooks/useAuth";
import UserAnswer from "./UserAnswer";

const Results = ({ score, numQuestions, setGameStart }) => {
  const { id } = useAuth();

  const [scoresSaved, setScoresSaved] = useState(false);
  const userAnswers = useSelector(selectAllUserAnswers);
  const dispatch = useDispatch();

  const [addScore, { isLoading, isSuccess, isError, error }] =
    useAddNewScoreMutation();

  const tableContent = userAnswers
    ? userAnswers.map((answer) => <UserAnswer answer={answer} />)
    : "no answers found";

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(clearUserAnswers());
    setGameStart(false);
  };

  const saveUserScore = async (e) => {
    e.preventDefault();
    if (scoresSaved) return;

    const questions = userAnswers.map((ans) => {
      return {
        infinitive: ans.infinitive,
        tense: ans.tense,
        pronoun: ans.pronoun,
        userAnswer: ans.answer,
        correctAnswer: ans.conjugation,
        correct: ans.answer === ans.conjugation ? true : false,
      };
    });
    const scoreObj = {
      user: id,
      score,
      numQuestions,
      questions,
    };

    try {
      await addScore(scoreObj).unwrap();
    } catch (e) {
      console.log(e);
      return;
    }

    setScoresSaved(true);
  };

  let flexClass = scoresSaved ? "justify-evenly" : "justify-between";

  return (
    <div className="bg-gray-900 h-[91.9vh] flex flex-col items-center">
      <div className="flex justify-center w-[18%]">
        <div className="mt-16 w-full">
          <h1 className="text-center mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
            You Scored:
          </h1>
          <div className="flex justify-center">
            <div className="mt-6 text-gray-900 dark:text-white text-lg">
              {score} / {numQuestions}
            </div>
          </div>
          <div className={`mt-12 flex ${flexClass}`}>
            {!scoresSaved && (
              <button
                onClick={saveUserScore}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Save Score
              </button>
            )}

            <Link to="/">
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Home
              </button>
            </Link>
            <button
              onClick={handleClick}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
      <div className="w-[50%] relative overflow-x-auto pt-10">
        {scoresSaved && (
          <p className="text-center pb-4 text-gray-700 dark:text-gray-200 font-bold">
            Scores Saved!
          </p>
        )}
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Question
              </th>
              <th scope="col" className="px-6 py-3">
                Tense
              </th>
              <th scope="col" className="px-6 py-3">
                Your Answer
              </th>
              <th scope="col" className="px-6 py-3">
                Correct Answer
              </th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Results;

// className="flex flex-col justify-around items-center h-[50%]"
