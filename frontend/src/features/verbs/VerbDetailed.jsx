import React from "react";
import { useParams } from "react-router-dom";
import { useGetVerbsQuery } from "./verbsApiSlice";
import Conjugations from "./Conjugations";

const VerbDetailed = () => {
  const { id } = useParams();
  const { verb } = useGetVerbsQuery("verbsList", {
    selectFromResult: ({ data }) => ({
      verb: data?.entities[id],
    }),
  });

  let obj = {
    yo: [],
    tu: [],
    "el/ella/usted": [],
    nosotros: [],
    vosotros: [],
    "ellos/ellas/ustedes": [],
  };

  const filler = (tense) => {
    tense.forEach((ele) => {
      if (Object.keys(obj).indexOf(ele.pronoun) > -1)
        obj[ele.pronoun].push(ele.conjugation);
    });
  };

  filler(verb.present);
  filler(verb.preterite);
  filler(verb.imperfect);
  filler(verb.future);
  filler(verb.conditional);

  return (
    <div className="bg-gray-900 h-[91.9vh] flex flex-col items-center pt-20">
      <h1 className="text-lg text-gray-200 lg:text-xl dark:text-gray-200">
        {verb.infinitive} - {verb.definition}
      </h1>
      <div className="w-[70%] relative overflow-x-auto pt-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Subject
              </th>
              <th scope="col" className="px-6 py-3">
                Present
              </th>
              <th scope="col" className="px-6 py-3">
                Preterite
              </th>
              <th scope="col" className="px-6 py-3">
                Imperfect
              </th>
              <th scope="col" className="px-6 py-3">
                Future
              </th>
              <th scope="col" className="px-6 py-3">
                Conditional
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <Conjugations pronoun="yo" obj={obj} />
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <Conjugations pronoun="tu" obj={obj} />
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <Conjugations pronoun="el/ella/usted" obj={obj} />
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <Conjugations pronoun="nosotros" obj={obj} />
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <Conjugations pronoun="vosotros" obj={obj} />
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <Conjugations pronoun="ellos/ellas/ustedes" obj={obj} />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerbDetailed;
