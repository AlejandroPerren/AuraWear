import { useEffect, useState } from "react";
import { TCategory } from "../../types";
import { getAllCategories } from "../../network/fetchApi/category";

const ListOfCategories = () => {
  const [ListOfCategories, setListOfCategories] = useState<TCategory[]>([]);

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
    </div>
  );
};

export default ListOfCategories;
