const mongoose = require("mongoose");

const bcrypt = require("bcryptjs"); 


const companySchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	image: { type: String, required: true },
	password: { type: String, required: true },
});


// compare passwords
companySchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// hash password
companySchema.pre("save", async function(next) {
	if(!this.isModified('password')){
		next();
	} else {
			const salt = await bcrypt.genSalt(10);
			this.password = await bcrypt.hash(this.password, salt);
	}
})


module.exports = mongoose.model("Company", companySchema);