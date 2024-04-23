import asyncHandler from "../middlewares/asyncHandler.js";
import NotificationModel from "../models/notificationModel.js";
import customErrorClass from "../utils/customErrorClass.js";


  /**---------------------------------------
 * @desc    get User Notifications
 * @route   /api/v1/notifications/getusernotifications
 * @method  GET
 * @access  public 
 ----------------------------------------*/
 export const getUserNotifications = asyncHandler(async (req , res) => {
  const notifications = await NotificationModel.find({user : req.user._id , isRead : false});
  res.status(200).json(notifications);

 });

  /**---------------------------------------
 * @desc    update Notification To Read
 * @route   /api/v1/notifications/update-notifications-to-read/:notificationId
 * @method  PUT
 * @access  public 
 ----------------------------------------*/
 export const updateNotificationToRead = asyncHandler(async (req , res , next) => {
  const notification = await NotificationModel.findById(req.params.notificationId);
  if (!notification) {
    return next(customErrorClass.create(`there's no notification with id (${req.params.notificationId})` , 400))
  }

  if (notification.user.toString() !== req.user._id.toString()) {
    return next(customErrorClass.create(`you are not authorized` , 400))
  }
notification.isRead = true;
await notification.save();
  res.status(200).json(notification);

 });