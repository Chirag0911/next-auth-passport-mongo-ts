import React from "react";
import {
  Menu as MenuComponent,
  MenuButton,
  MenuItem,
} from "@szhsin/react-menu";
import classNames from "classnames";

interface ActionItem {
  title: string;
  disabled?: boolean;
  onClick?: () => void;
  hide?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

interface ActionsMenuProps {
  children?: React.ReactNode;
  actions?: ActionItem[];
  align?: "start" | "center" | "end";
  direction?: "left" | "right" | "top" | "bottom";
  menuButtonClassName?: string;
  className?: string;
  menuClassName?: string;
}

const ActionsMenu: React.FC<ActionsMenuProps> = ({
  children,
  actions = [],
  align = "start",
  direction = "bottom",
  menuButtonClassName = "",
  className = "",
  menuClassName = "",
}) => {
  return (
    <MenuComponent
      align={align}
      direction={direction}
      portal
      menuButton={
        <MenuButton
          className={classNames("react-menu-menubutton", menuButtonClassName)}
        >
          {children}
        </MenuButton>
      }
      position="anchor"
      className={className}
      menuClassName={menuClassName}
    >
      {actions?.map((item, index) => {
        if (item?.hide) return null; // Skip hidden items
        return (
          <MenuItem
            disabled={item?.disabled}
            onClick={item?.onClick}
            key={`menu-item-${index}`}
            className={classNames("flex gap-2 items-center", item?.className)}
          >
            {item?.icon && item.icon}
            {item?.title}
          </MenuItem>
        );
      })}
    </MenuComponent>
  );
};

export default ActionsMenu;
