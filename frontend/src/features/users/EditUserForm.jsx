import { Link } from "react-router-dom";
import { useDeleteUserMutation } from "./usersApiSlice";
import { useSendLogoutMutation } from "../auth/authApiSlice";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const EditUserForm = () => {
  const user = useAuth();

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteUserMutation();

  const [
    sendLogout,
    { isSuccess: isLogoutSuccess, isError: isLogoutError, error: logoutError },
  ] = useSendLogoutMutation();

  const navigate = useNavigate();

  const onDeleteUserClicked = async () => {
    try {
      await deleteUser({ id: user.id });
      await sendLogout({}).unwrap();
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

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
            <tr className="flex justify-center">
              <th scope="col" className="px-6 py-3">
                <button onClick={onDeleteUserClicked}>Delete Account</button>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default EditUserForm;
