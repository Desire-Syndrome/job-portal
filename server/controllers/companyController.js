const AsyncHandler = require('express-async-handler');

const generateToken = require('../middleware/tokenGenerate');

const { saveUploadedFile, deleteUploadedFile } = require('../middleware/multer.js');

const Company = require("../models/Company.js");
const Job = require("../models/Job.js");
const JobApplication = require("../models/JobApplication.js");


const companyRegistration = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body; // accept fields
  if (!name || !email || !password || !req.files?.logo || req.files.logo.length === 0) {
    return res.status(400).json({ message: "Missing details." });
  }
  try {
    // if company already exist
    const existCompany = await Company.findOne({ email });
    if (existCompany) {
      return res.status(400).json({ message: "Company already exists." });
    }
    // save logo, if uploaded
    const logoPath = await saveUploadedFile(req.files.logo[0], "logo");
    // create company
    const company = await Company.create({
      name, email, password,
      image: logoPath,
    });
    return res.status(201).json({
      _id: company._id, name: company.name, email: company.email,
      image: company.image, token: null,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
});

const companyLogin = AsyncHandler(async (req, res) => {
  const { email, password } = req.body; // accept fields
  try {
    const company = await Company.findOne({ email });
    if (company && (await company.matchPassword(password))) { // decode and check password
      return res.status(200).json({
        _id: company.id,
        name: company.name,
        email: company.email,
        token: generateToken(company._id), // set token
        image: company.image || null,
      })
    } else {
      return res.status(401).json({ message: "Invalid Email or Password." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
});

const getCompanyData = AsyncHandler(async (req, res) => {
  try {
    const company = req.account;
    return res.status(200).json(company);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
});

const updateCompany = AsyncHandler(async (req, res) => {

});

const deleteCompany = AsyncHandler(async (req, res) => {
  try {
    const company = await Company.findById(req.account._id);
    if (company) {
      // delete logo
      if (company.image) { await deleteUploadedFile(company.image); }
      // delete company
      await company.deleteOne();
      return res.status(200).json({ message: "Company profile deleted successfully." });
    } else {
      return res.status(404).json({ message: "Company not found." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
});

const postJob = AsyncHandler(async (req, res) => {

});

const getPostedJobs = AsyncHandler(async (req, res) => {

});

const getApplicants = AsyncHandler(async (req, res) => {

});

const changeApplicationStatus = AsyncHandler(async (req, res) => {

});

const changeJobVisibility = AsyncHandler(async (req, res) => {

});


module.exports = { companyRegistration, companyLogin, getCompanyData, updateCompany, deleteCompany, postJob, getPostedJobs, getApplicants, changeApplicationStatus, changeJobVisibility };