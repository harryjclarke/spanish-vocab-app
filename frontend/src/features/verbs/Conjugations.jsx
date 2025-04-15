const Conjugations = (props) => {
  return (
    <>
      <td className="px-6 py-4">{props.tense}</td>
      <td className="px-6 py-4">{props.obj[props.tense][0]}</td>
      <td className="px-6 py-4">{props.obj[props.tense][1]}</td>
      <td className="px-6 py-4">{props.obj[props.tense][2]}</td>
      <td className="px-6 py-4">{props.obj[props.tense][3]}</td>
      <td className="px-6 py-4">{props.obj[props.tense][4]}</td>
    </>
  );
};

export default Conjugations;
