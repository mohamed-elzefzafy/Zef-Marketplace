import { apiSlice } from "./apiSlice";




export const notificationsApiSlice = apiSlice.injectEndpoints({
  endpoints : (builder) => ({
    getUserNotifications : builder.query({
      query : () => ({
        url : `/api/v1/notifications/getusernotifications`
      }),
      keepUnusedDataFor : 5
    }),
    updateNotificationToRead : builder.mutation({
      query : (id) => ({
        url : `/api/v1/notifications/update-notifications-to-read/${id}`,
        method : "PUT",
      }),
    }),
  
  })
})


export const {useGetUserNotificationsQuery , useUpdateNotificationToReadMutation} = notificationsApiSlice;