import { useEffect, useState } from "react";
import { TCategory } from "../../types";
import { getAllCategories } from "../../network/fetchApi/category";
import { useAppStore } from "../../store/useAppStore";

const ListOfCategories = () => {
  const [ListOfCategories, setListOfCategories] = useState<TCategory[]>([]);
  const [isCreateCategory, setIsCreateCategory] = useState<boolean>(false)
  const { isAdmin } = useAppStore();

  //Handles Delete y mas opciones


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllCategories();
        if (!response.success || !response.data?.data) {
          setListOfCategories([]);
          return;
        }

        const categories = Array.isArray(response.data.data)
          ? response.data.data
          : [response.data.data];

        setListOfCategories(categories);
      } catch (error) {
        console.log("Error Fetching Product Data:", error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {ListOfCategories.length > 0 ? (
        ListOfCategories.map((category) => {
          const { id, name } = category;
          return (
            <div
              key={id}
              className="bg-sky-300 rounded-full px-4 py-1 text-sm font-medium text-white shadow-md hover:bg-sky-400 transition-all duration-200"
              style={{ width: "fit-content" }}
            >
              {name}
            </div>
          );
        })
      ) : (
        <p className="text-gray-500 text-center w-full">
          No hay productos disponibles
        </p>
      )}
      {isAdmin && (
        <form className="bg-sky-300 rounded-full px-4 py-1 text-sm font-medium text-white shadow-md hover:bg-sky-400 transition-all duration-200">
          <button className="" onClick={()=> setIsCreateCategory(true)}>+</button>
          <input className={`${!isCreateCategory && ('hidden')} `}/>
          {/* Hacer un On Change */}
        </form>
      )}
    </div>
  );
};

export default ListOfCategories;
