import { Outlet } from "react-router-dom";
import NavInfo from "../components/users/Headers/NavInfo";
import NavBar from "../components/users/Headers/NavBar";
import Footer from "../components/shared/Footer";

const UserLayout = () => {
  return (
    <div>
      <NavInfo />

      <NavBar />

      <main>
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default UserLayout;
