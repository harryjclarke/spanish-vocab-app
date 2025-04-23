import { Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllUserAnswers,
  clearUserAnswers,
} from "../features/play/playSlice";

const VerifyState = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const userAnswers = useSelector(selectAllUserAnswers);

  if (pathname !== "/play" && userAnswers) dispatch(clearUserAnswers());

  return <Outlet />;
};

export default VerifyState;
