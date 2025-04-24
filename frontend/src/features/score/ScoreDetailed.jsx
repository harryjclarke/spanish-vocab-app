import React from "react";
import { useParams } from "react-router-dom";
import { useGetScoresQuery } from "./scoreApiSlice";
import ScoreRow from "./ScoreRow";

const ScoreDetailed = () => {
  const { id } = useParams();
  // const score = useSelector((state) => selectScoreById(state, id));

  const { score } = useGetScoresQuery("scoresList", {
    selectFromResult: ({ data }) => ({
      score: data?.entities[id],
    }),
  });

  const tableContent = score
    ? score.questions.map((answer) => <ScoreRow answer={answer} />)
    : "no answers found";

  return (
    <div className="bg-gray-900 h-[91.9vh] flex flex-col items-center">
      <div className="flex justify-center w-[18%]">
        <div className="mt-16 w-full">
          <div className="flex flex-col justify-center items-center">
            <div className="mt-6 text-gray-900 dark:text-white text-lg font-bold">
              {score.createdAt.split("T")[0]}
            </div>
            <div className="mt-2 text-gray-900 dark:text-white text-lg font-thin">
              {score.score} / {score.numQuestions}
            </div>
          </div>
        </div>
      </div>
      <div className="w-[50%] relative overflow-x-auto pt-10">
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

export default ScoreDetailed;
