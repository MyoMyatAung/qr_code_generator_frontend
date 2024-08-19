import { FcBullish, FcCustomerSupport } from "react-icons/fc";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import SideMenuItem from "./SideMenuItem";
import { BOTTOM_MENU_ITEMS, SIDE_MENU_ITEMS } from "../../libs/routes/SideMenuItems";

type Props = {
  username: string;
  role: string;
};

const SideMenu: React.FC<Props> = ({ username, role }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth");
  };

  return (
    <div className="flex flex-col bg-gray-500 w-60">
      <div className="flex items-center gap-3 m-4">
        <FcBullish fontSize={24} />
        <span className="text-neutral-100 font-bold text-lg">
          AMI Life Dashboard
        </span>
      </div>
      <div className="bg-gray-700 mt-4 mb-8 mx-2 p-4 flex items-center gap-2 rounded-lg">
        <FcCustomerSupport fontSize={32} />
        <div>
          <h3 className="text-neutral-100 font-semibold text-sm">{username}</h3>
          <p className="text-neutral-300 text-xs">{role}</p>
        </div>
      </div>
      <hr className="text-black" />
      <div className="flex-1 flex flex-col justify-start gap-1 m-2">
        {SIDE_MENU_ITEMS.map((item) => {
          return <SideMenuItem key={item.key} item={item}></SideMenuItem>;
        })}
      </div>
      <hr />
      <div className="m-4">
        {BOTTOM_MENU_ITEMS.map((item) => {
          return <SideMenuItem key={item.key} item={item}></SideMenuItem>;
        })}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-400 font-semibold rounded-md px-3 py-1 hover:bg-red-400 hover:text-neutral-100 w-full"
        >
          <BiLogOut className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SideMenu;
