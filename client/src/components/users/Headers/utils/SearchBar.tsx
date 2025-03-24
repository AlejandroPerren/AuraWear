import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
    className?: string;
  }
  
  const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
    return (
      <div className={`relative items-center ${className}`}>
        <input
          type="text"
          placeholder="Buscar..."
          className="p-1 pl-8 text-black rounded-md mx-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FaSearch 
          className="w-4 h-4 absolute left-4 top-2 text-gray-500"
          />
      </div>
    );
  };
  
  export default SearchBar;
  