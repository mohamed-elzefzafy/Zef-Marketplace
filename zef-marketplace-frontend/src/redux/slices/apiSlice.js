import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../utils/baseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl : baseUrl,
  credentials : "include"
})

export const apiSlice = createApi({
  baseQuery,
  tagTypes : ["Product" ,  "User"],
  endpoints : (builder) => ({})
})



