import express from "express";
import { applyJob,getAppliedJobs,getApplicants,updateStatus } from "../controllers/application.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Apply job
router.get("/apply/:id",isAuthenticated,applyJob);

// Get applied jobs
router.get("/applied",isAuthenticated,getAppliedJobs);

// Get applicants
router.get("/:id/applicants",isAuthenticated,getApplicants);

// Update status
router.post("/status/:id/update",isAuthenticated,updateStatus);

export default router;