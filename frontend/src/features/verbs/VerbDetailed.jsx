import React from "react";
import { useParams } from "react-router-dom";
import { useGetVerbsQuery } from "./verbsApiSlice";
import useTitle from "../../hooks/useTitle";
import Conjugations from "./Conjugations";

const VerbDetailed = () => {
  const { id } = useParams();
  const { verb } = useGetVerbsQuery("verbsList", {
    selectFromResult: ({ data }) => ({
      verb: data?.entities[id],
    }),
  });

  const rowClass = "border-b bg-gray-800 border-gray-700";

  useTitle(`Verb Trainer - ${verb.infinitive}`);

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
      <h1 className="text-lg text-gray-200 lg:text-xl">
        {verb.infinitive} - {verb.definition}
      </h1>
      <div className="w-[70%] relative overflow-x-auto pt-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-400">
          <thead className="text-xs  uppercase bg-gray-700 text-gray-400">
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
            <tr className={rowClass}>
              <Conjugations pronoun="yo" obj={obj} />
            </tr>
            <tr className={rowClass}>
              <Conjugations pronoun="tu" obj={obj} />
            </tr>
            <tr className={rowClass}>
              <Conjugations pronoun="el/ella/usted" obj={obj} />
            </tr>
            <tr className={rowClass}>
              <Conjugations pronoun="nosotros" obj={obj} />
            </tr>
            <tr className={rowClass}>
              <Conjugations pronoun="vosotros" obj={obj} />
            </tr>
            <tr className={rowClass}>
              <Conjugations pronoun="ellos/ellas/ustedes" obj={obj} />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerbDetailed;
