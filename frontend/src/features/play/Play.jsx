import { useState } from "react";
import Question from "./Question";
import Options from "./Options";
import { selectAllOptions } from "./playSlice";
import { selectAllVerbs } from "../verbs/verbsApiSlice";
import { useSelector } from "react-redux";
import { setInPlayVerbs } from "./playSlice";
import { useDispatch } from "react-redux";

const Play = () => {
  const [gameStart, setGameStart] = useState(false);

  const options = useSelector(selectAllOptions);
  const verbs = useSelector(selectAllVerbs);
  const dispatch = useDispatch();

  if (options && verbs) {
    const numQuestions = options.numQuestions;
    let inPlayWords = [];
    let inPlayTenses = [];
    let verbsFiltered;
    if (options.presentChecked) inPlayTenses.push("present");
    if (options.preteriteChecked) inPlayTenses.push("preterite");
    if (options.imperfectChecked) inPlayTenses.push("imperfect");
    if (options.futureChecked) inPlayTenses.push("future");
    if (options.conditionalChecked) inPlayTenses.push("conditional");

    if (!options.irregularChecked) {
      verbsFiltered = verbs.filter((v) => v.irregular === false);
    } else {
      verbsFiltered = verbs;
    }

    let shuffled = verbsFiltered.sort(() => 0.5 - Math.random());
    let selected = shuffled.slice(0, numQuestions);

    console.log(selected);
    console.log(inPlayTenses);

    selected.forEach((ele) => {
      let arrayIndex = Math.floor(Math.random() * inPlayTenses.length);
      let tense = inPlayTenses[arrayIndex];
      let selectedWord = ele[tense];

      let selectedWordArrayIndex = Math.floor(
        Math.random() * selectedWord.length
      );
      inPlayWords.push({
        infinitive: ele.infinitive,
        definition: ele.definition,
        tense: tense,
        conjugation: selectedWord[selectedWordArrayIndex].conjugation,
        pronoun: selectedWord[selectedWordArrayIndex].pronoun,
      });
    });

    dispatch(
      setInPlayVerbs({
        inPlay: inPlayWords,
      })
    );
  }

  const handleClick = () => {
    // console.log(numQuestions);
    setGameStart(true);
  };

  return (
    <>
      {gameStart ? (
        <Question setGameStart={setGameStart} />
      ) : (
        <Options onClick={handleClick} />
      )}
    </>
  );
};

export default Play;
