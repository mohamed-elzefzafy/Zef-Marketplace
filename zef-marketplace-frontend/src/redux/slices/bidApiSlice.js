import { apiSlice } from "./apiSlice";


export const bidsApiSlice = apiSlice.injectEndpoints({
  endpoints : (builder) => ({
    addBid : builder.mutation({
      query : (data) => ({
        url : `/api/v1/bids/add-bid/${data.id}`,
        method : 'POST',
        body : data
      }),
  
    }),
    getSellerBids : builder.query({
      query : () => ({
        url : `/api/v1/bids/get-seller-bids`
      }),
      keepUnusedDataFor : 5
    }),
    getProductBids : builder.query({
      query : (productId) => ({
        url : `/api/v1/bids/get-product-bids/${productId}`
      }),
      keepUnusedDataFor : 5
    }),
    getBuyerBids : builder.query({
      query : () => ({
        url : `/api/v1/bids//get-bids-Buyer`
      }),
      keepUnusedDataFor : 5
    }),
    deleteBid : builder.mutation({
      query : (id) => ({
        url : `/api/v1/bids/delete-bids/${id}`,
        method : "DELETE",
      }),
    }),
    
  
  })
})

export const {useAddBidMutation  , useGetProductBidsQuery ,
   useGetSellerBidsQuery , useGetBuyerBidsQuery , useDeleteBidMutation} = bidsApiSlice;