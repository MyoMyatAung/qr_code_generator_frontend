import { ReactNode } from "react";
import { RoutesPath, RoutesTitle } from "../constants";
import { FaUserCog } from "react-icons/fa";
import { AiOutlineQuestionCircle, AiFillSetting } from "react-icons/ai";
import { IoMenu } from "react-icons/io5";
import { BsActivity } from "react-icons/bs";
import { MdOutlinePauseCircle } from "react-icons/md";

export interface SideMenuItem {
    key: string;
    path: string;
    icon: ReactNode;
    title: string;
}

export const SIDE_MENU_ITEMS: Array<SideMenuItem> = [
    {
        key: RoutesPath.ADMINS,
        path: RoutesPath.ADMINS,
        icon: <FaUserCog />,
        title: RoutesTitle.ADMINS
    },
    {
        key: RoutesPath.ALL,
        path: RoutesPath.ALL,
        icon: <IoMenu />,
        title: RoutesTitle.ALL
    },
    {
        key: RoutesPath.ACTIVE,
        path: RoutesPath.ACTIVE,
        icon: <BsActivity />,
        title: RoutesTitle.ACTIVE
    },
    {
        key: RoutesPath.PAUSED,
        path: RoutesPath.PAUSED,
        icon: <MdOutlinePauseCircle />,
        title: RoutesTitle.PAUSED
    }
];

export const BOTTOM_MENU_ITEMS: Array<SideMenuItem> = [
    {
        key: "settings",
        title: "Settings",
        path: "/settings",
        icon: <AiFillSetting />,
    },
    {
        key: "supports",
        title: "Helps & Support",
        path: "/supports",
        icon: <AiOutlineQuestionCircle />,
    },
];
