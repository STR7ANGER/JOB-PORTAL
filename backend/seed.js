import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { User } from "./models/user.model.js";
import { Company } from "./models/company.model.js";
import { Job } from "./models/job.model.js";
import bcryptjs from "bcryptjs";

// Get directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

// Read data from JSON file
const loadData = () => {
  try {
    const dataPath = path.join(__dirname, "data.json");
    const data = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading data.json:", error);
    process.exit(1);
  }
};

// Seed function
const seedDatabase = async () => {
  try {
    // Load data
    const data = loadData();
    console.log("Data loaded from data.json");

    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log("Clearing existing data...");
    await Job.deleteMany({});
    await Company.deleteMany({});
    // Delete seed recruiters if they exist
    for (const recruiterData of data.recruiters) {
      await User.deleteOne({ email: recruiterData.email });
    }
    console.log("Existing data cleared");

    // Create recruiter users
    console.log("Creating recruiter users...");
    const recruiters = [];
    const hashedPassword = await bcryptjs.hash("password", 10);
    for (const recruiterData of data.recruiters) {
      const recruiter = await User.create({
        fullname: recruiterData.fullname,
        email: recruiterData.email,
        phoneNumber: recruiterData.phoneNumber,
        password: hashedPassword,
        role: recruiterData.role,
      });
      recruiters.push(recruiter);
      console.log(`Recruiter created: ${recruiter.email}`);
    }
    console.log(`Created ${recruiters.length} recruiters`);

    // Create companies
    console.log("Creating companies...");
    const companies = [];
    const companyToRecruiterMap = new Map(); // Map to track which recruiter owns which company
    for (const companyData of data.companies) {
      const recruiter = recruiters[companyData.recruiterIndex];
      if (!recruiter) {
        console.error(`Recruiter index ${companyData.recruiterIndex} not found for company: ${companyData.name}`);
        continue;
      }
      const company = await Company.create({
        name: companyData.name,
        description: companyData.description,
        website: companyData.website,
        location: companyData.location,
        userId: recruiter._id,
      });
      companies.push(company);
      companyToRecruiterMap.set(company._id.toString(), recruiter);
      console.log(`Company created: ${company.name} (owned by ${recruiter.email})`);
    }
    console.log(`Created ${companies.length} companies`);

    // Create jobs
    console.log("Creating jobs...");
    let jobCount = 0;
    for (const jobData of data.jobs) {
      const company = companies[jobData.companyIndex];
      if (!company) {
        console.error(`Company index ${jobData.companyIndex} not found for job: ${jobData.title}`);
        continue;
      }

      // Get the recruiter who owns this company
      const companyRecruiter = companyToRecruiterMap.get(company._id.toString());
      if (!companyRecruiter) {
        console.error(`Recruiter not found for company: ${company.name}`);
        continue;
      }

      const job = await Job.create({
        title: jobData.title,
        description: jobData.description,
        requirements: jobData.requirements.split(",").map((req) => req.trim()),
        salary: jobData.salary,
        location: jobData.location,
        jobType: jobData.jobType,
        experience: jobData.experience,
        position: jobData.position,
        company: company._id,
        created_by: companyRecruiter._id,
        applications: [],
      });
      jobCount++;
      console.log(`Job created: ${job.title} at ${company.name}`);
    }
    console.log(`Created ${jobCount} jobs`);

    console.log("\n✅ Database seeded successfully!");
    console.log(`📊 Summary:`);
    console.log(`   - ${recruiters.length} Recruiter users created`);
    console.log(`   - ${companies.length} Companies created`);
    console.log(`   - ${jobCount} Jobs created`);
    console.log(`\n📧 Recruiter Login Credentials:`);
    recruiters.forEach((recruiter, index) => {
      console.log(`   ${index + 1}. Email: ${recruiter.email}, Password: password`);
    });

    // Close database connection
    await mongoose.connection.close();
    console.log("Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

// Run seed function
const runSeed = async () => {
  await connectDB();
  await seedDatabase();
};

runSeed();

