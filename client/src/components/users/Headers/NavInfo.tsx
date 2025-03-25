import { FaTruckFast } from "react-icons/fa6";
import { IoStorefrontSharp } from "react-icons/io5";
import { FaPhoneVolume } from "react-icons/fa";
import { useEffect, useState } from "react";

const NavInfo = () => {
  const [isVisible, setIsVisible] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col items-center text-center lg:flex-row lg:justify-between p-2 mx-5">
      <div className="flex flex-col items-center text-center lg:flex-row lg:gap-4">
        <h3>Envios Gratis a partir de $300.000</h3>
        {isVisible && <span>|</span>}
        <h3>3, 6 y 9 Cuotas Sin Interes</h3>
      </div>

      {isVisible && (
        <div className="flex gap-4 mt-2 lg:mt-0">
          <div className="flex items-center gap-2">
            <FaTruckFast />
            <h4>SEGUÍ TU ENVÍO</h4>
            <span>|</span>
          </div>

          <div className="flex items-center gap-2">
            <IoStorefrontSharp />
            <h4>INFORMACIÓN DE VENTAS</h4>
            <span>|</span>
          </div>

          <div className="flex items-center gap-2">
            <FaPhoneVolume />
            <h4>CONTACTO</h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavInfo;
