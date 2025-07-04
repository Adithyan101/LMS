import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
// import { userLoggedIn } from "../feautures/authSlice";

const COURSE_API = "http://localhost:5000/api/v1/course";

export const courseApi = createApi({
    reducerPath: "courseApi",
    tagTypes: ["Course"],
    baseQuery: fetchBaseQuery({
        baseUrl: COURSE_API,
        credentials: "include",
    }),
    refetchOnFocus: true,
    refetchOnReconnect: true,
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: (data) => ({
                url: "/create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Course"],
        }),

       getCreatorCourse:builder.query({
           query: () => ({
               url: "",
               method: "GET",
           }),
           providesTags: ["Course"],
       })
    }),
});

export const { useCreateCourseMutation, useGetCreatorCourseQuery } = courseApi