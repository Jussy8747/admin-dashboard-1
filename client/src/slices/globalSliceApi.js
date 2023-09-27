import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const url = import.meta.env.VITE_APP_BASE_URL;

export const globalSliceApi = createApi({
  reducerPath: "globalSliceApi",
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  tagTypes: [
    "User",
    "Product",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard",
  ],

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

    getGeography: build.query({
      query: () => `client/geography`,
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: () => `sales/sales`,
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => `management/admins`,
      providesTags: ["Admins"],
    }),

    getPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),
    getDashboardStats: build.query({
      query: (id) => `general/dashboard`,
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetPerformanceQuery,
  useGetDashboardStatsQuery,
} = globalSliceApi;
