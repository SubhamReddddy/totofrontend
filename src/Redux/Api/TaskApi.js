import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://todo-app-server-psjd.onrender.com/tasks/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (data) => ({
        url: "new",
        method: "POST",
        body: data,
      }),
    }),

    updateTask: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        method: "PUT",
        body: "",
      }),
    }),

    getAllTask: builder.query({
      query: () => "mytasks",
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useGetAllTaskQuery,
} = taskApi;
