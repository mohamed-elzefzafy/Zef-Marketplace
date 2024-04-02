import asyncHandler from "../middlewares/asyncHandler.js";
import ProductModel from "../models/productModel.js"
import { cloudinaryRemoveMultipleImage, cloudinaryUploadImage } from "../utils/cloudinary.js";
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

res.status(201).json({status : "success" , product});
 })

  /**---------------------------------------
 * @desc    get All Products
 * @route   /api/v1/products
 * @method  POST
 * @access  public 
 ----------------------------------------*/
 export const getAllProducts = asyncHandler(async (req , res , next) => {
const products = await ProductModel.find({});
  res.status(200).json(products);
   })

     /**---------------------------------------
 * @desc    get One Product
 * @route   /api/v1/products/get-one-product/:id
 * @method  POST
 * @access  public 
 ----------------------------------------*/
 export const getOneProduct = asyncHandler(async (req , res , next) => {
  const product = await ProductModel.findOne({_id :req.params.id});
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
 export const deleteProduct = asyncHandler(async (req , res , next) => {
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

  res.status(200).json("product deleted successfully");
 })