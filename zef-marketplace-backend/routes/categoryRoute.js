import express from "express";
 import { createCategory, deleteCategory, getAllCategories, getOneCategory } from './../controllers/categoryController.js';
import { verifyIsAdmin, verifyIsLoggedIn } from "../middlewares/authMiddleware.js";
import photoUpload from "../middlewares/photoUploadMiddleWare.js";
const router = express.Router();



router.route("/").get(getAllCategories);

router.use(verifyIsLoggedIn);
router.use(verifyIsAdmin);
router.route("/").post(photoUpload.single("image") , createCategory);
router.route("/:id").get( getOneCategory);
router.route("/:categoryId").delete(deleteCategory);





export default router;