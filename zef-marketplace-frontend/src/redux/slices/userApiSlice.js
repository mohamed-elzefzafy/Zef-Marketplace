import { apiSlice } from "./apiSlice"


export const userApiSlice = apiSlice.injectEndpoints({
  endpoints : (builder) => ({
    registerApi : builder.mutation({
      query : (data) => ({
        url : `/api/v1/users/register`,
      method : "POST",
      body : data,
      })
    }),
    loginApi : builder.mutation({
      query : (data) => ({
        url : `/api/v1/users/login`,
      method : "POST",
      body : data,
      })
    })
  })
})


export const {useRegisterApiMutation , useLoginApiMutation} = userApiSlice;





