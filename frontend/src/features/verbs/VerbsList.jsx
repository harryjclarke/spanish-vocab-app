import { useGetVerbsQuery } from "./verbsApiSlice";
import useTitle from "../../hooks/useTitle";
import Verb from "./Verb";

const VerbsList = () => {
  useTitle("Verb Trainer - Verbs");

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
  });

  let content;

  if (isLoading)
    content = (
      <div className="bg-gray-900 h-[91.9vh] flex flex-col items-center pt-20"></div>
    );

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
        <h1 className="text-lg text-gray-200 lg:text-xl ">
          Find a list of the most common Spanish verbs with full conjugations.
        </h1>
        <div className="w-[30%] relative overflow-x-auto pt-10">
          <table className="w-full text-sm text-left rtl:text-right  text-gray-400">
            <thead className="text-xs  uppercase  bg-gray-700 text-gray-400">
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
