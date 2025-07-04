import express from "express";
import { register, login,logout, getUserProfile, updateProfile } from "../controllers/userController.js";
import isAuthenticated  from "../middlewares/isAuthenticated.js";
import upload  from "../utils/multer.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// protected route
router.get("/my-profile", isAuthenticated, getUserProfile);
router.put("/update-profile", isAuthenticated, upload.single("profilePhoto"), updateProfile);


export default router;