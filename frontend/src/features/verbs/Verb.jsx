import { useNavigate } from "react-router-dom";
import { useGetVerbsQuery } from "./verbsApiSlice";

const Verb = ({ verbId }) => {
  const { verb } = useGetVerbsQuery("verbsList", {
    selectFromResult: ({ data }) => ({
      verb: data?.entities[verbId],
    }),
  });

  const navigate = useNavigate();

  if (verb) {
    const handleClick = () => navigate(`/verbs/${verbId}`);

    return (
      <tr className="border-b bg-gray-800 border-gray-700 ">
        <th
          scope="row"
          className="px-6 py-4 font-medium whitespace-nowrap text-white"
        >
          {verb.infinitive}
        </th>
        <td className="px-6 py-4">{verb.definition}</td>

        <td className="px-6 py-4">
          <button onClick={handleClick}>Conjugations</button>
        </td>
      </tr>
    );
  } else return null;
};
export default Verb;
