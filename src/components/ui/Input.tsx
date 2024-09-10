import type { InputHTMLAttributes } from "react";
import type { IFormInputs } from "../../interfaces";
import { Input } from "@headlessui/react";
import clsx from "clsx";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  input: IFormInputs;
}

const MyInput = ({ input, ...res }: IProps) => {
  const { type, id, name } = input;
  return (
    <div>
      <Input
        className={clsx(
          "mt-block w-full outline-none border-2 rounded-md shadow-md p-2 text-sm/6 ",
          "focus:border-blue-600"
        )}
        type={type}
        id={id}
        name={name}
        {...res}
      />
    </div>
  );
};

export default MyInput;
