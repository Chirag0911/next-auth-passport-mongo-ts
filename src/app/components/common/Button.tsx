import React from "react";
import classNames from "classnames";
import Loader from "./Loader";

interface ButtonProps {
  buttonText: string | React.ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  className?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  buttonText,
  isLoading,
  isDisabled,
  className = "bg-blue-500 text-white hover:shadow",
  onClick,
  type,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames("py-2 px-4 rounded-full", className, {
        "bg-gray-400 cursor-not-allowed": isDisabled,
        "cursor-pointer": !isLoading && !isDisabled,
      })}
      disabled={isLoading || isDisabled}
    >
      {isLoading ? <Loader /> : buttonText}
    </button>
  );
};

export default Button;
