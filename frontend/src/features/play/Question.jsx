import Results from "./Results.jsx";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAllOptions } from "./playSlice";
import { selectAllInPlay } from "./playSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import e from "cors";

const Question = () => {
  let content;
  const options = useSelector(selectAllOptions);
  const inPlayWords = useSelector(selectAllInPlay);
  let numQuestions = options.numQuestions;
  if (numQuestions > inPlayWords.length) numQuestions = inPlayWords.length;
  // const numQuestions = 2; //to be updated to use state
  // const inPlayWords = [
  //   {
  //     infinitive: "hablar",
  //     tense: "present",
  //     pronoun: "yo",
  //     conjugation: "hablo",
  //   },
  //   {
  //     infinitive: "comer",
  //     tense: "present",
  //     pronoun: "yo",
  //     conjugation: "como",
  //   },
  // ];
  const userRef = useRef();
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [wordsIndex, setWordsIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const currentWord = inPlayWords[wordsIndex];
  const spanCharacterButtonClass =
    "rounded py-2.5 px-3 bg-blue-700 hover:bg-blue-800 text-white";

  if (currentWord) {
    var infinitive = currentWord.infinitive;
    var tense = currentWord.tense;
    var pronoun = currentWord.pronoun;
    var conjugation = currentWord.conjugation;
    var definition = currentWord.definition;
  }
  useEffect(() => {
    userRef.current.focus();
  }, []);

  const onAnswerChanged = (e) => setAnswer(e.target.value);

  const onCharacterButtonClicked = (e) => {
    setAnswer(answer + e.target.value);
  };

  const answerSubmit = (e) => {
    e.preventDefault();
    if (answer === conjugation) {
      console.log("good");
      let newScore = score + 1;
      setScore(newScore);
    } else {
      console.log("bad");
    }
    // store score in score state

    const nextWordsIndex = wordsIndex + 1;

    if (nextWordsIndex >= numQuestions) {
      setShowResults(true);
    } else {
      setWordsIndex(wordsIndex + 1);
    }
  };

  if (showResults) {
    content = <Results score={score} numQuestions={numQuestions} />;
  } else {
    content = (
      <div className="bg-gray-900 h-[91.9vh] flex flex-col items-center pt-20">
        <div className="flex justify-center w-[30%] relative overflow-x-auto pt-10">
          <table className="w-[90%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Verb
                </th>
                <td className="px-6 py-4">{infinitive}</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Definition
                </th>
                <td className="px-6 py-4">{definition}</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Tense
                </th>
                <td className="px-6 py-4">{tense}</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {pronoun}
                </th>
                <td className="pl-6 py-4">
                  <form onSubmit={answerSubmit}>
                    <div className="flex items-center">
                      <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block "
                        ref={userRef}
                        type="text"
                        autocomplete="off"
                        required
                        value={answer}
                        onChange={onAnswerChanged}
                      />
                      <div>
                        <button className="ml-16 rounded bg-blue-700 hover:bg-blue-800 py-2 px-3">
                          <FontAwesomeIcon
                            className="text-lg"
                            icon={faArrowRight}
                          />
                        </button>
                      </div>
                    </div>
                  </form>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-5 w-[15%] flex justify-between">
          <button
            value="á"
            className={spanCharacterButtonClass}
            onClick={onCharacterButtonClicked}
          >
            á
          </button>
          <button
            value="é"
            className={spanCharacterButtonClass}
            onClick={onCharacterButtonClicked}
          >
            é
          </button>
          <button
            value="í"
            className={spanCharacterButtonClass}
            onClick={onCharacterButtonClicked}
          >
            í
          </button>
          <button
            value="ó"
            className={spanCharacterButtonClass}
            onClick={onCharacterButtonClicked}
          >
            ó
          </button>
          <button
            value="ú"
            className={spanCharacterButtonClass}
            onClick={onCharacterButtonClicked}
          >
            ú
          </button>
        </div>
      </div>

      // <>
      //   <div>{infinitive}</div>
      //   <div>{definition}</div>
      //   <div>{tense}</div>
      //   <div>{pronoun}</div>
      //   <form onSubmit={answerSubmit}>
      //     <label></label>
      //     <input
      //       type="text"
      //       autoComplete="off"
      //       required
      //       value={answer}
      //       onChange={onAnswerChanged}
      //     />
      //     <button>Submit</button>
      //   </form>
      // </>
    );
  }
  return content;
};

export default Question;
