import { useEffect, useState } from "react";
import Login from "../components/auth/Login";
import SignUp from "../components/auth/SignUp";
import { useAppStore } from "../store/useAppStore";

const AuthPage = () => {
  const {isLogin} = useAppStore();
  const [isVisible, setIsVisible] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="grid lg:grid-cols-2 min-h-screen">

      {(isVisible || !isLogin) && (
        <div
          className="relative w-full h-screen flex items-center justify-center bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: "url(/img/womanAuth.jpg)" }}
        >

          <div className={`${!isLogin && "bg-black opacity-50"} absolute inset-0`}></div>
          <div className={`${isLogin && "hidden"} absolute `}>
          <SignUp />
          </div>
        </div>
      )}

      {(isVisible || isLogin) && (
        <div
          className="relative w-full h-screen flex items-center justify-center bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: "url(/img/manAuth.jpg)" }}
        >
          <div className={`${isLogin && "bg-black opacity-50"} absolute inset-0`}></div>
          <div className={`${!isLogin && "hidden"} absolute `}>
          <Login />
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
