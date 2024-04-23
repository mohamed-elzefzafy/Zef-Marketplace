import mongoose from "mongoose";


const NotificationSchema = new mongoose.Schema({
title : {
  type : String,
  required : true
},
message : {
  type : String,
  required : true
},
// onClick : {
//   type : String,
//   required : true
// },
product :{
  type : String,
},
isRead :{
  type : Boolean,
  default : false
},
user :{
  type : mongoose.Schema.Types.ObjectId,
  ref : "User",
},
},{timestamps : true});

const NotificationModel = mongoose.model("Notification" , NotificationSchema);
export default NotificationModel;