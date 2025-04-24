import { useGetScoresQuery } from "./scoreApiSlice";
import Score from "./Score";
import useAuth from "../../hooks/useAuth";

const ScoresList = () => {
  const { id } = useAuth();

  const {
    data: scores,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetScoresQuery("scoresList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  }); //maybe need to put options here?

  let content;

  if (isLoading)
    content = (
      <div className="bg-gray-900 h-[91.9vh] flex flex-col items-center pt-20"></div>
    );

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    console.log(scores);

    let userScores = false;
    Object.values(scores.entities).forEach((ele) => {
      if (ele.user === id) userScores = true;
    });

    if (!userScores)
      return (
        <div className="bg-gray-900 h-[91.9vh] flex flex-col items-center pt-20">
          <h1 className="text-lg text-gray-200 lg:text-xl dark:text-gray-200">
            No scores saved
          </h1>
        </div>
      );

    const { ids } = scores;

    const tableContent = ids?.length
      ? ids.map((scoreId) => <Score key={scoreId} scoreId={scoreId} />)
      : null;

    content = (
      <div className="bg-gray-900 h-[91.9vh] flex flex-col items-center pt-20">
        <h1 className="text-lg text-gray-200 lg:text-xl dark:text-gray-200">
          Click details to view your answers.
        </h1>
        <div className="w-[30%] relative overflow-x-auto pt-10">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-5 py-3">
                  Score
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>{tableContent}</tbody>
          </table>
        </div>
      </div>
    );
  }

  return content;
};
export default ScoresList;
