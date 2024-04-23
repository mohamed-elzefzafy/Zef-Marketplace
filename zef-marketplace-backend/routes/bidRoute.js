import express from "express";
import { verifyIsLoggedIn } from "../middlewares/authMiddleware.js";
import { addBid, deleteBid, getBuyerBids, getProductBids, getSellerBids } from "../controllers/bidController.js";
const router = express.Router();



router.route("/get-product-bids/:productId").get(getProductBids);
router.use(verifyIsLoggedIn);
router.route("/get-seller-bids").get(getSellerBids);
router.route("/get-bids-Buyer").get(getBuyerBids);
router.route("/add-bid/:productId").post(addBid);
router.route("/delete-bids/:bidId").delete(deleteBid);






export default router;