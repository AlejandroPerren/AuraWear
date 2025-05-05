import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TCategory } from "../../types";
import { getAllCategories, createCategory, deleteCategory } from "../../network/fetchApi/category";
import { useAppStore } from "../../store/useAppStore";

const ListOfCategories = () => {
  const [listOfCategories, setListOfCategories] = useState<TCategory[]>([]);
  const [isCreateCategory, setIsCreateCategory] = useState(false);

  const isAdmin = useAppStore((state) => state.isAdmin());

  const { register, handleSubmit, reset } = useForm<{ name: string }>();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      const categories = Array.isArray(response?.data?.data)
        ? response.data.data
        : [];
      setListOfCategories(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setListOfCategories([]);
    }
  };

  const onSubmit = async ({ name }: { name: string }) => {
    try {
      const response = await createCategory({ name });
      const newCategory = response?.data?.data?.[0]; 
      if (newCategory) {
        setListOfCategories((prev) => [...prev, newCategory]);
      }
      reset();
      setIsCreateCategory(false);
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const handleDeleteCategory = async (id?: number) => {
    if (!id) return;
    try {
      await deleteCategory(id);
      setListOfCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {listOfCategories.length > 0 ? (
        listOfCategories.map((category) => (
          <div
            key={category.id}
            className="flex items-center gap-2 bg-sky-300 rounded-full px-4 py-1 text-sm font-medium text-white shadow-md hover:bg-sky-400 transition-all duration-200"
            style={{ width: "fit-content" }}
          >
            {category.name}
            {isAdmin && category.id && (
              <button
                onClick={() => handleDeleteCategory(category.id)}
                className="text-white hover:text-red-500"
              >
                ✕
              </button>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center w-full">
          No hay categorías disponibles
        </p>
      )}

      {isAdmin && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex gap-2 items-center bg-sky-300 rounded-full px-4 py-1 text-sm font-medium text-white shadow-md hover:bg-sky-400 transition-all duration-200"
        >
          {!isCreateCategory ? (
            <button type="button" onClick={() => setIsCreateCategory(true)}>
              +
            </button>
          ) : (
            <>
              <input
                {...register("name", { required: true })}
                className="rounded-full px-2 py-1 text-black"
                placeholder="Nueva categoría"
              />
              <button type="submit">Crear</button>
              <button
                type="button"
                onClick={() => {
                  setIsCreateCategory(false);
                  reset();
                }}
              >
                Cancelar
              </button>
            </>
          )}
        </form>
      )}
    </div>
  );
};

export default ListOfCategories;
