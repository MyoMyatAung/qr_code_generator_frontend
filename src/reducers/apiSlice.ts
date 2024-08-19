import { BaseQueryApi, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINTS, HTTP_HEADERS_KEYS, LocalStorageKeys, REDUX_TOOLKIT_TAGS, RoutesPath } from "../libs/constants";
import { Admin } from "../libs/models/admin";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers) => {
        headers.set(HTTP_HEADERS_KEYS.AUTHORIZATION, `Bearer ${localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN)}`);
        headers.set(HTTP_HEADERS_KEYS.X_REFRESH_TOKEN, `${localStorage.getItem(LocalStorageKeys.REFRESH_TOKEN)}`);
    },
});

const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
    let result = await baseQuery(args, api, extraOptions);
    if (!!result.error && result.error.status === 403) {
        localStorage.clear();
        window.location.href = `/${RoutesPath.AUTH}`;
    }
    return result;
};

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReauth,
    tagTypes: [REDUX_TOOLKIT_TAGS.ADMINS, REDUX_TOOLKIT_TAGS.CURRENT_UER, REDUX_TOOLKIT_TAGS.QR],
    endpoints: (builder) => ({
        getMe: builder.query<Admin, void>({
            query: () => {
                return {
                    url: API_ENDPOINTS.GET_ME,
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
            },
            providesTags: [REDUX_TOOLKIT_TAGS.CURRENT_UER],
        })
    }),
});

export const { useGetMeQuery } = apiSlice;
