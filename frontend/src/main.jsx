import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login.jsx";
import VerbsList from "./features/verbs/VerbsList";
import NewUserForm from "./features/users/NewUserForm";
import Prefetch from "./features/auth/Prefetch";
import Play from "./features/play/Play";
import VerbDetailed from "./features/verbs/VerbDetailed";
import EditUserForm from "./features/users/EditUserForm";
import { store } from "./app/store";
import { Provider } from "react-redux";
import PersistLogin from "./features/auth/PersistLogin.jsx";
import VerifyState from "./components/VerifyState.jsx";
import UpdateUsernameForm from "./features/users/UpdateUsernameForm.jsx";
import UpdatePasswordForm from "./features/users/UpdatePasswordForm.jsx";
import ScoresList from "./features/score/ScoresList.jsx";
import ScoreDetailed from "./features/score/ScoreDetailed.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<PersistLogin />}>
      <Route element={<VerifyState />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<NewUserForm />} />

          <Route element={<Prefetch />}>
            <Route path="play">
              <Route index element={<Play />} />
            </Route>

            <Route path="verbs">
              <Route index element={<VerbsList />} />
              <Route path=":id" element={<VerbDetailed />} />
            </Route>

            <Route path="settings">
              <Route path="edit-profile" element={<EditUserForm />} />
              <Route
                path="edit-profile/username"
                element={<UpdateUsernameForm />}
              />
              <Route
                path="edit-profile/password"
                element={<UpdatePasswordForm />}
              />
            </Route>

            <Route path="scores">
              <Route index element={<ScoresList />} />
              <Route path=":id" element={<ScoreDetailed />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
