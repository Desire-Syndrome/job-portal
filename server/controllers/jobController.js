const AsyncHandler = require('express-async-handler');

const Job = require("../models/Job.js");


const getJobs = AsyncHandler(async (req, res) => {
	try {
		const jobs = await Job.find({ visible: true }).populate({ path: 'companyId', select: "-password" }); // get jobs and populate by company
		return res.status(200).json({ jobs });
	} catch (error) {
		return res.status(500).json({ message: error.message || "Something went wrong. Please try again later."});
	}
});

const getJobById = AsyncHandler(async (req, res) => {
	const {id} = req.params;
	try {
		const job = await Job.findById(id).populate({ path: 'companyId', select: "-password" }); // get job and populate by company
		if(!job){
			return res.status(404).json({ message: "Job not found" })
		}
		return res.status(200).json({ job });
	} catch (error) {
		return res.status(500).json({ message: error.message || "Something went wrong. Please try again later."});
	}
});


module.exports = { getJobs, getJobById };