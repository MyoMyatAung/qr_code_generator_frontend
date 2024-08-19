import { useEffect } from "react";
import { closeSnackBar } from "../../reducers/appSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import { TOAST_SEVERITY } from "../../libs/constants";

const successIcon = <div className="flex-shrink-0">
    <svg className="flex-shrink-0 size-4 text-teal-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
    </svg>
</div>

const errorIcon = <div className="flex-shrink-0">
    <svg className="flex-shrink-0 size-4 text-red-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
</div>

const warningIcon = <div className="flex-shrink-0">
    <svg className="flex-shrink-0 size-4 text-yellow-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
    </svg>
</div>

const infoIcon = <div className="flex-shrink-0">
    <svg className="flex-shrink-0 size-4 text-blue-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
    </svg>
</div>

const Toast = () => {

    const { messageSnackBar } = useAppSelector(state => state.app);
    const dispatch = useAppDispatch();

    const { isOpen, message, severity } = messageSnackBar;

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                dispatch(closeSnackBar());
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [isOpen, dispatch]);

    if (!isOpen) return null;

    let icon;

    switch (severity) {
        case TOAST_SEVERITY.SUCCESS:
            icon = successIcon;
            break;
        case TOAST_SEVERITY.ERROR:
            icon = errorIcon;
            break;
        case TOAST_SEVERITY.WARNING:
            icon = warningIcon;
            break;
        case TOAST_SEVERITY.INFO:
            icon = infoIcon;
            break;
        default:
            icon = infoIcon;
            break;
    }

    const typeClasses = {
        success: "text-green-500",
        error: "text-red-500",
        warning: "text-yellow-500",
        info: "text-blue-500",
    };

    const bgColorClass = typeClasses[severity] || typeClasses.info;


    return <div className={`fixed top-10 z-20 text-sm right-4 bg-white border rounded-xl shadow-lg`} role="alert">
        <div className="flex justify-start items-center gap-4 p-4">
            <div className="flex">
                {icon}
                <div className="ms-3">
                    <p className={`text-sm ${bgColorClass}`}>
                        {message}
                    </p>
                </div>
            </div>
            <button type="button" className="inline-flex flex-shrink-0 justify-center items-center size-5 rounded-lg text-gray-800 opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100">
                <span className="sr-only">Close</span>
                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                </svg>
            </button>
        </div>
    </div>
}
export default Toast;