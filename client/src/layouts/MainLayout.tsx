
import { Outlet } from "react-router-dom";
import NavInfo from "../components/users/NavInfo";
import NavBar from "../components/users/NavBar";

const MainLayout = () => {
  return (
    <div>
        <NavInfo/>

        <NavBar />
        <div className="bg-[url('/bg.jpg')] bg-cover bg-center min- w-full flex flex-col items-center justify-center">
       
           <h1 className="text-white text-6xl font-extrabold text-center mt-4">
                Aura Wear
          </h1>
</div>


       
       
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
