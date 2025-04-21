import { store } from "../../app/store";
import { verbsApiSlice } from "../verbs/verbsApiSlice";
import { usersApiSlice } from "../users/usersApiSlice";
import { scoreApiSlice } from "../score/scoreApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    console.log("subscribing");
    const verbs = store.dispatch(verbsApiSlice.endpoints.getVerbs.initiate());
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
    const scores = store.dispatch(scoreApiSlice.endpoints.getScores.initiate());

    return () => {
      console.log("unsubscribing");
      verbs.unsubscribe();
      users.unsubscribe();
      scores.unsubscribe();
    };
  }, []);

  return <Outlet />;
};
export default Prefetch;
