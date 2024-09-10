import { v4 as uuid } from "uuid";
import { useState, type ChangeEvent, type FormEvent } from "react";
import ProductCard from "./components/ProductCard";
import Button from "./components/ui/Button";
import Modal from "./components/ui/Modal";
import { colors, formInputList, ProductList } from "./data";
import MyInput from "./components/ui/Input";
import type { IProduct } from "./interfaces";
import Circle from "./components/Circle";
import { productValidation } from "./validation";
import MessageError from "./components/MessageError";

const App = () => {
  const defaultProduct = {
    id: uuid(),
    title: "",
    imageURL: "",
    description: "",
    colors: [""],
    price: "",
    category: {
      imageURL: "",
      name: "",
    },
  };

  // ----------------- States.🗽 ----------------- //
  const [isBuildOpen, setIsBuildOpen] = useState<boolean>(false);
  const [msgError, setMsgError] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [product, setProduct] = useState<IProduct>(defaultProduct);
  const [productList, setProductList] = useState<IProduct[]>(ProductList);

  // ----------------- Handlers.🔧 ------------------//

  const toggleBuildModal = () => {
    setIsBuildOpen(!isBuildOpen);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    setMsgError({ ...msgError, [name]: "" });
  };

  const onCancel = () => {
    // Toggle the modal
    toggleBuildModal();
    // Reset the product to initial value
    setProduct(defaultProduct);
    setMsgError({ title: "", description: "", imageURL: "", price: "" });
  };

  const formSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorObj = productValidation(product);
    setMsgError(errorObj);
    const notHasErrorMessage = Object.values(errorObj).every((ele) => ele == "");
    if (notHasErrorMessage) {
      // Add The new product
      setProductList([product, ...productList]);
      // Reset the product to initial value
      setProduct(defaultProduct);
      // Close the modal
      toggleBuildModal();
    }
  };

  // ---------------- Renders..!🔃----------------//
  const productListRender = productList.map((product) => (
    <ProductCard product={product} key={product.id} />
  ));

  const formInputsRender = formInputList.map((input) => {
    return (
      <div key={input.id}>
        <label htmlFor={input.id} className="text-sm/6 font-medium text-gray-500">
          {input.label}
        </label>
        <MyInput
          input={input}
          value={product[input.name]}
          onChange={(e) => {
            onChangeHandler(e);
          }}
        />
        <MessageError msg={msgError[input.name]} />
      </div>
    );
  });

  const renderCircle = colors.map((el) => <Circle color={el} key={el} />);

  return (
    <div className="container mx-auto my-7">
      {/* Heading...😁 */}
      <div className="flex items-center justify-between py-5 flex-wrap">
        <h1 className="font-bold text-sm sm:text-xl md:text-3xl lg:text-4xl  ">
          Build A New <span className="text-blue-600">Product</span>
        </h1>
        <Button
          onClick={toggleBuildModal}
          className="bg-blue-600 hover:bg-blue-700"
          width={"w-fit"}>
          Build Now
        </Button>
      </div>

      {/* Add new Product Modal..🆕 */}

      <Modal isOpen={isBuildOpen} setOpenAndClose={toggleBuildModal} title="Add A New Product">
        <form onSubmit={formSubmit}>
          {/* Render inputs..👋 */}
          <div className="space-y-3">{formInputsRender}</div>
          <div className="my-3 flex space-x-1">{renderCircle}</div>
          {/* button of modal..👋 */}
          <div className="flex gap-3 mt-3 items-center justify-between">
            <Button
              type="submit"
              className="rounded-md bg-blue-600 hover:bg-blue-700  font-semibold ">
              Submit
            </Button>
            <Button
              type="button"
              onClick={onCancel}
              className="rounded-md bg-slate-500 hover:bg-slate-600  font-semibold ">
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Render all Products...🫠 */}
      <div className="grid gap-2 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {productListRender}
      </div>
    </div>
  );
};

export default App;
