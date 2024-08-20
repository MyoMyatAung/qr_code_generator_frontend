import { UseFormRegister } from "react-hook-form";

type Props = {
    id: string;
    label: string;
    register: UseFormRegister<any>;
    name: string;
    required: boolean;
    error: string;
    placeHolder: string;
    disabled?: boolean;
};

const ITextArea: React.FC<Props> = ({ id, name, label, register, placeHolder, required, error, disabled = false }) => {
    return (
        <div>
            <label
                htmlFor={id}
                className={`block mb-1 text-sm font-medium ${!!error ? "text-red-600" : "text-gray-600"}`}
            >
                {label}
            </label>
            <textarea
                rows={3}
                cols={30}
                disabled={disabled}
                placeholder={placeHolder}
                id={id}
                {...register(name)}
                className={`bg-gray-50 border ${!!error ? "border-red-300" : "border-gray-300 mb-4"} text-gray-600 text-sm rounded-sm focus:outline-none active:outline-none block w-full p-2.5 ${disabled ? "cursor-not-allowed" : ""}`}
            />
            <p className="text-red-600 text-xs">{error}</p>
        </div>
    );
};

export default ITextArea;
