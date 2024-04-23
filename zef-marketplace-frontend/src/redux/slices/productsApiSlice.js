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
    getAllProductsLoggedSeller : builder.query({
      query : () => ({
        url : `/api/v1/products/logged-seller`,
      }),
      keepUnusedDataFor : 5,
      providesTags: ["Products"]
    }),
    getAllProductsByAdmin : builder.query({
      query : () => ({
        url : `/api/v1/products/admin-get-product`,
      }),
      keepUnusedDataFor : 5,
      providesTags: ["Products"]
    }),
    getOneProduct : builder.query({
      query : (id) => ({
        url : `/api/v1/products/get-one-product/${id}`,
      }),
      keepUnusedDataFor : 5,
      providesTags: ["Products"]
    }),
    updateProduct : builder.mutation({
      query : ({productId ,data}) => ({
        url : `/api/v1/products/update-product/${productId}`,
        method : "PUT",
        body : data,
      }),
    }),
    deleteProduct : builder.mutation({
      query : (id) => ({
        url : `/api/v1/products/delete-product/${id}`,
        method : "DELETE",
      }),
    }),
    deleteProductBySeller : builder.mutation({
      query : (id) => ({
        url : `/api/v1/products/delete-product-by-seller/${id}`,
        method : "DELETE",
      }),
    }),
    adminUpdateProductStatus : builder.mutation({
      query : (id) => ({
        url : `/api/v1/products/admin-toggle-product-status/${id}`,
        method : "PUT",
      }),
    }),
    getProductWithFilters : builder.mutation({
      query : (data) => ({
        url : `/api/v1/products?pageNumber=${data.page}`,
        method : "POST",
        body : data,
      }),
    }),
  })
})



export const {useAddProductMutation , useGetAllProductsLoggedSellerQuery , useGetOneProductQuery ,
useUpdateProductMutation , useDeleteProductMutation , useGetAllProductsByAdminQuery ,
 useAdminUpdateProductStatusMutation , useGetProductWithFiltersMutation , useDeleteProductBySellerMutation } = productsApiSlice;
