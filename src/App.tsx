import { v4 as uuid } from "uuid";
import { useState, type ChangeEvent, type FormEvent } from "react";
import ProductCard from "./components/ProductCard";
import Button from "./components/ui/Button";
import Modal from "./components/ui/Modal";
import { categoryList, colors, formInputList, ProductList } from "./data";
import MyInput from "./components/ui/Input";
import type { ICategory, IProduct } from "./interfaces";
import Circle from "./components/Circle";
import { productValidation } from "./validation";
import MessageError from "./components/MessageError";
import Select from "./components/ui/Select";
import type { TFormInputs } from "./types";

const App = () => {
  const defaultProduct = {
    id: "",
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

  const [product, setProduct] = useState<IProduct>(defaultProduct);
  const [productList, setProductList] = useState<IProduct[]>(ProductList);
  const [isBuildModal, setIsBuildModal] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categoryList[0]);
  const [productToEdit, setProductToEdit] = useState<IProduct>(defaultProduct);
  const [editProductModal, setEditProductModal] = useState<boolean>(false);
  const [productToEditIdx, setProductToEditIdx] = useState<number>(0);
  const [msgError, setMsgError] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  // ----------------- Handlers.🔧 ------------------//
  const handelSelectCategory = (select: ICategory) => {
    setSelectedCategory(select);
  };

  const toggleBuildModal = () => {
    setIsBuildModal(!isBuildModal);
  };

  const toggleIsEditModal = () => {
    setEditProductModal(!editProductModal);
  };

  const handleSelectedColors = (color: string) => {
    if (selectedColor.includes(color)) {
      setSelectedColor((prev) => prev.filter((item) => item !== color));
      return;
    }
    if (selectedColor.concat(productToEdit.colors).includes(color)) {
      setSelectedColor((prev) => prev.filter((item) => item !== color));
      return;
    }
    setSelectedColor((prev) => [...prev, color]);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    setMsgError({ ...msgError, [name]: "" });
  };
  const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductToEdit({ ...productToEdit, [name]: value });
    setMsgError({ ...msgError, [name]: "" });
  };

  const editProduct = (product: IProduct, idx: number) => {
    setProductToEditIdx(idx);
    setProductToEdit(product);
  };

  const onCancel = () => {
    // Toggle the modal
    toggleBuildModal();
    // Reset the product to initial value
    setProduct(defaultProduct);
    setSelectedColor([]);
    setMsgError({ title: "", description: "", imageURL: "", price: "" });
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorObj = productValidation(product);
    setMsgError(errorObj);
    setProduct(product);
    const notHasErrorMessage = Object.values(errorObj).every((ele) => ele == "");
    const hasColor = selectedColor.length;
    if (notHasErrorMessage && hasColor) {
      // Add The new product
      setProductList((prev) => [
        { ...product, id: uuid(), colors: selectedColor, category: { ...selectedCategory } },
        ...prev,
      ]);
      // Reset the product to initial value
      setProduct(defaultProduct);
      setSelectedColor([]);
      // Close the modal
      toggleBuildModal();
    }
  };
  const submitEditHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorObj = productValidation(productToEdit);
    setMsgError(errorObj);
    setProductToEdit(productToEdit);
    const notHasErrorMessage = Object.values(errorObj).every((ele) => ele == "");
    // const hasColor = selectedColor.length;
    if (notHasErrorMessage) {
      const updatedProducts = [...productList];
      updatedProducts[productToEditIdx] = productToEdit;
      setProductList(updatedProducts);
      toggleIsEditModal();
    }
  };
  // ---------------- Renders..!🔃----------------//
  const productListRender = productList.map((product, idx) => (
    <ProductCard
      index={idx}
      product={product}
      key={product.id}
      toggleIsEditProduct={toggleIsEditModal}
      isEditProduct={editProduct}
    />
  ));

  const formInputsRender = formInputList.map((input) => {
    return (
      <div key={input.id}>
        <label htmlFor={input.id} className="text-sm/6 font-medium text-gray-500">
          {input.label}
        </label>
        <MyInput
          type={input.type}
          name={input.name}
          id={input.id}
          value={product[input.name]}
          onChange={(e) => {
            onChangeHandler(e);
          }}
        />
        <MessageError msg={msgError[input.name]} />
      </div>
    );
  });
  const renderInputToEdit = (type: string, id: string, label: string, name: TFormInputs) => {
    return (
      <div key={id}>
        <label htmlFor={id} className="text-sm/6 font-medium text-gray-500">
          {label}
        </label>
        <MyInput
          type={type}
          name={name}
          id={id}
          value={productToEdit[name]}
          onChange={(e) => {
            onChangeEditHandler(e);
          }}
        />
        <MessageError msg={msgError[name]} />
      </div>
    );
  };
  const renderCircles = colors.map((el) => (
    <Circle
      onClick={() => {
        handleSelectedColors(el);
      }}
      color={el}
      key={el}
    />
  ));

  const selectedColorRender = selectedColor.map((color) => (
    <span
      key={color}
      className="px-2 py-1 text-white font-semibold rounded-md"
      style={{ background: `${color}` }}>
      {color}
    </span>
  ));

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
      <Modal isOpen={isBuildModal} setOpenAndClose={toggleBuildModal} title="Add A New Product">
        <form onSubmit={submitHandler}>
          {/* Render inputs..👋 */}
          <div className="space-y-3">{formInputsRender}</div>
          <div>
            <Select selected={selectedCategory} setSelected={handelSelectCategory} />
          </div>
          <div className="">
            <div className="my-3 flex space-x-1">{renderCircles}</div>
            <div className="flex flex-wrap gap-1">{selectedColorRender}</div>
          </div>
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

      {/* Edit the product modal..🫠 */}
      <Modal
        isOpen={editProductModal}
        setOpenAndClose={toggleIsEditModal}
        title="Edit This Product">
        <form onSubmit={submitEditHandler}>
          {/* Render inputs..👋 */}

          {renderInputToEdit("text", "title", "Product Title", "title")}
          {renderInputToEdit("text", "description", "Product Description", "description")}
          {renderInputToEdit("text", "ImageURL", "Product ImageURL", "imageURL")}
          {renderInputToEdit("text", "price", "Product Price", "price")}

          <Select
            selected={productToEdit.category}
            setSelected={(value) => {
              setProductToEdit({ ...productToEdit, category: value });
            }}
          />
          <div className="">
            <div className="my-3 flex space-x-1">{renderCircles}</div>
            <div className="flex flex-wrap gap-1">
              {selectedColor.concat(productToEdit.colors).map((color) => (
                <span
                  key={color}
                  className="px-2 py-1 text-white font-semibold rounded-md"
                  style={{ background: `${color}` }}>
                  {color}
                </span>
              ))}
            </div>
          </div>
          {/* button of modal..👋 */}
          <div className="flex gap-3 mt-3 items-center justify-between">
            <Button
              type="submit"
              className="rounded-md bg-blue-600 hover:bg-blue-700  font-semibold ">
              Submit
            </Button>
            <Button
              type="button"
              onClick={toggleIsEditModal}
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
