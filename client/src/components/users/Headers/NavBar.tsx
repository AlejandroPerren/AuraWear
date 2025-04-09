import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import NavLinks from "./utils/NavLinks";
import SearchBar from "./utils/SearchBar";
import IconsMenu from "./utils/IconsMenu";

const navSections: string[] = ["Mujeres", "Hombres", "Deportivo"];

const NavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-black text-white">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        {/* Logo y enlaces */}
        <div className="flex items-center">
          <img src="/img/logo.avif" className="h-10 w-14" alt="Logo" />
          <NavLinks
            sections={navSections}
            className="hidden md:flex gap-6 ml-6"
          />
        </div>

        {/* Buscador */}
        <SearchBar className="" />

        {/* Íconos y menú */}
        <div className="flex items-center gap-4">
          <IconsMenu />
          <button className="md:hidden" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Menú responsive */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-black border-t-2 transition-all duration-300 py-4">
          <NavLinks
            sections={navSections}
            className="flex flex-col items-center"
          />
        </div>
      )}
    </nav>
  );
};

export default NavBar;
