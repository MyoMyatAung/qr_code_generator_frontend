import { useNavigate } from "react-router-dom";
import { LocalStorageKeys, RoutesPath } from "../libs/constants";
import { useEffect } from "react";

export const useProtectedRouteWrapper = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);
    useEffect(() => {
        if (!token) {
            navigate(RoutesPath.AUTH);
        }
    }, [token, navigate]);
}

export const useAuthRouteWrapper = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);
    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token, navigate]);
}