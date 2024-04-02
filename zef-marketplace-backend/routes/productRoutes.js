import express from "express";
import { addProduct, deleteProduct, getAllProducts, getOneProduct, updateProduct } from "../controllers/productController.js";
import photoUpload from "../middlewares/photoUploadMiddleWare.js";
import { verifyIsLoggedIn } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/").get(getAllProducts);
router.route("/get-one-product/:id").get(getOneProduct);
router.use(verifyIsLoggedIn);
router.route("/add-product").post( photoUpload.array("images") , addProduct);
router.route("/update-product/:id").put( photoUpload.array("images") , updateProduct);
router.route("/delete-product/:id").delete(deleteProduct);


export default router;