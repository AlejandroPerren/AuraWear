import React from "react";
import ListOfProducts from "../../components/shared/products/ListOfProducts";
import ListOfCategories from "../../components/categories/ListOfCategories";

const AdminMainPage = () => {
  return (
    <>
      <div>
        {/* TODO: crear titulos personalizados y reutilizables */}
        <h1 className="text-2xl font-extrabold text-black">Categorias</h1>

        <ListOfCategories />
      </div>
      <div>
        <h1 className="text-2xl font-extrabold text-black">Productos</h1>
        <ListOfProducts />
      </div>
    </>
  );
};

export default AdminMainPage;
