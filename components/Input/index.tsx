import React, { forwardRef } from "react";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  error: string;
}
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { error, className = "", ...rest } = props;
  return (
    <div className="relative w-full h-full flex flex-col space-y-1">
      <input
        ref={ref}
        className={`w-full py-3 rounded-md border-[1px] ${
          error.length
            ? "border-red-600 text-red-600 focus:ring-red-500 placeholder:text-red-500"
            : "border-slate-200 focus:ring-secondary text-primary"
        } ring-0 outline-none focus:border-transparent focus:outline-none duration-500 ${className}`}
        {...rest}
      />
      {Boolean(error.length) && (
        <span className="text-red-600 text-xs md:text-sm">{error}</span>
      )}
    </div>
  );
});

export default Input;
