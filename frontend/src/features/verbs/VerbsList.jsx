import { useGetVerbsQuery } from "./verbsApiSlice";
import Verb from "./Verb";

const VerbsList = () => {
  const {
    data: verbs,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetVerbsQuery();

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = verbs;

    const tableContent = ids?.length
      ? ids.map((verbId) => <Verb key={verbId} verbId={verbId} />)
      : null;

    content = (
      <table className="table table--verbs">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th verb__status">
              Username
            </th>
            <th scope="col" className="table__th verb__created">
              Created
            </th>
            <th scope="col" className="table__th verb__updated">
              Updated
            </th>
            <th scope="col" className="table__th verb__title">
              Title
            </th>
            <th scope="col" className="table__th verb__username">
              Owner
            </th>
            <th scope="col" className="table__th verb__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};
export default VerbsList;
