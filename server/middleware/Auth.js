const jwt = require("jsonwebtoken"); // jsonwebtoken - create and verify tokens for authorization 

const AsyncHandler = require('express-async-handler'); // Express middleware to handle errors (like try-catch)

const User = require("../models/User.js"); 
const Company = require("../models/Company.js"); 


const protect = AsyncHandler(async(req, res, next) => {
	let token;
	if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
		try	{
			token = req.headers.authorization.split(" ")[1];
			const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
			const account = await User.findById(decodedToken.id).select("-password") || await Company.findById(decodedToken.id).select("-password");
			req.account = account;
			next();
		} catch(err) {
			res.status(401);
			throw new Error("Not authorized, token failed");
		}
	}
	if(!token){
		res.status(401);
		throw new Error("Not authorized, no token");
	}
}) 


module.exports = protect;