import { useEffect, useState } from "react";
import { getAllProducts } from "../../../network/fetchApi/products";
import { TProduct } from "../../../types";
import CardProduct from "./CardProduct";

const ListOfProducts = () => {
  const [listProducts, setListProducts] = useState<TProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        if (!response.success || !response.data?.data) {
          setListProducts([]);
          return;
        }

        const products = Array.isArray(response.data.data)
          ? response.data.data
          : [response.data.data];

        setListProducts(products);
        console.log(products);
      } catch (error) {
        console.log("Error Fetching Product Data:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {listProducts.length > 0 ? (
        listProducts.map((product) => {
          const { id, name, price, images } = product;

          return (
            <CardProduct key={id} title={name} price={price} images={images} />
          );
        })
      ) : (
        <p>No hay productos disponibles</p>
      )}
    </div>
  );
};

export default ListOfProducts;
