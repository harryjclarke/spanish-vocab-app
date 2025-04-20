import { Link } from "react-router-dom";

const USER_REGEX = /^[A-z0-9]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const EditUserForm = () => {
  return (
    <div className="bg-gray-900 h-[91.9vh] flex flex-col items-center pt-20">
      <div className="w-[10%] relative overflow-x-auto pt-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="flex flex-col justify-center text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="flex justify-center">
              <th scope="col" className="px-6 py-3">
                <Link to="/settings/edit-profile/username">
                  Update Username
                </Link>
              </th>
            </tr>
            <tr className="flex justify-center">
              <th scope="col" className="px-6 py-3">
                <Link to="/settings/edit-profile/password">
                  Update Password
                </Link>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default EditUserForm;
