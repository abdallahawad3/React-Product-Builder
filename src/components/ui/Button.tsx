import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className: string;
  children: ReactNode;
  width?: "w-full" | "w-fit";
}

const Button = ({ className, width = "w-full", children, ...rest }: IProps) => {
  return (
    <button className={`p-2 ${width} text-white rounded-md ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
