import { useEffect, useState } from "react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
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
      {isVisible || isLogin ? (
        <div
          className="object-top relative w-full h-screen flex items-center justify-center bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: "url(/img/womanAuth.jpg)" }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
      ) : null}

      {isVisible || !isLogin ? (
        <div
          className="object-top relative w-full h-screen flex items-center justify-center bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: "url(/img/manAuth.jpg)" }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
      ) : null}
    </div>
  );
};

export default AuthPage;
