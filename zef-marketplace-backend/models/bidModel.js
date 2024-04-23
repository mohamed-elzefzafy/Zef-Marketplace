import mongoose from "mongoose";


const BidSchema = new mongoose.Schema({
  product :{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Product",
  },
  seller :{
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
  },
  buyer :{
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
  },
  bidAmount : {
      type : Number,
      required : true,
    },
  message : {
      type : String,
    },
  mobile : {
      type : String,
    },
  
},{timestamps:true});


const BidModel = mongoose.model("Bid" , BidSchema);
export default BidModel;