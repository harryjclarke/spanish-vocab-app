import { selectAllOptions } from "./playSlice";
import { selectAllVerbs } from "../verbs/verbsApiSlice";
import { useSelector } from "react-redux";

// const inPlayWords = () => {
//   const options = useSelector(selectAllOptions);
//   const verbs = useSelector(selectAllVerbs);
//   const numQuestions = options.numQuestions;
//   const inPlayWords = "blablbla";

//   if (options && verbs) {
//     let shuffled = verbs.sort(() => 0.5 - Math.random());
//     let selected = shuffled.slice(0, numQuestions);
//   }
//   return { numQuestions, inPlayWords };
// };

// export default inPlayWords;

// const gameDetails = () => {
//   const options = useSelector(selectAllOptions);
//   const verbs = useSelector(selectAllVerbs);
//   const numberOfQuestions = options.numQuestions;
//   console.log(numberOfQuestions);
//   const questions = [
//     {
//       infinitive: "hablar",
//       tense: "present",
//       pronoun: "yo",
//       conjugation: "hablo",
//     },
//     {
//       infinitive: "comer",
//       tense: "present",
//       pronoun: "yo",
//       conjugation: "como",
//     },
//   ];

//   if (options && verbs) {
//     let shuffled = verbs.sort(() => 0.5 - Math.random());
//     let selected = shuffled.slice(0, numQuestions);
//   }

//   return { questions, numberOfQuestions };
// };

// export default gameDetails;
