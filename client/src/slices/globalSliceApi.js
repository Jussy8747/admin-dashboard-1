import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const url = import.meta.env.VITE_APP_BASE_URL;

export const globalSliceApi = createApi({
  reducerPath: "globalSliceApi",
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  tagTypes: ["User", "Product", "Customers", "Transactions"],

  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,

      providesTags: ["User"],
    }),

    getProduct: build.query({
      query: () => `client/products`,

      providesTags: ["Products"],
    }),

    getCustomers: build.query({
      query: () => `client/customers`,
      providesTags: ["Customers"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
} = globalSliceApi;
