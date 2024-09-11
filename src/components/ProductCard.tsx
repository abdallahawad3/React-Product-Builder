import type { IProduct } from "../interfaces";
import { handelPrice, textSlice } from "../utils";
import Circle from "./Circle";
import Image from "./Image";
import Button from "./ui/Button";

interface IProps {
  product: IProduct;
  index: number;
  toggleIsEditProduct: () => void;
  isEditProduct: (product: IProduct, idx: number) => void;
}

const ProductCard = ({ product, toggleIsEditProduct, isEditProduct, index }: IProps) => {
  //!------------------------------ 🔴✅ Render Color Circle ✅🔴 ------------------------------
  const circleRender = product.colors.map((color) => <Circle color={color} key={color} />);

  return (
    <div className="border border-slate-300 rounded-md p-3 space-y-2">
      <Image url={product.imageURL} alt={product.title} classes="rounded-sm " />
      <h2 className="font-bold text-lg text-black/80 ">{textSlice(product.title, 20)}</h2>
      <p className="text-slate-500">{textSlice(product.description, 50)}</p>
      <div className="mt-2 mb-2 flex space-x-1">{circleRender}</div>

      <div className="flex justify-between items-center">
        <span className="text-blue-700 font-semibold">{handelPrice(product.price)}$</span>
        <div className="flex items-center space-x-1">
          <span className="font-semibold text-violet-700">
            {product.category.name.toUpperCase()}
          </span>
          <Image
            url={product.imageURL}
            alt={product.title}
            classes="w-8 h-8 rounded-full object-fit"
          />
        </div>
      </div>

      <div className="flex  justify-between items-center my-2 space-x-2 ">
        <Button
          onClick={() => {
            toggleIsEditProduct();
            isEditProduct(product, index);
          }}
          className=" bg-blue-600 hover:bg-blue-700">
          EDIT
        </Button>
        <Button className="bg-red-600 hover:bg-red-700">DELETE</Button>
      </div>
    </div>
  );
};

export default ProductCard;
