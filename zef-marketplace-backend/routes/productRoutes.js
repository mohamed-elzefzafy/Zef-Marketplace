import express from "express";
import { addProduct, deleteProduct, getAllProducts, getAllProductsByAdmin, getAllProductsForLoggedSeller, getOneProduct, removeOneImage, toggleupdateProductStatusByAdmin, updateProduct } from "../controllers/productController.js";
import photoUpload from "../middlewares/photoUploadMiddleWare.js";
import { verifyIsAdmin, verifyIsLoggedIn } from "../middlewares/authMiddleware.js";
const router = express.Router();


router.route("/").post(getAllProducts);
router.route("/get-one-product/:id").get(getOneProduct);
router.use(verifyIsLoggedIn);
router.route("/logged-seller").get(getAllProductsForLoggedSeller);
router.route("/add-product").post( photoUpload.array("images") , addProduct);
router.route("/update-product/:id").put( photoUpload.array("images") , updateProduct);
router.route("/delete-product/:id").delete(deleteProduct);
router.route("/removeimage/:id").put( removeOneImage); 
router.use(verifyIsAdmin);
router.route("/admin-get-product").get(getAllProductsByAdmin);
router.route("/admin-toggle-product-status/:id").put(toggleupdateProductStatusByAdmin);

export default router;