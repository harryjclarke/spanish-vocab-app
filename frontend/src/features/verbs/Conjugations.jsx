const Conjugations = (props) => {
  return (
    <>
      <td>{props.tense}</td>
      <td>{props.obj[props.tense][0]}</td>
      <td>{props.obj[props.tense][1]}</td>
      <td>{props.obj[props.tense][2]}</td>
      <td>{props.obj[props.tense][3]}</td>
      <td>{props.obj[props.tense][4]}</td>
    </>
  );
};

export default Conjugations;
