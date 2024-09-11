import type { InputHTMLAttributes } from "react";
import { Input } from "@headlessui/react";
import clsx from "clsx";

const MyInput = ({ ...res }: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div>
      <Input
        className={clsx(
          "mt-block w-full outline-none border-2 rounded-md shadow-md p-2 text-sm/6 ",
          "focus:border-blue-600"
        )}
        {...res}
      />
    </div>
  );
};

export default MyInput;
