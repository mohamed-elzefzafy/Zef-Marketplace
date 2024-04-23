import express from "express";
import { getUserNotifications, updateNotificationToRead } from "../controllers/notificationController.js";
import { verifyIsLoggedIn } from "../middlewares/authMiddleware.js";
const router = express.Router();



router.use(verifyIsLoggedIn);
router.route("/getusernotifications").get(getUserNotifications);
router.route("/update-notifications-to-read/:notificationId").put(updateNotificationToRead);



export default router;