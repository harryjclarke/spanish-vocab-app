const Conjugations = (props) => {
  return (
    <>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {props.pronoun}
      </td>
      <td className="px-6 py-4">{props.obj[props.pronoun][0]}</td>
      <td className="px-6 py-4">{props.obj[props.pronoun][1]}</td>
      <td className="px-6 py-4">{props.obj[props.pronoun][2]}</td>
      <td className="px-6 py-4">{props.obj[props.pronoun][3]}</td>
      <td className="px-6 py-4">{props.obj[props.pronoun][4]}</td>
    </>
  );
};

export default Conjugations;
