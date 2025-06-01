const AsyncHandler = require('express-async-handler');

const generateToken = require('../middleware/tokenGenerate');

const { saveUploadedFile, deleteUploadedFile } = require('../middleware/multer.js');

const User = require("../models/User.js");
const Job = require("../models/Job.js");
const JobApplication = require("../models/JobApplication.js");


const userRegistration = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body; // accept fields
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
      image: avatarPath,
    });
    return res.status(201).json({
      _id: user._id, name: user.name, email: user.email,
      image: user.image, token: null,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
});

const userLogin = AsyncHandler(async (req, res) => {
		const { email, password } = req.body; // accept fields
    try {
		const user = await User.findOne({ email }); 
		if (user && (await user.matchPassword(password))) { // decode and check password
			return res.status(200).json({  
				_id: user.id,
				name: user.name,
				email: user.email,
				token: generateToken(user._id), // set token
				image: user.image || null,
			})
		} else {
			return res.status(401).json({ message: "Invalid Email or Password." });
		}
    } catch (error) {
    return res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
});

const getUserData = AsyncHandler(async (req, res) => {
  try {
    const user = req.account;
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
});

const updateUser = AsyncHandler(async (req, res) => {

});

const deleteUser = AsyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.account._id);
    if (user) {
      // delete avatar
      if (user.image) { await deleteUploadedFile(user.image); }
      // delete user
      await user.deleteOne();
      return res.status(200).json({ message: "User profile deleted successfully." });
    } else {
      return res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
});

const applyForJob = AsyncHandler(async (req, res) => {

});

const getUserApplications = AsyncHandler(async (req, res) => {

});


module.exports = { userRegistration, userLogin, getUserData, updateUser, deleteUser, applyForJob, getUserApplications };