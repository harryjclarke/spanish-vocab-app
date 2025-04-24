import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import useTitle from "../hooks/useTitle";

const Layout = () => {
  useTitle("Verb Trainer");

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
