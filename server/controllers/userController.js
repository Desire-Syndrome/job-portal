const AsyncHandler = require('express-async-handler');

const deleteUploads = require("../middleware/deleteUploads.js");

const User = require("../models/User.js");
const Job = require("../models/Job.js");
const JobApplication = require("../models/JobApplication.js");


const userRegistration = AsyncHandler(async (req, res) => {
	const { name, email, password } = req.body; // accept fields
	if (!name || !email || !password) { 
		deleteUploads(req, ["avatar"]);
		return res.status(400).json({ message: "Missing details." }); 
	}
	try {
		// if user already exist
		const existUser = await User.findOne({ email });
		if (existUser) {
			deleteUploads(req, ["avatar"]); 
			return res.status(400).json({ message: "User already exists." });
		}
		// avatar path
		let avatarPath = null;
		if (req.files?.avatar && req.files.avatar.length > 0) { avatarPath = `/uploads/avatars/${req.files.avatar[0].filename}`; }
		// create user
		const user = await User.create({
			name, email, password,
			image: avatarPath
		});
		return res.status(201).json({
			_id: user._id, name: user.name, email: user.email,
			image: user.image || null, token: null,
		});
	} catch (error) {
		deleteUploads(req, ["avatar"]); 
		return res.status(500).json({ message: "Something went wrong. Please try again later." });
	}
});

const userLogin = async (req, res) => {

}

const getUserData = async (req, res) => {

}

const updateUser = async (req, res) => {

}

const deleteUser = async (req, res) => {

}

const applyForJob = async (req, res) => {

}

const getUserApplications = async (req, res) => {

}


module.exports = { userRegistration, userLogin, getUserData, updateUser, deleteUser, applyForJob, getUserApplications };