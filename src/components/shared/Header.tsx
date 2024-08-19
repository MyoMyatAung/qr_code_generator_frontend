import { FcBullish } from "react-icons/fc";

const Header = () => {
    return (
        <header className=" bg-white px-4 py-3 fixed top-0 w-full z-10 shadow-sm">
            <div className="flex items-center gap-3">
                <FcBullish fontSize={24} />
                <span className="text-gray-600 font-semibold text-lg">
                    Employee QR Code Dashboard
                </span>
            </div>
        </header>
    );
};

export default Header;
