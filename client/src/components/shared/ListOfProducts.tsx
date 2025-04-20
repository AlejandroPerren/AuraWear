import { useEffect } from "react";
import { getAllProducts } from "../../network/fetchApi/products";

const ListOfProducts = () => {
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        console.log(data)
      } catch (error) {
        console.log("Error Fetching Account Data:", error);
      }
    };
    fetchProducts();
  }, []);
  return <div>ListOfProducts</div>;
};

export default ListOfProducts;
