import { API_ENDPOINTS, HTTP_METHODS, REDUX_TOOLKIT_TAGS } from "../libs/constants";
import { QR, QRPagination } from "../libs/models/qr";
import { IResponse } from "../libs/models/responses";
import { objectToQueryString } from "../utils";
import { apiSlice } from "./apiSlice";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface InitialState {
  confirmDialog: {
    isOpen: boolean;
    title: string;
    description: string;
  }
}

const initialState: InitialState = {
  confirmDialog: {
    isOpen: false,
    title: "",
    description: ""
  }
}

const qrSlice = createSlice({
  name: "qr",
  initialState,
  reducers: {
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

export const extendedQRApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getQrs: builder.query<IResponse<Array<QR>>, QRPagination>({
        query: (payload) => {
          const q = objectToQueryString(payload);
          return {
            url: `${API_ENDPOINTS.QR}?${q}`,
            headers: {
              "Content-Type": "application/json",
            },
          };
        },
        providesTags: [REDUX_TOOLKIT_TAGS.QR],
      }),
      createQr: builder.mutation<IResponse<QR>, FormData>({
        query: (payload) => {
          return {
            url: API_ENDPOINTS.QR,
            method: HTTP_METHODS.POST,
            body: payload,
            formData: true,
          };
        },
        invalidatesTags: [REDUX_TOOLKIT_TAGS.QR],
      }),
      updateQr: builder.mutation<IResponse<QR>, { id: string, data: FormData }>({
        query: (payload) => {
          return {
            url: API_ENDPOINTS.QR + "/" + payload.id,
            method: HTTP_METHODS.PUT,
            body: payload.data,
            formData: true,
          };
        },
        invalidatesTags: [REDUX_TOOLKIT_TAGS.QR],
      }),
      getQrById: builder.query<IResponse<QR>, string>({
        query: (ID) => {
          return {
            url: `${API_ENDPOINTS.QR}/${ID}`,
            headers: {
              "Content-Type": "application/json",
            },
          };
        },
        providesTags: [REDUX_TOOLKIT_TAGS.QR],
      }),
      getQrByQrId: builder.query<IResponse<QR>, string>({
        query: (ID) => {
          return {
            url: `${API_ENDPOINTS.QR}/qrId/${ID}`,
            headers: {
              "Content-Type": "application/json",
            },
          };
        },
        providesTags: [REDUX_TOOLKIT_TAGS.QR],
      }),
      toggleQr: builder.mutation<IResponse<QR>, { id: string, data: { status: boolean } }>({
        query: (payload) => {
          return {
            url: API_ENDPOINTS.QR + "/toggle-status/" + payload.id,
            method: HTTP_METHODS.PATCH,
            body: payload.data,
          };
        },
        invalidatesTags: [REDUX_TOOLKIT_TAGS.QR],
      }),
      scanQr: builder.mutation<IResponse<QR>, string>({
        query: (payload) => {
          return {
            url: API_ENDPOINTS.QR + "/scan/" + payload,
            method: HTTP_METHODS.PATCH,
          };
        },
        invalidatesTags: [REDUX_TOOLKIT_TAGS.QR],
      }),
      deleteQr: builder.mutation<IResponse<QR>, string>({
        query: (id: string) => ({
          url: `${API_ENDPOINTS.QR}/${id}`,
          headers: {
            "Content-Type": "application/json",
          },
          method: HTTP_METHODS.DELETE,
        }),
        invalidatesTags: [REDUX_TOOLKIT_TAGS.QR]
      }),
    }
  }
});

export const { useGetQrsQuery, useCreateQrMutation, useGetQrByIdQuery, useGetQrByQrIdQuery, useUpdateQrMutation, useToggleQrMutation, useScanQrMutation, useDeleteQrMutation } = extendedQRApiSlice;

export const { openConfirmDialog, closeConfirmDialog } = qrSlice.actions;
export default qrSlice.reducer;