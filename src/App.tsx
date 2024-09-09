import ProductCard from "./components/ProductCard";
import Button from "./components/ui/Button";
import { ProductList } from "./data";

const App = () => {
  //* ---------------- Renders..!🔃----------------
  const productListRender = ProductList.map((product) => (
    <ProductCard product={product} key={product.id} />
  ));
  return (
    <main className="container mx-auto my-7">
      <div className="flex items-center justify-between py-5 flex-wrap">
        <h1 className="font-bold text-lg text-blue-800">Build A New Product</h1>
        <Button className="bg-blue-600 hover:bg-blue-700" width={"w-fit"}>
          Build Now
        </Button>
      </div>
      <div className="grid gap-2 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {productListRender}
      </div>
    </main>
  );
};

export default App;
