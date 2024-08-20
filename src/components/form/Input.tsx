import { UseFormRegister } from "react-hook-form";

type IInputProps = {
    id: string;
    label: string;
    register: UseFormRegister<any>;
    name: string;
    required: boolean;
    error: string;
    placeHolder: string;
    disabled?: boolean;
    type?: "text" | "email" | "password" | "number" | "time" | "file" | "date";
}

export const IInput: React.FC<IInputProps> = ({ id, name, label, register, placeHolder, required, error, disabled = false, type = "text" }) => {
    return <div>
        <label
            htmlFor={id}
            className={`block mb-1 text-sm font-medium ${!!error ? "text-red-600" : "text-gray-600"}`}
        >
            {label}
        </label>
        <input
            type={type}
            disabled={disabled}
            placeholder={placeHolder}
            id={id}
            required={required}
            {...register(name, { required, valueAsNumber: type === "number" })}
            className={`bg-gray-50 border ${!!error ? "border-red-300" : "border-gray-300 mb-4"} text-gray-600 text-sm rounded-md focus:outline-none active:outline-none block w-full p-2 ${disabled ? "cursor-not-allowed" : ""}`}
        />
        <p className="text-red-600 text-xs">{error}</p>
    </div>
}
