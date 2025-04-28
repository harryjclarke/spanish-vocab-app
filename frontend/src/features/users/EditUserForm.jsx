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
      // console.log(e);
    }
  };

  return (
    <div className="bg-gray-900 h-[91.9vh] flex flex-col items-center pt-20">
      <div className="w-[15%] relative overflow-x-auto pt-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-400">
          <tbody className="flex flex-col justify-center text-xs uppercase bg-gray-700 text-gray-400">
            <tr className="py-1 flex justify-center border-b bg-gray-800 border-gray-700">
              <td
                scope="col"
                className="px-6 py-3 normal-case text-base text-white"
              >
                <Link to="/settings/edit-profile/username">
                  Update Username
                </Link>
              </td>
            </tr>
            <tr className="py-1 flex justify-center border-b bg-gray-800 border-gray-700">
              <td
                scope="col"
                className="px-6 py-3 normal-case text-base text-white"
              >
                <Link to="/settings/edit-profile/password">
                  Update Password
                </Link>
              </td>
            </tr>
            <td className="py-1 flex justify-center border-b bg-gray-800 border-gray-700">
              <td
                scope="col"
                className="px-6 py-3 normal-case text-base text-white"
              >
                <button className="font-normal" onClick={onDeleteUserClicked}>
                  Delete Account
                </button>
              </td>
            </td>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditUserForm;
