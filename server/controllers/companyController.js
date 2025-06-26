const AsyncHandler = require('express-async-handler');

const generateToken = require('../middleware/tokenGenerate');

const { saveUploadedFile, deleteUploadedFile } = require('../middleware/multer.js');

const Company = require("../models/Company.js");
const Job = require("../models/Job.js");
const JobApplication = require("../models/JobApplication.js");


const companyRegistration = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password || !req.files?.logo || req.files.logo.length === 0) {
    return res.status(400).json({ message: "Missing details." });
  }
  const existCompany = await Company.findOne({ email });
  if (existCompany) {
    return res.status(400).json({ message: "Company already exists." });
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


const updateCompany = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body; 
  const company = req.account;

  if (company) {
    company.name = name || company.name;
    company.email = email || company.email;
    company.password = password || company.password;

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


const postJob = AsyncHandler(async (req, res) => {
  const { title, description, location, salary, level, category } = req.body;
  const companyId = req.account._id;

  if (!title || !description || !location || !salary || !level || !category) {
    return res.status(400).json({ message: "Missing details." });
  }

  const job = new Job({
    title, description, location, salary, level, category, companyId,
    date: Date.now()
  })
  await job.save();
  res.status(200).json({ job });
});


const getPostedJobs = AsyncHandler(async (req, res) => {

});


const getApplicants = AsyncHandler(async (req, res) => {

});


const changeApplicationStatus = AsyncHandler(async (req, res) => {

});


const changeJobVisibility = AsyncHandler(async (req, res) => {

});


module.exports = { companyRegistration, companyLogin, updateCompany, deleteCompany, postJob, getPostedJobs, getApplicants, changeApplicationStatus, changeJobVisibility };