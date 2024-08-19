import { API_ENDPOINTS, REDUX_TOOLKIT_TAGS } from "../libs/constants";
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
    }
  }
});

export const { useGetQrsQuery } = extendedQRApiSlice;
