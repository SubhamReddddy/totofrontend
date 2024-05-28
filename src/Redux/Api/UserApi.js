import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://todo-app-server-ledo.onrender.com/users/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    userRegister: builder.mutation({
      query: (data) => ({
        url: "new",
        method: "POST",
        body: data,
      }),
    }),

    userLogin: builder.mutation({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: data,
      }),
    }),

    userDetails: builder.query({
      query: () => "me",
    }),

    userLogout: builder.query({
      query: () => "logout",
    }),
  }),
});

export const {
  useUserRegisterMutation,
  useUserLoginMutation,
  useUserDetailsQuery,
  useUserLogoutQuery,
} = userApi;
