import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectVerbById } from "./verbsApiSlice";

const Verb = ({ verbId }) => {
  const verb = useSelector((state) => selectVerbById(state, verbId));

  const navigate = useNavigate();

  if (verb) {
    const handleClick = () => navigate(`/verbs/${verbId}`);

    return (
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {verb.infinitive}
        </th>
        <td className="px-6 py-4">{verb.definition}</td>

        <td className="px-6 py-4">
          <button className="icon-button table__button" onClick={handleClick}>
            Conjugations
          </button>
        </td>
      </tr>
    );
  } else return null;
};
export default Verb;
