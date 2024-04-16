import { Flowbite } from "flowbite-react";
import NavBar from "../components/navBar/NavBar";
import { Outlet } from "react-router-dom";

export default function BareLayout() {
  return (
    <>
      <Flowbite>
        <NavBar />
        <Outlet />
      </Flowbite>
    </>
  );
}
