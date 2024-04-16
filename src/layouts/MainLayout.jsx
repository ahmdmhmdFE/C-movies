import { Outlet } from "react-router-dom";
import SideBar from "./../components/sideBar/SideBar";
import "../../src/index.css";

export default function MainLayout() {
  return (
    <main>
      <SideBar />
      <section>
        <div className="flex content-center justify-center w-full overflow-y-visible h-svh">
          <Outlet />
        </div>
      </section>
    </main>
  );
}
