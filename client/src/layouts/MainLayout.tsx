
import { Outlet } from "react-router-dom";
import NavInfo from "../components/users/NavInfo";

const MainLayout = () => {
  return (
    <div>
        <NavInfo/>


      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
