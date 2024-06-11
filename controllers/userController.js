import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Job from "../models/jobModel.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";
import { STATUS_CODES } from "http";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId }).select(
    "-password "
  );

  res.status(StatusCodes.OK).json({ user });
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
};

export const ShowUsers = async (req, res) => {
  try {
    const users = await User.find();
    res
      .status(StatusCodes.OK)
      .json({ msg: "users fetched successfully", users });
  } catch (err) {
    console.log(err);
  }
};

export const UpdateUser = async (req, res) => {
  // console.log(req.file);
  const newUser = { ...req.body };

  delete newUser.password;

  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);
  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }
  res.status(StatusCodes.OK).json({ msg: "user updated" });
};
