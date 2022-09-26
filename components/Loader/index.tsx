import React from "react";

interface ILoader {
  text?: string;
}
const Loader = ({ text = "Loading" }: ILoader) => {
  return (
    <div className="fixed z-[999999999999] inset-0 w-full h-full bg-[rgba(0,0,0,0.7)] grid backdrop-blur-[4px] place-items-center">
      <div className="h-16 w-16 rounded-full bg-gradient-to-r from-secondary to-accent animate-spin"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs bg-white/80 backdrop-blur-[2px] h-12 w-12 grid place-items-center rounded-full">
        <span className="loading-text">{text}</span>
      </div>
    </div>
  );
};

export default Loader;
