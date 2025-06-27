import {createApi} from '@reduxjs/toolkit/query/react'
import {fetchBaseQuery} from '@reduxjs/toolkit/query'
import { userLoggedIn } from '../feautures/authSlice'


const USER_API = "http://localhost:5000/api/v1/user"

export const authApi = createApi({
    reducerPath:"authApi",
    baseQuery:fetchBaseQuery({
        baseUrl:USER_API,
        credentials:"include"
    }),
    endpoints:(builder) => ({
       registerUser:builder.mutation({
           query:(data) => ({
               url:"/register",
               method:"POST",
               body:data
           })
       }),
       loginUser:builder.mutation({
           query:(data) => ({
               url:"/login",
               method:"POST",
               body:data
           }),
           async onQueryStarted(arg, {queryFulfilled, dispatch}){
               try{
                   const result = await queryFulfilled
                   dispatch(userLoggedIn({user:result.data.user}))
               }catch(err){
                   console.log(err)
               }
           } 
       })
    })
})

export const {useRegisterUserMutation,useLoginUserMutation} = authApi;
