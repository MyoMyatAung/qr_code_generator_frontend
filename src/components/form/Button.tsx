import React from "react";
import { BUTTON_SIZE, BUTTON_TYPE, BUTTON_VARIANT } from "../../libs/constants";

type Props = {
    type: BUTTON_TYPE;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    label: string;
    variant?: BUTTON_VARIANT;
    size?: BUTTON_SIZE;
    rounded?: boolean;
    blocked?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    isLoading?: boolean;
    disabled?: boolean;
};

const Button: React.FC<Props> = ({
    type,
    onClick,
    label,
    variant = BUTTON_VARIANT.PRIMARY,
    size = BUTTON_SIZE.MEDIUM,
    rounded = false,
    blocked = false,
    startIcon = null,
    endIcon = null,
    isLoading = false,
    disabled = false,
}) => {
    let colorStyle = "text-white bg-blue-600 hover:bg-blue-500";
    let sizeStyle = "font-medium text-sm px-5 py-2";
    let roundedStyle = "rounded-sm";

    switch (variant) {
        case BUTTON_VARIANT.SUCCESS:
            colorStyle = "text-white bg-green-600 hover:bg-green-500";
            break;
        case BUTTON_VARIANT.PRIMARY:
            colorStyle = "text-white bg-primary hover:bg-secondary";
            break;
        case BUTTON_VARIANT.SECONDARY:
            colorStyle =
                "text-gray-500 bg-white hover:bg-gray-100 border border-gray-200";
            break;
        case BUTTON_VARIANT.ERROR:
            colorStyle = "text-white bg-red-600 hover:bg-red-500";
            break;
        case BUTTON_VARIANT.WARNING:
            colorStyle = "text-white bg-orange-600 hover:bg-orange-500";
            break;
        case BUTTON_VARIANT.INFO:
            colorStyle = "text-white bg-teal-600 hover:bg-teal-500";
            break;
        default:
            break;
    }

    switch (size) {
        case "sm":
            sizeStyle = "text-xs px-2 py-1";
            break;
        case "md":
            sizeStyle = "font-medium text-sm px-5 py-2";
            break;
        case "lg":
            sizeStyle = "font-medium text-md px-5 py-2";
            break;

        default:
            break;
    }

    if (rounded) {
        roundedStyle = "rounded-md";
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isLoading || disabled}
            className={`flex justify-center items-center gap-1 ${colorStyle} ${sizeStyle} ${roundedStyle} text-center ${blocked ? "w-full" : ""
                }`}
        >
            {isLoading && <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#840414" />
            </svg>}
            {startIcon} {label} {endIcon}
        </button>
    );
};

export default Button;