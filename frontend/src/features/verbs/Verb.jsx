import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectVerbById } from "./verbsApiSlice";

const Verb = ({ verbId }) => {
  const verb = useSelector((state) => selectVerbById(state, verbId));

  const navigate = useNavigate();

  if (verb) {
    const handleEdit = () => navigate(`/verbs/${verbId}`);

    return (
      <tr className="table__row">
        <td className="table__cell verb__created">{verb.infinitive}</td>
        <td className="table__cell verb__updated"></td>
        <td className="table__cell verb__title"></td>
        <td className="table__cell verb__username"></td>

        <td className="table__cell">
          <button className="icon-button table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
};
export default Verb;
