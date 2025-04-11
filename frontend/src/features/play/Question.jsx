import Results from "./Results.jsx";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectAllOptions } from "./playSlice";
import { selectAllInPlay } from "./playSlice";

const Question = () => {
  let content;
  const options = useSelector(selectAllOptions);
  const inPlayWords = useSelector(selectAllInPlay);
  const numQuestions = options.numQuestions;
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

  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [wordsIndex, setWordsIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const currentWord = inPlayWords[wordsIndex];
  if (currentWord) {
    var infinitive = currentWord.infinitive;
    var tense = currentWord.tense;
    var pronoun = currentWord.pronoun;
    var conjugation = currentWord.conjugation;
  }

  const onAnswerChanged = (e) => setAnswer(e.target.value);

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

    console.log(nextWordsIndex);
    console.log(numQuestions);
    if (nextWordsIndex === numQuestions) {
      setShowResults(true);
    } else {
      setWordsIndex(wordsIndex + 1);
    }
  };

  if (showResults) {
    content = <Results score={score} />;
  } else {
    content = (
      <>
        <div>{infinitive}</div>
        <div>{tense}</div>
        <div>{pronoun}</div>
        <form onSubmit={answerSubmit}>
          <label></label>
          <input
            type="text"
            autoComplete="off"
            required
            value={answer}
            onChange={onAnswerChanged}
          />
          <button>Submit</button>
        </form>
      </>
    );
  }
  return content;
};

export default Question;
