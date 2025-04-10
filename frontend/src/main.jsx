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
import UsersList from "./features/users/UsersList";
import NewUserForm from "./features/users/NewUserForm";
import Prefetch from "./features/auth/Prefetch";
import Play from "./features/play/Play";
import VerbDetailed from "./features/verbs/VerbDetailed";
import { store } from "./app/store";
import { Provider } from "react-redux";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Public />} />
      <Route path="login" element={<Login />} />

      <Route element={<Prefetch />}>
        <Route path="play">
          <Route index element={<Play />} />
        </Route>

        <Route path="verbs">
          <Route index element={<VerbsList />} />
          <Route path=":id" element={<VerbDetailed />} />
        </Route>

        <Route path="users">
          <Route index element={<UsersList />} />
          <Route path="register" element={<NewUserForm />} />
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
