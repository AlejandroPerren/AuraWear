import ListOfCategories from "../../components/categories/ListOfCategories";
import Footer from "../../components/shared/Footer";
import ListOfProducts from "../../components/shared/products/ListOfProducts";

const HomePage = () => {
  return (
    <div >
      <ListOfCategories/>
      <ListOfProducts />
      <Footer />
    </div>
  );
};

export default HomePage;
