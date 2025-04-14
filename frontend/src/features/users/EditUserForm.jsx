import { useState, useEffect } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const USER_REGEX = /^[A-z0-9]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const EditUserForm = () => {
  const user = useAuth();

  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    console.log(isSuccess);
    if (isSuccess || isDelSuccess) {
      setUsername("");
      setPassword("");
      navigate("/settings");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onSaveUserClicked = async (e) => {
    if (password) {
      await updateUser({ id: user.id, username, password });
    } else {
      await updateUser({ id: user.id, username });
    }
  };

  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id });
  };

  let canSave;
  if (password) {
    canSave = [validUsername, validPassword].every(Boolean) && !isLoading;
  } else {
    canSave = [validUsername].every(Boolean) && !isLoading;
  }

  return (
    <form className="form" onSubmit={(e) => e.preventDefault()}>
      <div className="form__title-row">
        <h2>Edit User</h2>
        <div className="form__action-buttons">
          <button
            className="icon-button"
            title="Save"
            onClick={onSaveUserClicked}
            disabled={!canSave}
          >
            save
          </button>
          <button
            className="icon-button"
            title="Delete"
            onClick={onDeleteUserClicked}
          >
            delete
          </button>
        </div>
      </div>
      <label className="form__label" htmlFor="username">
        Username: <span className="nowrap">[3-20 letters]</span>
      </label>
      <input
        id="username"
        name="username"
        type="text"
        autoComplete="off"
        value={username}
        onChange={onUsernameChanged}
      />

      <label className="form__label" htmlFor="password">
        Password: <span className="nowrap">[empty = no change]</span>{" "}
        <span className="nowrap">[4-12 chars incl. !@#$%]</span>
      </label>
      <input
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={onPasswordChanged}
      />
    </form>
  );
};

export default EditUserForm;
