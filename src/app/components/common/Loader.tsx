import React from "react";
import classNames from "classnames";

interface ILoaderProps {
  className?: string;
}

const Loader: React.FC<ILoaderProps> = ({ className = "border-white" }) => {
  return (
    <div
      className={classNames(
        "animate-spin border-t-2 w-6 h-6 rounded-full mx-auto",
        className
      )}
    ></div>
  );
};

export default Loader;
