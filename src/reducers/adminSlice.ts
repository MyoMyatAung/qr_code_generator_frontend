import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { objectToQueryString } from "../utils";
import { API_ENDPOINTS, HTTP_METHODS, REDUX_TOOLKIT_TAGS } from "../libs/constants";
import { Admin, AdminPagination } from "../libs/models/admin";
import { IResponse } from "../libs/models/responses";
import { CreateAdminInput, UpdateAdminInput } from "../libs/schemas/admin.schema";

interface InitialState {
    openFormDialog: boolean;
    selectedAdmin: Admin | null,
    confirmDialog: {
        isOpen: boolean;
        title: string;
        description: string;
    }
}

const initialState: InitialState = {
    openFormDialog: false,
    selectedAdmin: null,
    confirmDialog: {
        isOpen: false,
        title: "",
        description: ""
    }
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        toggleFormDialog: (state, action: PayloadAction<boolean>) => {
            state.openFormDialog = action.payload;
        },
        setSelectedAdmin: (state, action: PayloadAction<Admin | null>) => {
            state.selectedAdmin = action.payload;
        },
        openConfirmDialog: (state, action: PayloadAction<{ title: string, description: string }>) => {
            state.confirmDialog.isOpen = true;
            state.confirmDialog.title = action.payload.title;
            state.confirmDialog.description = action.payload.description;
        },
        closeConfirmDialog: (state) => {
            state.confirmDialog = initialState.confirmDialog;
        },
    },
});

export const extendedAdminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => {
        return {
            getAdmins: builder.query<IResponse<Array<Admin>>, AdminPagination>({
                query: (payload) => {
                    const q = objectToQueryString(payload);
                    return {
                        url: `${API_ENDPOINTS.ADMINS}?${q}`,
                        headers: {
                            "Content-Type": "application/json",
                        },
                    };
                },
                providesTags: [REDUX_TOOLKIT_TAGS.ADMINS],
            }),
            createAdmin: builder.mutation<IResponse<Admin>, CreateAdminInput>(
                {
                    query: (payload) => {
                        return {
                            url: API_ENDPOINTS.ADMINS,
                            headers: {
                                "Content-Type": "application/json",
                            },
                            method: HTTP_METHODS.POST,
                            body: payload,
                        };
                    },
                    invalidatesTags: [REDUX_TOOLKIT_TAGS.ADMINS],
                }
            ),
            updateAdmin: builder.mutation<IResponse<Admin>, { id: string, data: UpdateAdminInput }>(
                {
                    query: (payload) => {
                        return {
                            url: `${API_ENDPOINTS.ADMINS}/${payload.id}`,
                            headers: {
                                "Content-Type": "application/json",
                            },
                            method: HTTP_METHODS.PUT,
                            body: payload.data,
                        };
                    },
                    invalidatesTags: (result, error, args) => [{ type: REDUX_TOOLKIT_TAGS.ADMINS, _id: args.id }, REDUX_TOOLKIT_TAGS.ADMINS],
                }
            ),
            deleteAdmin: builder.mutation<IResponse<Admin>, string>({
                query: (id: string) => ({
                    url: `${API_ENDPOINTS.ADMINS}/${id}`,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: HTTP_METHODS.DELETE,
                }),
                invalidatesTags: [REDUX_TOOLKIT_TAGS.ADMINS]
            }),
        };
    },
});

export const { useGetAdminsQuery, useCreateAdminMutation, useUpdateAdminMutation, useDeleteAdminMutation } = extendedAdminApiSlice;

export const { setSelectedAdmin, toggleFormDialog, openConfirmDialog, closeConfirmDialog } = adminSlice.actions;
export default adminSlice.reducer;
