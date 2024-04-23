import asyncHandler from "../middlewares/asyncHandler.js";
import ProductModel from "../models/productModel.js";
import UserModel from "../models/userModel.js";
import { cloudinaryRemoveImage, cloudinaryRemoveMultipleImage, cloudinaryUploadImage } from "../utils/cloudinary.js";
import customErrorClass from "../utils/customErrorClass.js";
import generateToken from "../utils/generateToken.js";




 /**---------------------------------------
 * @desc    register user
 * @route   /api/v1/users/register
 * @method  POST
 * @access  public 
 ----------------------------------------*/
 export const register = asyncHandler(async (req , res , next) => {
const { name , email , password } = req.body;
if (!name || !email || !password) {
  return next(customErrorClass.create(`all field are required` , 400)) 
}
const userExist = await UserModel.findOne({ email : email});
if (userExist) {
  return next(customErrorClass.create(`user with this email is already exist` , 400))
}

const user = await UserModel.create({
  name : name,
  email : email,
  password : password
})

if (!user) {
  return next(customErrorClass.create(`invalid user data` , 400))
}

if (req.file) {
  // if (user.profilePhoto.public_id !== null) {
  //   await cloudinaryRemoveImage(user.profilePhoto.public_id);
  // }
  const result = await cloudinaryUploadImage(req.file.path);

  user.profilePhoto = {
    url : result.secure_url,
    public_id : result.public_id
  }

  await user.save();
}

generateToken(res , user._id);

res.status(201).json({
  _id : user._id,
  name : user.name,
  email : user.email,
  role : user.role,
  profilePhoto : user.profilePhoto,
  status : user.status ,
  loggedIn : "success"
})
 })


  /**---------------------------------------
 * @desc    login user
 * @route   /api/v1/users/login
 * @method  POST
 * @access  public 
 ----------------------------------------*/
 export const login = asyncHandler(async (req , res , next) => {
  const { email , password } = req.body;
if (!email || !password) {
  return next(customErrorClass.create(`all field are required` , 400)) 
}
let user = await UserModel.findOne({email : email});
if (!user) {
  return next(customErrorClass.create(`invalid email or password` , 401))
}
const validPassword = await user.matchPassword(password.toString());
if (!validPassword) {
  return next(customErrorClass.create(`invalid email or password` , 401))  
}

generateToken(res , user._id);

res.status(200).json({
  _id : user._id,
  name : user.name,
  email : user.email,
  role : user.role,
  profilePhoto : user.profilePhoto,
  status : user.status ,
  loggedIn : "success"
})

 })

 export const logout = asyncHandler(async (req , res) => {
  res.cookie("token" , "" , {
   httpOnly : true,
   expires : new Date(0),
  })

  res.status(200).json({message : "logged out successfully"});
})

   /**---------------------------------------
 * @desc    get LoggedUser Profile
 * @route   /api/v1/users/loggedUser
 * @method  POST
 * @access  public 
 ----------------------------------------*/
 export const getLoggedUserProfile = asyncHandler(async (req , res , next) => {
  const user = await UserModel.findById(req.user._id);
  if (!user) {
    return next(customErrorClass.create(`user not found` , 400))  
  }
  res.status(200).json({
    _id : user._id,
    name : user.name,
    email : user.email,
    role : user.role,
    profilePhoto : user.profilePhoto,
    status : user.status ,
    loggedIn : "success"
  })
 })


    /**---------------------------------------
 * @desc    get One User By Admin
 * @route   /api/v1/users/get-one-user/:id
 * @method  POST
 * @access  public 
 ----------------------------------------*/
 export const getOneUserByAdmin = asyncHandler(async (req , res , next) => {
  const user = await UserModel.findById(req.params.id);
  if (!user) {
    return next(customErrorClass.create(`user not found` , 400))  
  }

  res.status(200).json({
    _id : user._id,
    name : user.name,
    email : user.email,
    role : user.role,
    profilePhoto : user.profilePhoto,
    status : user.status ,
    loggedIn : "success"
  })
 })

     /**---------------------------------------
 * @desc    get All User
 * @route   /api/v1/users
 * @method  POST
 * @access  public 
 ----------------------------------------*/
 export const getAllUsers = asyncHandler(async (req , res , next) => {
  const users = await UserModel.find({}).sort("role");
  res.status(200).json(users);
 })


     /**---------------------------------------
 * @desc    toggle update User Status By Admin
 * @route   /api/v1/users/toggle-update-user-status/:id
 * @method  put
 * @access  public 
 ----------------------------------------*/
 export const toggleupdateUserStatusByAdmin = asyncHandler(async (req , res , next) => {
  const user = await UserModel.findById(req.params.id);
  if (!user) {
    return next(customErrorClass.create(`user not found` , 400))  
  }

if (user.status === "active") {
user.status = "blocked";
} else if (user.status === "blocked")
{
  user.status = "active";
}


await user.save();

res.status(200).json(user);
})


     /**---------------------------------------
 * @desc    delete User
 * @route   /api/v1/users/delete-user
 * @method  Delete
 * @access  private 
 ----------------------------------------*/
 export const deleteUser = asyncHandler(async (req , res , next) => {
  const user = await UserModel.findById(req.params.id);
  if (!user) {
    return next(customErrorClass.create(`user not found` , 400))  
  }

let products =   await ProductModel.find({seller : user});
for (let i = 0 ; products.length > i;  i++ ){
  if (products[i].images.length > 0) {
    // Get the public ids from the images
      const public_ids = products[i].images?.map((image) => image.public_id)
    //  Delete all  images from cloudinary that belong to this product
    if (public_ids?.length > 0) {
      await cloudinaryRemoveMultipleImage(public_ids)
    }
}

};  

   await ProductModel.deleteMany({seller : user});
await user.deleteOne();
res.status(200).json("user deleted succefully");

})
