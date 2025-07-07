const AsyncHandler = require('express-async-handler');

const generateToken = require('../middleware/tokenGenerate');

const { saveUploadedFile, deleteUploadedFile } = require('../middleware/multer.js');

const User = require("../models/User.js");
const Job = require("../models/Job.js");
const JobApplication = require("../models/JobApplication.js");


// userRegistration
const userRegistration = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing details." });
  }
  const existUser = await User.findOne({ email });
  if (existUser) {
    return res.status(400).json({ message: "User already exists." });
  }

  let avatarPath = null;
  if (req.files?.avatar && req.files.avatar.length > 0) {
    avatarPath = await saveUploadedFile(req.files.avatar[0], "avatar");
  }

  const user = await User.create({
    name, email, password,
    image: avatarPath
  });
  return res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: null,
    image: user.image || null,
    resume: null
  });
});


// userLogin
const userLogin = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    return res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      image: user.image || null,
      resume: user.resume || null
    })
  } else {
    return res.status(401).json({ message: "Invalid Email or Password." });
  }
});


// updateUser
const updateUser = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = req.account;

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    if(password){
      user.password = password
    }

    if (req.files?.avatar && req.files.avatar.length > 0) {
      if (user.image) {
        await deleteUploadedFile(user.image);
      }
      const avatarPath = await saveUploadedFile(req.files.avatar[0], "avatar");
      user.image = avatarPath;
    }
    if (req.files?.resume && req.files.resume.length > 0) {
      if (user.resume) {
        await deleteUploadedFile(user.resume);
      }
      const resumePath = await saveUploadedFile(req.files.resume[0], "resume");
      user.resume = resumePath;
    }

    const updatedUser = await user.save();
    return res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
      image: updatedUser.image,
      resume: updatedUser.resume
    });
  } else {
    return res.status(404).json({ message: "User not found." });
  }
});


// deleteUser
const deleteUser = AsyncHandler(async (req, res) => {
  const user = req.account;

  if (user) {
    if (user.image) {
      await deleteUploadedFile(user.image);
    }

    await user.deleteOne();
    return res.status(200).json({ message: "User profile deleted successfully." });
  } else {
    return res.status(404).json({ message: "User not found." });
  }
});


// applyForJob
const applyForJob = AsyncHandler(async (req, res) => {
  const { jobId } = req.body;
  const userId = req.account._id;

  const isApplied = await JobApplication.find({ jobId, userId });
  if (isApplied.length > 0) {
    return res.status(400).json({ message: "Already applied." });
  }

  const jobData = await Job.findById(jobId);
  if (!jobData) {
    return res.status(404).json({ message: "Job not found." });
  }

  await JobApplication.create({
    companyId: jobData.companyId,
    userId, jobId,
    date: Date.now()
  });
  return res.status(200).json({ message: "Applied succesfully." });
});


// getUserApplications
const getUserApplications = AsyncHandler(async (req, res) => {
  const userId = req.account._id;

  const applications = await JobApplication.find({ userId })
    .populate('companyId', 'name email image')
    .populate('jobId', 'title description location category level salary');

  if (applications.length === 0) {
    return res.status(404).json({ success: false, message: 'No job applications found for this user.' });
  }

  res.json({ success: true, applications });
});


module.exports = { userRegistration, userLogin, updateUser, deleteUser, applyForJob, getUserApplications };