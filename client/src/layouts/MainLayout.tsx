import { Outlet } from "react-router-dom";
import NavInfo from "../components/users/Headers/NavInfo";
import NavBar from "../components/users/Headers/NavBar";
import ListOfProducts from "../components/shared/ListOfProducts";


const MainLayout = () => {
  return (
    <div>
      <NavInfo />

      <NavBar />

      <div className="flex justify-center items-center md:m-8 2xl:m-10 lg:mx-4">
        <img
          src="/img/bg.jpg"
          className="w-full h-full lg:max-w-[1600px] lg:h-[70vh] object-cover object-top lg:rounded-lg"
        />
      </div>

      <main>
        <Outlet />
      </main>
      <ListOfProducts/>
    </div>
  );
};

export default MainLayout;
