import asyncHandler from "../middlewares/asyncHandler.js"
import BidModel from "../models/bidModel.js"
import NotificationModel from "../models/notificationModel.js";
import ProductModel from "../models/productModel.js";
import UserModel from "../models/userModel.js";
import customErrorClass from "../utils/customErrorClass.js";

     /**---------------------------------------
 * @desc    add Bid
 * @route   /api/v1/bids/add-bid/:productId
 * @method  POST
 * @access  public 
 ----------------------------------------*/
 export const addBid = asyncHandler(async (req , res , next) => {
  const {bidAmount , message , mobile } = req.body;
  if (!bidAmount ) {
    return next(customErrorClass.create(`bid amount is required` , 400))
  }

  const currentProduct =await ProductModel.findById(req.params.productId);
  if (!currentProduct ) {
    return next(customErrorClass.create(`thers no product with this Id ${req.params.productId}` , 400)) 
  }

  if (currentProduct.status === "pending" ) {
    return next(customErrorClass.create(`you can't make a bid for pending product` , 400)) 
  }

  if (currentProduct.seller.toString() === req.user._id.toString()) {
    return next(customErrorClass.create(`you can't make a bid to your product` , 400));
  }
  const bid = await BidModel.create({
    bidAmount , message , mobile ,
    buyer : req.user._id,
    seller : currentProduct.seller,
    product : req.params.productId,
  })

  const userNotification =  new NotificationModel({
    title : "you got new bid",
    message : `you got new bid`,
    user : currentProduct.seller,
    product : currentProduct._id,
   });
  
  await userNotification.save();

res.status(201).json({bid , message : "bid added successfully"});
 })

      /**---------------------------------------
 * @desc    get Seller Bids
 * @route   /api/v1/bids/get-bids-seller
 * @method  GET
 * @access  public 
 ----------------------------------------*/
 export const getSellerBids = asyncHandler(async (req , res , next) => {
  const bids = await BidModel.find({seller : req.user._id})
  .populate("seller" , "_id name").populate("product" , "_id name price").populate("buyer" , "_id name email");

  res.status(200).json(bids);
 })


       /**---------------------------------------
 * @desc    get Product Bids
 * @route   /api/v1/bids/get-product-bids/:productId
 * @method  GET
 * @access  public 
 ----------------------------------------*/
 export const getProductBids = asyncHandler(async (req , res , next) => {
  const product =await ProductModel.findById(req.params.productId);
  if (!product) {
    return next(customErrorClass.create(`thers no product with this Id ${req.params.productId}` , 400)) 
  }

  const bids = await BidModel.find({product : req.params.productId})
  .populate("seller" , "_id name").populate("product" , "_id name price").populate("buyer" , "_id name email");
  
  res.status(200).json(bids);
 })


 
      /**---------------------------------------
 * @desc    get Buyer Bids
 * @route   /api/v1/bids/get-bids-Buyer
 * @method  GET
 * @access  public 
 ----------------------------------------*/
 export const getBuyerBids = asyncHandler(async (req , res , next) => {
  const bids = await BidModel.find({buyer : req.user._id})
  .populate("seller" , "_id name").populate("product" , "_id name price").populate("buyer" , "_id name email");

  res.status(200).json(bids);
 })


       /**---------------------------------------
 * @desc    get Product Bids
 * @route   /api/v1/bids/delete-bids/:bidId
 * @method  DELETE
 * @access  private 
 ----------------------------------------*/
 export const deleteBid = asyncHandler(async (req , res , next) => {
const bid = await BidModel.findById(req.params.bidId);
if (!bid) {
  return next(customErrorClass.create(`there's no bid with id (${req.params.bidId})` , 400));
}
if (bid.seller.toString() !== req.user._id.toString() && bid.buyer.toString() !== req.user._id.toString()) {
  return next(customErrorClass.create(`you can't delete this bid` , 400));
}
await bid.deleteOne();
res.status(200).json("bid deleted successfully");
 })