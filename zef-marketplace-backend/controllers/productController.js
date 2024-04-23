import asyncHandler from "../middlewares/asyncHandler.js";
import BidModel from "../models/bidModel.js";
import NotificationModel from "../models/notificationModel.js";
import ProductModel from "../models/productModel.js"
import UserModel from "../models/userModel.js";
import { cloudinaryRemoveImage, cloudinaryRemoveMultipleImage, cloudinaryUploadImage } from "../utils/cloudinary.js";
import customErrorClass from "../utils/customErrorClass.js";


 /**---------------------------------------
 * @desc    add Product
 * @route   /api/v1/products/add-product
 * @method  POST
 * @access  private 
 ----------------------------------------*/
 export const addProduct = asyncHandler(async (req , res , next) => {
const product = new ProductModel(req.body);
product.seller = req.user._id;

if (req.files ) {
  const results = [];

  for (let file of req.files) {
    const result = await cloudinaryUploadImage(file.path);
    results.push(result);
  }
let resultsObjectsArray =[];
results.map(oneResult =>
  resultsObjectsArray.push({
    url : oneResult.url,
    public_id : oneResult.public_id
  })
  )

product.images = resultsObjectsArray ;
}

await product.save();

const admins = await UserModel.find({role : 'admin'});
admins.forEach(async(admin) => {
  const adminNotification =  new NotificationModel({
    title : "New Product added",
    message : `new product has added`,
    user : admin._id,
    product : product._id,
   })
   await adminNotification.save();
});


res.status(201).json({status : "success" , product});
 })

  /**---------------------------------------
 * @desc    get All Products
 * @route   /api/v1/products/logged-seller
 * @method  GET
 * @access  public 
 ----------------------------------------*/
 export const getAllProductsForLoggedSeller = asyncHandler(async (req , res , next) => {
  // const {seller , categories=[] , age =[]} = req.body;
  // let filters ={};
  // if (seller) {
  //   filters.seller = seller;
  // }
const products = await ProductModel.find({seller : req.user._id}).sort("-createdAt").populate("category" , "_id name");
  res.status(200).json(products);
   })


  /**---------------------------------------
 * @desc    get All Products
 * @route   /api/v1/products/admin-get-products
 * @method  GET
 * @access  private 
 ----------------------------------------*/
 export const getAllProductsByAdmin = asyncHandler(async (req , res , next) => {
  const {seller , categories=[] , age =[]} = req.body;
  let filters ={};
  if (seller) {
    filters.seller = seller;
  }
const products = await ProductModel.find(filters).sort("-createdAt").populate("seller" , "_id name" ).populate("category" , "_id name");
  res.status(200).json(products);
   })



     /**---------------------------------------
 * @desc    get One Product
 * @route   /api/v1/products/get-one-product/:id
 * @method  POST
 * @access  public 
 ----------------------------------------*/
 export const getOneProduct = asyncHandler(async (req , res , next) => {
  const product = await ProductModel.findOne({_id :req.params.id})
  .populate("category" , "_id name").populate("seller" , "_id name email");
  if (!product) {
    return next(customErrorClass.create(`thers no product with this Id ${req.params.id}` , 400)) 
  }
    res.status(200).json(product);
     })
  

    /**---------------------------------------
 * @desc    update Product
 * @route   /api/v1/products/update-product/:id
 * @method  PUT
 * @access  private 
 ----------------------------------------*/
 export const updateProduct = asyncHandler(async (req , res , next) => {
  const existproduct = await ProductModel.findById(req.params.id);
  if (!existproduct) {
    return next(customErrorClass.create(`thers no product with this Id ${req.params.id}` , 400)) 
  }
  
if (existproduct.seller.toString() !== req.user._id.toString() && req.user.role !== "admin") {
  return next(customErrorClass.create(`not authorise to delete product ${req.params.id}` , 400)) 
}
const product = await ProductModel.findByIdAndUpdate(req.params.id , req.body , {new : true});

const {images} = req.body;
  
if (req.files && req.files.length > 0) {
  
  if (product.images.length > 0) {
    // Get the public ids from the images
    const public_ids = product.images?.map((image) => image.public_id)
    //  Delete all  images from cloudinary that belong to this product
  if (public_ids?.length > 0) {
    await cloudinaryRemoveMultipleImage(public_ids)
  }
  }
  
  
  
  let results = [];
  
  for (let file of req.files) {
    const result =  await cloudinaryUploadImage(file?.path);
  results.push(result);
  }
  
  let resultsArrayOfObjects = [];
   results.map(oneResult => {
  resultsArrayOfObjects.push( {
    url :  oneResult.url,
    public_id : oneResult.public_id
  })
  })
  product.images = resultsArrayOfObjects   
  } 
  
  await product.save();
  
  res.status(201).json({status : "success" , product});
   })
  

       /**---------------------------------------
 * @desc    delete Product
 * @route   /api/v1/products/delete-product/:id
 * @method  DELETE
 * @access  private 
 ----------------------------------------*/
 export const deleteProductByAdmin = asyncHandler(async (req , res , next) => {
  let product = await ProductModel.findById(req.params.id);
  if (!product) {
    return next(customErrorClass.create(`there's no product with id (${req.params.id})` , 400))
  }


if (product.images.length > 0) {
      // Get the public ids from the images
        const public_ids = product.images?.map((image) => image.public_id)
      //  Delete all  images from cloudinary that belong to this product
      if (public_ids?.length > 0) {
        await cloudinaryRemoveMultipleImage(public_ids)
      }
}

  product = await ProductModel.findByIdAndDelete(req.params.id);

  const userNotification =  new NotificationModel({
    title : "your product deleted",
    message : `your product has deleted`,
    user : product.seller,
    product : product._id,
   });

await userNotification.save();

  res.status(200).json("product deleted successfully");
 })


        /**---------------------------------------
 * @desc    delete Product by seller
 * @route   /api/v1/products/delete-product/:id
 * @method  DELETE
 * @access  private 
 ----------------------------------------*/
 export const deleteProductBySeller = asyncHandler(async (req , res , next) => {
  let product = await ProductModel.findById(req.params.id);
  if (!product) {
    return next(customErrorClass.create(`there's no product with id (${req.params.id})` , 400))
  }

  if (product.seller.toString() !== req.user._id.toString()) {
    return next(customErrorClass.create(`you can't delete product belong to another seller` , 400))
  }

 await BidModel.deleteMany({product : product});

  if (product.images.length > 0) {
    // Get the public ids from the images
      const public_ids = product.images?.map((image) => image.public_id)
    //  Delete all  images from cloudinary that belong to this product
    if (public_ids?.length > 0) {
      await cloudinaryRemoveMultipleImage(public_ids)
    }
}

product = await ProductModel.findByIdAndDelete(req.params.id);

res.status(200).json("product deleted successfully");
 });

             /**---------------------------------------
 * @desc    remove One Image for Admin
 * @route   /api/v1/products/removeimage/:id
 * @method  PUT
 * @access  private 
 ----------------------------------------*/
 export const removeOneImage = asyncHandler(async (req , res) => {
  const {publicId} = req.body;
    let product = await ProductModel.findById(req.params.id);
  
    if (!product) {
      return next(customErrorClass.create(`there's no product with id (${req.params.id})` , 400))
  }
  
  
  
  const  imageId  = product.images.find(img =>  img.public_id === publicId);
  if (!imageId) {
    return next(customErrorClass.create(`this image not exists` , 400))
  }
  
  product = await ProductModel.findOneAndUpdate({_id : req.params.id} ,{$pull :
     {images : {public_id : publicId}}} , {new : true});
  
     await cloudinaryRemoveImage(imageId.public_id);
  
  res.status(200).json(product);
   })
  


