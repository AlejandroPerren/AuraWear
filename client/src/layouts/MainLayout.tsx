
import { Outlet } from "react-router-dom";
import NavInfo from "../components/users/NavInfo";
import NavBar from "../components/users/NavBar";

const MainLayout = () => {
  return (
    <div>
        <NavInfo/>
        <NavBar/>

        <img src="/img/promo.jpeg" className="w-full h-full"></img>

       
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
