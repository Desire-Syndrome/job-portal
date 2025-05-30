const router = require('express').Router();

const AsyncHandler = require('express-async-handler');  

const User = require('./models/User');
const Company = require('./models/Company');

const users = require('./data/json/Users');
const companies = require('./data/json/Companies');


// Routes 
router.post('/users', AsyncHandler(
	async (req, res) => {
		await User.deleteMany({});
		const UserSeeder = await User.insertMany(users);
		res.send({ UserSeeder });
	})
);

router.post('/companies', AsyncHandler(
	async (req, res) => {
		await Company.deleteMany({});
		const CompanySeeder = await Company.insertMany(companies);
		res.send({ CompanySeeder });
	})
);


module.exports = router;