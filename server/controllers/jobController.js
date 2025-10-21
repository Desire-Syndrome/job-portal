const AsyncHandler = require('express-async-handler');

const Job = require("../models/Job.js");


// getJobs
const getJobs = AsyncHandler(async (req, res) => {
  const totalJobs = await Job.countDocuments();

  const categories = req.query.categories ? req.query.categories.split(',') : [];
  const locations = req.query.locations ? req.query.locations.split(',') : [];
  const title = req.query.title || "";

  const filteredJobs = { visible: true, companyId: { $ne: null } };
  if (categories.length > 0) { filteredJobs.category = { $in: categories } };
  if (locations.length > 0) { filteredJobs.location = { $in: locations } };
  if (title) { filteredJobs.title = { $regex: title, $options: "i" } };

  const totalFilteredJobs = await Job.countDocuments(filteredJobs);
	const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  const jobs = await Job.find(filteredJobs).sort({ _id: -1 })
    .populate({ path: 'companyId', select: "-password" })
    .skip(skip).limit(limit);

  if (jobs.length === 0) {
    return res.status(200).json({ 
    jobs: [],
    totalPages: Math.ceil(totalFilteredJobs / limit), page, totalJobs
    });
  }

  return res.status(200).json({
    jobs,
    totalPages: Math.ceil(totalFilteredJobs / limit), page, totalJobs
  });
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