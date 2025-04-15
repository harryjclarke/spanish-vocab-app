import { useGetVerbsQuery } from "./verbsApiSlice";
import Verb from "./Verb";

const VerbsList = () => {
  const {
    data: verbs,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetVerbsQuery("verbsList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  }); //maybe need to put options here?

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
      <div className="bg-gray-900 h-[91.9vh] flex flex-col items-center pt-20">
        <h1 className="text-lg text-gray-200 lg:text-xl dark:text-gray-200">
          Find a list of the most common Spanish verbs with full conjugations.
        </h1>
        <div className="w-[30%] relative overflow-x-auto pt-10">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Verb
                </th>
                <th scope="col" className="px-6 py-3">
                  Definition
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>{tableContent}</tbody>
          </table>
        </div>
      </div>
    );
  }

  return content;
};
export default VerbsList;
