const AsyncHandler = require('express-async-handler');

const generateToken = require('../middleware/tokenGenerate');

const { saveUploadedFile, deleteUploadedFile } = require('../middleware/multer.js');

const User = require("../models/User.js");
const Job = require("../models/Job.js");
const JobApplication = require("../models/JobApplication.js");


const userRegistration = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body; 
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing details." });
  }
  try {
    // if user already exist
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists." });
    }
    // save avatar, if uploaded
    let avatarPath = null;
    if (req.files?.avatar && req.files.avatar.length > 0) {
      avatarPath = await saveUploadedFile(req.files.avatar[0], "avatar");
    }
    // create user
    const user = await User.create({
      name, email, password, 
      image: avatarPath
    });
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: null,
      image: user.image
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Something went wrong. Please try again later."});
  }
});

const userLogin = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) { // decode and check password
      return res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id), // set token
        image: user.image || null,
        resume: user.resume || null
      })
    } else {
      return res.status(401).json({ message: "Invalid Email or Password." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message || "Something went wrong. Please try again later."});
  }
});

const getUserData = AsyncHandler(async (req, res) => {
  const user = req.account;
  try {
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message || "Something went wrong. Please try again later."});
  }
});

const updateUser = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body; 
  const user = req.account;
  try {
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.password = password || user.password;
      // change avatar
      if (req.files?.avatar && req.files.avatar.length > 0) {
        if (user.image) { await deleteUploadedFile(user.image); } // delete old 
        // save new
        const avatarPath = await saveUploadedFile(req.files.avatar[0], "avatar");
        user.image = avatarPath;
      }
      // change resume
      if (req.files?.resume && req.files.resume.length > 0) {
        if (user.resume) { await deleteUploadedFile(user.resume); } // delete old 
        // save new
        const resumePath = await saveUploadedFile(req.files.resume[0], "resume");
        user.resume = resumePath;
      }
      // update user
      const updatedUser = await user.save();
      return res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        token: generateToken(updatedUser._id), // set token
        image: updatedUser.image || null,
        resume: updatedUser.resume || null
      });
    } else {
      return res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message || "Something went wrong. Please try again later."});
  }
});

const deleteUser = AsyncHandler(async (req, res) => {
   const user = req.account;
  try {
    if (user) {
      if (user.image) { await deleteUploadedFile(user.image); } // delete avatar
      // delete user
      await user.deleteOne();
      return res.status(200).json({ message: "User profile deleted successfully." });
    } else {
      return res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message || "Something went wrong. Please try again later."});
  }
});

const applyForJob = AsyncHandler(async (req, res) => {
  const { jobId } = req.body;
  const userId = req.account._id;
	try { 
		const isApplied = await JobApplication.find({ jobId, userId });
		if (isApplied.length > 0) {
			return res.status(400).json({ message: "Already applied." });
		}
		const jobData = await Job.findById(jobId);
		if (!jobData) {
			return res.status(404).json({ message: "Job not found." });
		}
		// create application
		await JobApplication.create({
			companyId: jobData.companyId,
			userId, jobId,
			date: Date.now()
		});
		return res.status(200).json({ message: "Applied succesfully." });
	} catch (error) {
		return res.status(500).json({ message: error.message || "Something went wrong. Please try again later."});
	}
});

const getUserApplications = AsyncHandler(async (req, res) => {

});


module.exports = { userRegistration, userLogin, getUserData, updateUser, deleteUser, applyForJob, getUserApplications };