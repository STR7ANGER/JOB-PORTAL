import { Company } from "../models/company.model.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res
        .status(400)
        .json({ message: "Company name is required.", success: false });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res
        .status(400)
        .json({ message: "Company already exists.", success: false });
    }
    company = await Company.create({
      name: companyName,
      userId: req.id,
    });
    return res.status(201).json({
      message: "Company registered successfully.",
      company,
      success: true,
    });
  } catch (error) {
    console.error("Error in registering company:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });
    if (!companies) {
      return res
        .status(404)
        .json({ message: "No companies found.", success: false });
    }
    return res.status(200).json({
      message: "Companies fetched successfully.",
      companies,
      success: true,
    });
  } catch (error) {
    console.error("Error in getting company:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const comapnyId = req.params.id;
    const company = await Company.findById(comapnyId);
    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found.", success: false });
    }
    return res
      .status(200)
      .json({
        message: "Company fetched successfully.",
        company,
        success: true,
      });
  } catch (error) {
    console.error("Error in getting company by id:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    const updatedData = { name, description, website, location };
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found.", success: false });
    }
    return res
      .status(200)
      .json({
        message: "Company updated successfully.",
        company,
        success: true,
      });
  } catch (error) {
    console.error("Error in updating company:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};
