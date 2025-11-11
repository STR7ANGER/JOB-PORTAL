import express from "express";
import { register,login,logout,updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// User registration
router.post("/register", register);

// User login
router.post("/login", login);

// User logout
router.get("/logout", logout);

// Update user profile
router.put("/profile/update",isAuthenticated,updateProfile);

export default router;