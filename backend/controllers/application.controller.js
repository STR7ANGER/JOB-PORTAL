import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res
        .status(400)
        .json({ message: "Job ID is required.", success: false });
    }
    //checking is user already applied or not
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job.",
        success: false,
      });
    }
    //check if the job exisit
    const job = await Job.findById(jobId);
    if (!job) {
      return res
        .status(404)
        .json({ message: "Job not found.", success: false });
    }
    // Get user's resume from profile
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found.", success: false });
    }
    // Check if user has a resume uploaded
    if (!user.profile?.resume) {
      return res.status(400).json({
        message: "Please upload your resume in your profile before applying.",
        success: false,
      });
    }
    //create a new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
      resumeUrl: user.profile.resume,
    });
    job.applications.push(newApplication._id);
    await job.save();
    
    // Fetch the updated job with populated applications
    const updatedJob = await Job.findById(jobId)
      .populate({ path: "company" })
      .populate({
        path: "applications",
        populate: { path: "applicant", select: "_id fullname email" },
      });
    
    return res.status(201).json({
      message: "Application submitted successfully.",
      newApplication,
      job: updatedJob,
      success: true,
    });
  } catch (error) {
    console.error("Error in applying job:", error);
    return res
      .status(500)
      .json({ 
        message: "Internal Server Error", 
        success: false,
      });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;

    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
      })
      .populate({
        path: "job.company",
        options: { sort: { createdAt: -1 } },
      });

    if (!applications.length) {
      return res.status(404).json({
        message: "No applications found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Applications fetched successfully.",
      applications,
      success: true,
    });
  } catch (error) {
    console.error("Error in getting applied jobs:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: { path: "applicant", options: { sort: { createdAt: -1 } } },
    });
    if (!job) {
      return res
        .status(404)
        .json({ message: "Job not found.", success: false });
    }
    return res.status(200).json({
      message: "Applicants fetched successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.error("Error in getting applicants:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res
        .status(400)
        .json({ message: "Status is required.", success: false });
    }
    //find application by applicantion id
    const application = await Application.findById({ _id: applicationId });
    if (!application) {
      return res
        .status(404)
        .json({ message: "Application not found.", success: false });
    }
    //update status
    application.status = status.toLowerCase();
    await application.save();
    return res
      .status(200)
      .json({
        message: "Status updated successfully.",
        application,
        success: true,
      });
  } catch (error) {
    console.error("Error in updating status:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};
