import { User } from "../models/user.model.js";
import bycript from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    //req body
    const { fullname, email, phoneNumber, password, role } = req.body;
    //validation
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required.", success: false });
    }
    //check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "Email is already registered.", success: false });
    }
    const hashedPassword = await bycript.hash(password, 10);
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });
    return res
      .status(201)
      .json({ message: "User registered successfully.", success: true });
  } catch (error) {
    console.error("Error in user registration:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    //validation
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required.", success: false });
    }
    //check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found.", success: false });
    }
    const isPasswordValid = await bycript.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Invalid password.", success: false });
    }
    if (role !== user.role) {
      return res.status(401).json({
        message: "Unauthorized access for this role.",
        success: false,
      });
    }
    const tokenData = {
      id: user._id,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({ message: "Login successful.", user, success: true });
  } catch (error) {
    console.error("Error in user login:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
      })
      .json({ message: "Logout successful.", success: true });
  } catch (error) {
    console.error("Error in user logout:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body || {};
    let skillsArray = [];
    if(skills){
      skillsArray = skills.split(",");
    }
    const userId = req.id;
    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found.", success: false });
    }
    // ensure nested profile object exists before updating nested fields
    if (!user.profile) {
      user.profile = {};
    }
    // update fields
    if(fullname){
      user.fullname = fullname;
    }
    if(email){
      user.email = email;
    }
    if(phoneNumber){
      user.phoneNumber = phoneNumber;
    }
    if(bio){
      user.profile.bio = bio;
    }
    if(skills){
      user.profile.skills = skillsArray;
    }
    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .json({
        message: "Profile updated successfully.",
        user,
        success: true,
      });
  } catch (error) {
    console.error("Error in updating profile:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};
