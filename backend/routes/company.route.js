import express from "express";
import { registerCompany,getCompany,getCompanyById,updateCompany } from "../controllers/company.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Register company
router.post("/register",isAuthenticated,registerCompany);

// Get all companies
router.get("/get",isAuthenticated,getCompany);

// Get company by id
router.get("/get/:id",isAuthenticated,getCompanyById);

// Update company
router.put("/update/:id",isAuthenticated,updateCompany);

export default router;