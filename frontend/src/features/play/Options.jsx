import { useState } from "react";
import { setInPlayVerbs } from "./playSlice";
import { useDispatch } from "react-redux";
import { selectAllOptions } from "./playSlice";
import { selectAllVerbs } from "../verbs/verbsApiSlice";
import { useSelector } from "react-redux";

const Options = ({ onClick }) => {
  const [numQuestions, setNumQuestions] = useState(0);
  const [presentChecked, setPresentChecked] = useState(true);
  const [preteriteChecked, setPreteriteChecked] = useState(true);
  const [imperfectChecked, setImperfectChecked] = useState(true);
  const [futureChecked, setFutureChecked] = useState(true);
  const [conditionalChecked, setConditionalChecked] = useState(true);
  const [irregularChecked, setIrregularChecked] = useState(true);

  const dispatch = useDispatch();

  const onSubmitForm = (e) => {
    e.preventDefault();
    dispatch(
      setInPlayVerbs({
        options: {
          numQuestions,
          presentChecked,
          preteriteChecked,
          imperfectChecked,
          futureChecked,
          conditionalChecked,
          irregularChecked,
        },
      })
    );

    onClick();
  };

  return (
    <form onSubmit={onSubmitForm}>
      <button type="submit">Start Game</button>
      <label htmlFor="numQuestions">Num Questions</label>
      <input
        type="number"
        value={numQuestions}
        id="numQuestions"
        name="numQuestions"
        required
        onChange={(e) => setNumQuestions(e.target.value)}
      />
      <label htmlFor="present">Present</label>
      <input
        type="checkbox"
        id="present"
        name="present"
        checked={presentChecked}
        onChange={() => setPresentChecked(!presentChecked)}
      />

      <label htmlFor="preterite">Preterite</label>
      <input
        type="checkbox"
        id="preterite"
        name="preterite"
        checked={preteriteChecked}
        onChange={() => setPreteriteChecked(!preteriteChecked)}
      />

      <label htmlFor="imperfect">Imperfect</label>
      <input
        type="checkbox"
        id="imperfect"
        name="imperfect"
        checked={imperfectChecked}
        onChange={() => setImperfectChecked(!imperfectChecked)}
      />

      <label htmlFor="future">Future</label>
      <input
        type="checkbox"
        id="future"
        name="future"
        checked={futureChecked}
        onChange={() => setFutureChecked(!futureChecked)}
      />

      <label htmlFor="conditional">Conditional</label>
      <input
        type="checkbox"
        id="conditional"
        name="conditional"
        checked={conditionalChecked}
        onChange={() => setConditionalChecked(!conditionalChecked)}
      />

      <label htmlFor="irregular">Irregular</label>
      <input
        type="checkbox"
        id="irregular"
        name="irregular"
        checked={irregularChecked}
        onChange={() => setIrregularChecked(!irregularChecked)}
      />
    </form>
  );
};

export default Options;
