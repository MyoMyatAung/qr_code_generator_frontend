import React, { ReactNode } from "react";
import { SideMenuItem as SideMenuItemType } from "../../libs/routes/SideMenuItems";
import { NavLink } from "react-router-dom";

export interface Props {
  item: SideMenuItemType;
  children?: ReactNode;
}

const classes =
  "flex items-center gap-3 text-white text-sm rounded-sm px-3 py-2 hover:bg-gray-600 hover:text-white";

const SideMenuItem: React.FC<Props> = (props) => {

  return (
    <NavLink
      to={props.item.path}
      className={({ isActive }) =>
        isActive ? `${classes} bg-gray-700 text-white` : classes
      }
    >
      <span className="text-sm">{props.item.icon}</span>
      <span>{props.item.title}</span>
    </NavLink>
  );
};

export default SideMenuItem;
