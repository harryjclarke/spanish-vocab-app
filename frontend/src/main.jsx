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
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome.jsx";
import VerbsList from "./features/verbs/VerbsList";
import UsersList from "./features/users/UsersList";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Public />} />
      <Route path="login" element={<Login />} />

      <Route path="verbs">
        <Route index element={<VerbsList />} />
      </Route>

      <Route path="users">
        <Route index element={<UsersList />} />
      </Route>

      <Route path="dash" element={<DashLayout />}>
        <Route index element={<Welcome />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
