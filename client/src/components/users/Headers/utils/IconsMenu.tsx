import { useState } from "react";
import { FaCartShopping, FaHeart, FaUser } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { useAppStore } from "../../../../store/useAppStore";
const IconsMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { Logout } = useAppStore();

  return (
    <div className="relative flex gap-4 items-center">
      <FaCartShopping className="text-white cursor-pointer hover:text-xl transition-all duration-300" />
      <FaHeart className="text-white cursor-pointer hover:text-xl transition-all duration-300" />
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white cursor-pointer hover:text-xl transition-all duration-300"
        >
          <FaUser />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-2xl w-44 dark:bg-gray-800 border-1 ">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Usuario
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Configuracion
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Puntos
                </a>
              </li>
              <li>
                <button
                  onClick={Logout}
                  className="w-full cursor-pointer text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <FaSignOutAlt />
                  Cerrar Sesión
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default IconsMenu;
