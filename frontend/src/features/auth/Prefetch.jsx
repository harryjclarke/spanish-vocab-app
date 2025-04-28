import { store } from "../../app/store";
import { verbsApiSlice } from "../verbs/verbsApiSlice";
import { scoreApiSlice } from "../score/scoreApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      verbsApiSlice.util.prefetch("getVerbs", "verbsList", { force: true })
    );
    store.dispatch(
      scoreApiSlice.util.prefetch("getScores", "scoresList", { force: true })
    );
  }, []);

  return <Outlet />;
};
export default Prefetch;
