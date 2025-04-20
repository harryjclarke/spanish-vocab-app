import { FcCheckmark } from "react-icons/fc";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserAnswer = ({ answer }) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <div className="inline"> {`${answer.pronoun} - `}</div>
        <div className="inline italic">{answer.infinitive}</div>
      </th>
      <td className="px-6 py-4">{answer.tense}</td>
      <td className="px-6 py-4">{answer.answer}</td>
      <td className="px-6 py-4">
        <div className="inline-flex items-center pl-0 pr-10 ">
          {answer.answer === answer.conjugation ? (
            <FontAwesomeIcon
              className="text-green-700 text-lg mr-1"
              icon={faCheck}
            />
          ) : (
            <FontAwesomeIcon
              className="text-red-700 text-lg mr-1"
              icon={faTimes}
            />
          )}

          {answer.conjugation}
        </div>
      </td>
    </tr>
  );
};

export default UserAnswer;
