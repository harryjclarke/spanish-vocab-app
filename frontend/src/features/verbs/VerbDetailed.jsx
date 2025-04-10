import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectVerbById } from "./verbsApiSlice";
import Conjugations from "./Conjugations";

const VerbDetailed = () => {
  const { id } = useParams();
  const verb = useSelector((state) => selectVerbById(state, id));

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
    <table className="table table--verbs">
      <thead className="table__thead">
        <tr>
          <th scope="col" className="table__th verb__status"></th>
          <th scope="col" className="table__th verb__created">
            Present
          </th>
          <th scope="col" className="table__th verb__updated">
            Preterite
          </th>
          <th scope="col" className="table__th verb__created">
            Imperfect
          </th>
          <th scope="col" className="table__th verb__updated">
            Future
          </th>
          <th scope="col" className="table__th verb__updated">
            Conditional
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="table__row">
          <Conjugations tense="yo" obj={obj} />
        </tr>
        <tr className="table__row">
          <Conjugations tense="tu" obj={obj} />
        </tr>
        <tr className="table__row">
          <Conjugations tense="el/ella/usted" obj={obj} />
        </tr>
        <tr className="table__row">
          <Conjugations tense="nosotros" obj={obj} />
        </tr>
        <tr className="table__row">
          <Conjugations tense="vosotros" obj={obj} />
        </tr>
        <tr className="table__row">
          <Conjugations tense="ellos/ellas/ustedes" obj={obj} />
        </tr>
      </tbody>
    </table>
  );
};

export default VerbDetailed;
