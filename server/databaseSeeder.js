const router = require('express').Router();
const AsyncHandler = require('express-async-handler');  

// Connect Object Models
const User = require('./models/User');
const Company = require('./models/Company');
// import our JSON from data folder
const users = require('./data/json/Users');
const companies = require('./data/json/Companies');


// Routs to populate our Database
router.post('/users', AsyncHandler(
	async (req, res) => {
		await User.deleteMany({}); // delete to no duplicate
		const UserSeeder = await User.insertMany(users);
		res.send({ UserSeeder });
	})
);

router.post('/companies', AsyncHandler(
	async (req, res) => {
		await Company.deleteMany({}); // delete to no duplicate
		const CompanySeeder = await Company.insertMany(companies);
		res.send({ CompanySeeder });
	})
);


module.exports = router;