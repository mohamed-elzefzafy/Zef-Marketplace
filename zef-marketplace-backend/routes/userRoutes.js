import express from "express";
import { getLoggedUserProfile, login, register } from "../controllers/userController.js";
import photoUpload from './../middlewares/photoUploadMiddleWare.js';
import { verifyIsLoggedIn } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/register").post( photoUpload.single("profilePhoto") , register);
router.route("/login").post( login);

router.use(verifyIsLoggedIn);
router.route("/loggedUser").get(getLoggedUserProfile)

export default router;