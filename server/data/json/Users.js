const bcrypt = require("bcryptjs"); 

const users = [
	{
		name: "Doe Jonson",
		email: "1@1",
		password: bcrypt.hashSync("1", 10),
	},
	{
		name: "Ivan Morozko",
		email: "2@2",
		password: bcrypt.hashSync("2", 10),
	},
		{
		name: "Alex Nevskiy",
		email: "3@3",
		password: bcrypt.hashSync("3", 10),
	}
]

module.exports = users;