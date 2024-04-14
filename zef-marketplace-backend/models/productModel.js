import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema({
  name : {
    type: String,
    required: true,
  },
  description : {
    type: String,
    required: true,
  },
  price : {
    type: Number,
    required: true,
  },
  category : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Category",
    required : true,
  },
  age : {
    type: Number,
    required: true,
  },
  images : [],
  billAvailable : {
    type: Boolean,
    default: false,
    required: true,
  },
  warrantyAvailable : {
    type: Boolean,
    default: false,
    required: true,
  },
  accessoriesAvailable : {
    type: Boolean,
    default: false,
    required: true,
  },
  boxAvailable : {
    type: Boolean,
    default: false,
    required: true,
  },
  seller : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
    required: true,
  },
  status : {
  type: String,
  enum :["pending", "approved"],
  default : "pending",
  required: true,
  }
} , {timestamps: true})





const ProductModel = mongoose.model("Product" , ProductSchema);

export default ProductModel;