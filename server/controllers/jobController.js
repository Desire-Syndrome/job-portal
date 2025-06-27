const AsyncHandler = require('express-async-handler');

const Job = require("../models/Job.js");


// getJobs
const getJobs = AsyncHandler(async (req, res) => {
	const jobs = await Job.find({ visible: true }).populate({ path: 'companyId', select: "-password" });
	
	if (jobs.length === 0) {
    return res.status(404).json({ message: "Jobs not found." });
  }

	return res.status(200).json({ jobs });
});


// getJobById
const getJobById = AsyncHandler(async (req, res) => {
	const { id } = req.params;

	const job = await Job.findById(id).populate({ path: 'companyId', select: "-password" }); 
	
	if (!job) {
		return res.status(404).json({ message: "Job not found" })
	} 

	return res.status(200).json({ job });
});


module.exports = { getJobs, getJobById };