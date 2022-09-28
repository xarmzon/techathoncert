import React from "react";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}
const Button = (props: ButtonProps) => {
  const { className = "", children, ...rest } = props;
  return (
    <button
      className={`px-5 py-3 rounded-md bg-grdt hover:bg-grdt2 transition-colors duration-1000 text-white disabled:cursor-not-allowed ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
