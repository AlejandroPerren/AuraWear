import { Outlet } from "react-router-dom";
import NavInfo from "../components/users/Headers/NavInfo";
import NavBar from "../components/users/Headers/NavBar";



const MainLayout = () => {
  return (
    <div className="overflow-hidden ">
      <NavInfo />

      <NavBar />

      <div className="flex justify-center items-center md:m-8 2xl:m-10 lg:mx-4">
        <img
          src="/img/bg.jpg"
          className="w-full h-full lg:max-w-[1600px] lg:h-[70vh] mb-4 object-cover object-top lg:rounded-lg"
        />
      </div>

      <main className="w-[90%] mx-auto">
        <Outlet />
      </main>
      
    </div>
  );
};

export default MainLayout;
