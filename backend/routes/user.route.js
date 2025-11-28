import express from "express";
import { register,login,logout,updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload, profileUpload } from "../middlewares/multer.js";

const router = express.Router();

// User registration
router.post("/register", singleUpload, register);

// User login
router.post("/login", login);

// User logout
router.get("/logout", logout);

// Update user profile
router.put("/profile/update", isAuthenticated, profileUpload, updateProfile);

export default router;