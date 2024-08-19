import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthRouteWrapper } from "../../hooks/useCheckAuth";
import { API_ENDPOINTS, LocalStorageKeys } from "../../libs/constants";
import { ApiClient } from "../../api/client";
import Logo from "../../assets/logo.jpg";

interface AuthPayload {
    email: string;
    password: string;
}

interface ResponsePayload {
    accessToken: string;
    refreshToken: string;
}

const AuthPage = () => {
    useAuthRouteWrapper();
    const navigate = useNavigate();

    const [payload, setPayload] = useState<AuthPayload>({
        email: "",
        password: "",
    });

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setPayload((prev) => ({ ...prev, [name]: value }));
    };

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const client = new ApiClient(
                { "Content-Type": "application/json" },
                false
            );

            const response = await client.post<ResponsePayload>(
                API_ENDPOINTS.LOGIN,
                JSON.stringify(payload)
            );
            localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, response.accessToken);
            localStorage.setItem(LocalStorageKeys.REFRESH_TOKEN, response.refreshToken);
            navigate("/");
        } catch (error) {
            alert(error);
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
                <div className="bg-gray-100 border w-1/2 p-6 rounded-md ">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
                        <img src={Logo} alt="Logo" className="w-40 m-auto" />
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-primary">
                            Sign in to your account
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form
                            onSubmit={handleOnSubmit}
                            className="space-y-3"
                            action="#"
                            method="POST"
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        onChange={handleOnChange}
                                        value={payload.email}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Password
                                    </label>
                                </div>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        onChange={handleOnChange}
                                        value={payload.password}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="mt-2 flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthPage;
