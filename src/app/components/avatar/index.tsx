import React from "react";
import classNames from "classnames";

interface AvatarProps {
  src?: string;
  alt?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  style,
  children,
  className,
}) => {
  return (
    <div
      className={classNames(
        "w-10 h-10 flex items-center justify-center rounded-full overflow-hidden bg-gray-400 text-neutral-800 text-lg",
        className
      )}
      style={style}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        children
      )}
    </div>
  );
};

export default Avatar;
