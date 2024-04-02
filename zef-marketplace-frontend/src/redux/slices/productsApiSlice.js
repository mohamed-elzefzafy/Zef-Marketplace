import { apiSlice } from "./apiSlice";


export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints : (builder) => ({
    addProduct : builder.mutation({
      query : (data) => ({
        url : `/api/v1/products/add-product`,
      method : "POST",
      body : data,
      })
    }),
    getAllProducts : builder.query({
      query : () => ({
        url : `/api/v1/products`,
      }),
      keepUnusedDataFor : 5,
      providesTags: ["Products"]
    }),
    getOneProduct : builder.query({
      query : (id) => ({
        url : `/api/v1/products/get-one-product/${id}`,
      }),
      // keepUnusedDataFor : 5,
      // providesTags: ["Products"]
    }),
    updateProduct : builder.mutation({
      query : (data) => ({
        url : `/api/v1/products/get-one-product/${data.id}`,
        method : "PUT",
        body : data,
      }),
    }),
    deleteProduct : builder.mutation({
      query : (data) => ({
        url : `/api/v1/products/delete-product/${data.id}`,
        method : "DELETE",
        body : data,
      }),
    }),
  })
})



export const {useAddProductMutation , useGetAllProductsQuery , useGetOneProductQuery ,
useUpdateProductMutation , useDeleteProductMutation } = productsApiSlice;
