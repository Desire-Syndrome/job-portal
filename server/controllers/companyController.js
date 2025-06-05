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
  try {
    // if company already exist
    const existCompany = await Company.findOne({ email });
    if (existCompany) {
      return res.status(400).json({ message: "Company already exists." });
    }
    // save logo 
    const logoPath = await saveUploadedFile(req.files.logo[0], "logo");
    // create company
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
  } catch (error) {
    return res.status(500).json({ message: error.message || "Something went wrong. Please try again later."});
  }
});

const companyLogin = AsyncHandler(async (req, res) => {
  const { email, password } = req.body; 
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
    return res.status(500).json({ message: error.message || "Something went wrong. Please try again later."});
  }
});

const getCompanyData = AsyncHandler(async (req, res) => {
  const company = req.account;
  try {
    return res.status(200).json(company);
  } catch (error) {
    return res.status(500).json({ message: error.message || "Something went wrong. Please try again later."});
  }
});

const updateCompany = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body; // accept fields
  const company = req.account;
  try {
    if (company) {
      company.name = name || company.name;
      company.email = email || company.email;
      company.password = password || company.password;
      // change logo
      if (req.files?.logo && req.files.logo.length > 0) {
        if (company.image) { await deleteUploadedFile(company.image); } // delete old 
        // save new
        const logoPath = await saveUploadedFile(req.files.logo[0], "logo");
        company.image = logoPath;
      }
      // update company
      const updatedCompany = await company.save();
      return res.status(200).json({
        _id: updatedCompany._id,
        name: updatedCompany.name,
        email: updatedCompany.email,
        token: generateToken(updatedCompany._id), // set token
        image: updatedCompany.image || null
      });
    } else {
      return res.status(404).json({ message: "Company not found." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message || "Something went wrong. Please try again later."});
  }
});

const deleteCompany = AsyncHandler(async (req, res) => {
  const company = req.account;
  try {
    if (company) {
      if (company.image) { await deleteUploadedFile(company.image); } // delete logo
      // delete company
      await company.deleteOne();
      return res.status(200).json({ message: "Company profile deleted successfully." });
    } else {
      return res.status(404).json({ message: "Company not found." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message || "Something went wrong. Please try again later."});
  }
});

const postJob = AsyncHandler(async (req, res) => {
  const { title, description, location, salary, level, category } = req.body;
	const companyId = req.account._id;
  if (!title || !description || !location || !salary || !level || !category) {
    return res.status(400).json({ message: "Missing details." });
  }
	try {
		const newJob = new Job({
			title, description, location, salary, level, category, companyId,
			date: Date.now()
		})
		await newJob.save();
		res.status(200).json({ message: "Post succesfully created.", newJob });
	} catch (error) {
		return res.status(500).json({ message: error.message || "Something went wrong. Please try again later."});
	}
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