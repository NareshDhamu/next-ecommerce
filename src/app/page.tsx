import CategroryList from "@/components/CategroryList";
import ProductList from "@/components/ProductList";
import Slider from "@/components/Slider";

const HomePage = () => {
  return (
    <div className="">
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-16 2xl:px-64 xl:px-32">
        <h1 className="text-2xl">Featured Products</h1>
        <ProductList />
      </div>
      <div className="mt-24">
        <h1 className="text-2xl px-4 md:px-8 lg:px-16 2xl:px-64 xl:px-32 mb-12">Categories</h1>
        <CategroryList />
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 2xl:px-64 xl:px-32">
        <h1 className="text-2xl">New Products</h1>
        <ProductList />
      </div>
    </div>
  );
};

export default HomePage;
