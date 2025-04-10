import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectVerbById } from "./verbsApiSlice";

const Verb = ({ verbId }) => {
  const verb = useSelector((state) => selectVerbById(state, verbId));

  const navigate = useNavigate();

  if (verb) {
    const handleClick = () => navigate(`/verbs/${verbId}`);

    return (
      <tr className="table__row">
        <td className="table__cell verb__created">{verb.infinitive}</td>
        <td className="table__cell verb__updated">{verb.definition}</td>

        <td className="table__cell">
          <button className="icon-button table__button" onClick={handleClick}>
            Conjugations
          </button>
        </td>
      </tr>
    );
  } else return null;
};
export default Verb;
