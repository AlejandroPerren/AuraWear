import { FaCartShopping, FaHeart, FaUser } from "react-icons/fa6";

const IconsMenu: React.FC = () => {
  return (
    <div className="flex gap-4 items-center">
      <FaCartShopping className="cursor-pointer" />
      <FaHeart className="cursor-pointer" />
      <FaUser className="cursor-pointer" />
    </div>
  );
};

export default IconsMenu;