/**---------------------------------------
 * @desc   update Product To Approve By Admin
 * @route   /api/v1/products/admin-approve-product/:id
 * @method  PUT
 * @access  private  admin
 ----------------------------------------*/
 export const toggleupdateProductStatusByAdmin = asyncHandler(async (req , res) => {
    let product = await ProductModel.findById(req.params.id);
  
    if (!product) {
      return next(customErrorClass.create(`there's no product with id (${req.params.id})` , 400))
  }
if (product.status === "approved") {
  product.status = "pending";

  const userNotification =  new NotificationModel({
    title : "your product pended",
    message : `your product has pending`,
    user : product.seller,
    product : product._id,
   });
  
  await userNotification.save();

} else if (product.status === "pending")
{
  product.status = "approved";

  const userNotification =  new NotificationModel({
    title : "your product approved",
    message : `your product has approved`,
    user : product.seller,
    product : product._id,
   });
  
  await userNotification.save();
}


 await product.save();

 res.status(200).json(product);
 })




  /**---------------------------------------
 * @desc    get products
 * @route   /api/v1/products
 * @method  POST
 * @access  public 
 ----------------------------------------*/
 export const getAllProducts = asyncHandler(async (req , res) => {
  const {  category = [], age = [], status  , keyWord} = req.body  ;
  let  query = {};

  if (status === "pending" || status === "approved") {
    query.status = status;
  }

  // filter by category
  if (category.length > 0) {
    query.category = { $in: category };
  }
    // filter by age
    if ( age.length > 0) {
      age.forEach((item) => {
        const fromAge = +item.split("-")[0];
        const toAge = +item.split("-")[1];
      if (toAge >= 10) {
        query.age = { $gte: fromAge};
      } else {
        query.age = { $gte: fromAge, $lte: toAge };
      }
      });
    }

    // Add a keyword filter if provided
    if ( keyWord !== undefined) {
      query.name = { $regex: keyWord, $options: 'i' };
    }

  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const count = await ProductModel.countDocuments(query);

  const products = await ProductModel.find(query).limit(pageSize).skip(pageSize * (page - 1)).populate("category" , "_id name");
  res.status(200).json({products , page , pages : Math.ceil(count / pageSize) });

   })
  