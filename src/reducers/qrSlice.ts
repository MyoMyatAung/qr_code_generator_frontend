import { API_ENDPOINTS, HTTP_METHODS, REDUX_TOOLKIT_TAGS } from "../libs/constants";
import { QR, QRPagination } from "../libs/models/qr";
import { IResponse } from "../libs/models/responses";
import { objectToQueryString } from "../utils";
import { apiSlice } from "./apiSlice";

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
      toggleQr: builder.mutation<IResponse<QR>, { id: string, data: { status: boolean } }>({
        query: (payload) => {
          return {
            url: API_ENDPOINTS.QR + "/toggle-status/" + payload.id,
            method: HTTP_METHODS.PATCH,
            body: payload.data,
          };
        },
        invalidatesTags: [REDUX_TOOLKIT_TAGS.QR],
      })
    }
  }
});

export const { useGetQrsQuery, useCreateQrMutation, useGetQrByIdQuery, useUpdateQrMutation, useToggleQrMutation } = extendedQRApiSlice;
