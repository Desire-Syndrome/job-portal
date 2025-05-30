const AsyncHandler = require('express-async-handler');

const deleteUploads = require("../middleware/deleteUploads.js");

const Company = require("../models/Company.js");  
const Job = require("../models/Job.js");  
const JobApplication = require("../models/JobApplication.js");  


const companyRegistration = AsyncHandler(async (req, res) => {
	const { name, email, password } = req.body; // accept fields
	if (!name || !email || !password || !req.files?.logo || req.files.logo.length === 0) { 
		deleteUploads(req, ["logo"]);
		return res.status(400).json({ message: "Missing details." }); 
	}
	try {
		// if company already exist
		const existCompany = await Company.findOne({ email });
		if (existCompany) {
			deleteUploads(req, ["logo"]); 
			return res.status(400).json({ message: "Company already exists." });
		}
		// logo path
		const logoPath = `/uploads/logos/${req.files.logo[0].filename}`;
		// create company
		const company = await Company.create({
			name, email, password,
			image: logoPath
		});
		return res.status(201).json({
			_id: company._id, name: company.name, email: company.email,
			image: company.image, token: null,
		});
	} catch (error) {
		deleteUploads(req, ["logo"]); 
		return res.status(500).json({ message: "Something went wrong. Please try again later." });
	}
});

const companyLogin = async (req, res) => {
	
}

const getCompanyData = async (req, res) => {
	
}

const updateCompany = async (req, res) => {
	
}

const deleteCompany = async (req, res) => {
	
}

const postJob = async (req, res) => {

}

const getPostedJobs = async (req, res) => {

}

const getApplicants = async (req, res) => {

}

const changeApplicationStatus = async (req, res) => {

}

const changeJobVisibility = async (req, res) => {

}


module.exports = { companyRegistration, companyLogin, getCompanyData, updateCompany, deleteCompany, postJob, getPostedJobs, getApplicants, changeApplicationStatus, changeJobVisibility };