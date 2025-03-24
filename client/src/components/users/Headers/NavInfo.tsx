import { FaTruckFast } from "react-icons/fa6";
import { IoStorefrontSharp } from "react-icons/io5";
import { FaPhoneVolume } from "react-icons/fa";

const navItems = [
  { icon: <FaTruckFast />, text: "SEGUÍ TU ENVÍO" },
  { icon: <IoStorefrontSharp />, text: "INFORMACIÓN DE VENTAS" },
  { icon: <FaPhoneVolume />, text: "CONTACTO" },
];

const NavInfo = () => {
  return (
    <div className="flex justify-between items-center p-2 mx-5">
      <div className="flex gap-6">
        <h3>Envios Gratis a partir de $300.000</h3>
        <h3>3, 6 y 9 Cuotas Sin Interes</h3>
      </div>

      <div className="flex gap-6">
        {navItems.map(({ icon, text }, index) => (
          <div key={index} className="flex items-center gap-2">
            {icon}
            <h4>{text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavInfo;
