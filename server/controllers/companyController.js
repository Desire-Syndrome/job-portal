const AsyncHandler = require('express-async-handler');

const generateToken = require('../middleware/tokenGenerate');

const { saveUploadedFile, deleteUploadedFile } = require('../middleware/multer.js');

const Company = require("../models/Company.js");
const Job = require("../models/Job.js");
const JobApplication = require("../models/JobApplication.js");


// companyRegistration
const companyRegistration = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password || !req.files?.logo || req.files.logo.length === 0) {
    return res.status(400).json({ message: "Missing details." });
  }
  const existCompany = await Company.findOne({ email });
  if (existCompany) {
    return res.status(400).json({ message: "Company already exists." });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long." });
  }
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message: "Password must contain at least one uppercase letter and one number."
    });
  }

  const logoPath = await saveUploadedFile(req.files.logo[0], "logo");

  const company = await Company.create({
    name, email, password,
    image: logoPath
  });
  return res.status(201).json({
    _id: company._id,
    name: company.name,
    email: company.email,
    token: null,
    image: company.image
  });
});


// companyLogin
const companyLogin = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const company = await Company.findOne({ email });
  if (company && (await company.matchPassword(password))) {
    return res.status(200).json({
      _id: company.id,
      name: company.name,
      email: company.email,
      token: generateToken(company._id),
      image: company.image
    })
  } else {
    return res.status(401).json({ message: "Invalid Email or Password." });
  }
});


// updateCompany
const updateCompany = AsyncHandler(async (req, res) => {
  const { name, email, oldPassword, newPassword } = req.body;
  const company = await Company.findById(req.account._id);

  if (company) {
    company.name = name || company.name;

    const existCompany = await Company.findOne({ email });
    if (existCompany && existCompany._id.toString() !== company._id.toString()) {
      return res.status(400).json({ message: "Company already exists." });
    } else {
      company.email = email || company.email;
    }

    if (newPassword) {
      if (!oldPassword) {
        return res.status(400).json({ message: "Please provide old password." });
      }
      if (newPassword.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long." });
      }
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;
      if (!passwordRegex.test(newPassword)) {
        return res.status(400).json({
          message: "Password must contain at least one uppercase letter and one number."
        });
      }
      const isMatch = await company.matchPassword(oldPassword);
      if (!isMatch) {
        return res.status(401).json({ message: "Old password is incorrect." });
      }
      company.password = newPassword;
    }

    if (req.files?.logo && req.files.logo.length > 0) {
      if (company.image) {
        await deleteUploadedFile(company.image);
      }
      const logoPath = await saveUploadedFile(req.files.logo[0], "logo");
      company.image = logoPath;
    }

    const updatedCompany = await company.save();
    return res.status(200).json({
      _id: updatedCompany._id,
      name: updatedCompany.name,
      email: updatedCompany.email,
      token: generateToken(updatedCompany._id),
      image: updatedCompany.image
    });
  } else {
    return res.status(404).json({ message: "Company not found." });
  }
});


// deleteCompany
const deleteCompany = AsyncHandler(async (req, res) => {
  const company = req.account;

  if (company) {
    if (company.image) {
      await deleteUploadedFile(company.image);
    }

    await company.deleteOne();
    return res.status(200).json({ message: "Company profile deleted successfully." });
  } else {
    return res.status(404).json({ message: "Company not found." });
  }
});


// postJob
const postJob = AsyncHandler(async (req, res) => {
  const { title, description, location, salary, level, category } = req.body;
  const companyId = req.account._id;

  if (!title || !location || !salary || !level || !category) {
    return res.status(400).json({ message: "Missing details." });
  }
  if (description.replace(/<(.|\n)*?>/g, '').trim().length === 0) { // catch empty data from quill editor
    return res.status(400).json({ message: "Missing details." });
  }

  const job = new Job({
    title, description, location, salary, level, category, companyId,
    date: Date.now()
  })
  await job.save();
  res.status(200).json({ job });
});


// getPostedJobs
const getPostedJobs = AsyncHandler(async (req, res) => {
  const companyId = req.account._id;

  const jobs = await Job.find({ companyId });
  if (jobs) {
    const jobsWithApplicants = await Promise.all(
      jobs.map(async (job) => {
        const applicants = await JobApplication.find({ jobId: job._id });
        return { ...job.toObject(), applicants: applicants.length };
      })
    );
    res.status(200).json({ jobs: jobsWithApplicants })
  } else {
    return res.status(404).json({ message: "Jobs not found." });
  }
});


// getApplicants
const getApplicants = AsyncHandler(async (req, res) => {
  const companyId = req.account._id;

  const applications = await JobApplication.find({ companyId })
    .populate('userId', 'name resume image')
    .populate('jobId', 'title description location category level salary');
  return res.status(200).json({ applications });
});


// changeApplicationStatus
const changeApplicationStatus = AsyncHandler(async (req, res) => {
  const { id, status } = req.body;
  const companyId = req.account._id;

  const application = await JobApplication.findById(id);

  if (!application) {
    return res.status(404).json({ message: "Application not found." });
  }
  if (application.companyId.toString() !== companyId.toString()) {
    return res.status(403).json({ message: "No permission to update application status." });
  }

  application.status = status;
  await application.save();
  res.status(200).json({ message: "Application status changed." });
});


// changeJobVisibility
const changeJobVisibility = AsyncHandler(async (req, res) => {
  const { id } = req.body;
  const companyId = req.account._id;

  const job = await Job.findById(id);

  if (!job) {
    return res.status(404).json({ message: "Job not found." });
  }
  if (job.companyId.toString() !== companyId.toString()) {
    return res.status(403).json({ message: "No permission to change job visibility." });
  }

  job.visible = !job.visible;
  await job.save();
  res.json({ message: "Job visibility changed." });
});


module.exports = { companyRegistration, companyLogin, updateCompany, deleteCompany, postJob, getPostedJobs, getApplicants, changeApplicationStatus, changeJobVisibility };