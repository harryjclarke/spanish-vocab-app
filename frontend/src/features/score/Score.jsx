import { useNavigate } from "react-router-dom";
import { useGetScoresQuery } from "./scoreApiSlice";
import useAuth from "../../hooks/useAuth";

const Score = ({ scoreId }) => {
  const { id } = useAuth();

  const { score } = useGetScoresQuery("scoresList", {
    selectFromResult: ({ data }) => ({
      score: data?.entities[scoreId],
    }),
  });

  // const score = useSelector((state) => selectScoreById(state, scoreId));
  const navigate = useNavigate();

  if (score) {
    if (score.user !== id) return;
    const handleClick = () => navigate(`/scores/${scoreId}`);

    return (
      <tr className=" border-b bg-gray-800 border-gray-700 ">
        <th
          scope="row"
          className="px-6 py-4 font-medium whitespace-nowrap text-white"
        >
          {score.createdAt.split("T")[0]}
        </th>
        <td className=" px-6 py-4 font-medium  whitespace-nowrap text-white">
          {score.score} / {score.numQuestions}
        </td>

        <td className="px-6 py-4 ">
          <button className="icon-button table__button" onClick={handleClick}>
            Details
          </button>
        </td>
      </tr>
    );
  } else return null;
};
export default Score;
