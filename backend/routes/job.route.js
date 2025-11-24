import express from "express";
import{postJob,getAllJobs,getJobById,getAdminJobs} from "../controllers/job.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Post job
router.post("/post",isAuthenticated,postJob);

// Get all jobs
router.get("/get",isAuthenticated,getAllJobs);

// Get job by id
router.get("/get/:id",isAuthenticated,getJobById);

// Get admin jobs
router.get("/admin/get",isAuthenticated,getAdminJobs);

export default router;