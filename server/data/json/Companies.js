const bcrypt = require("bcryptjs"); 

const companies = [
	{
		name: "Google",
		email: "1@1",
		image: "https://bpando.org/wp-content/uploads/New-Google-Chrome-Logo-BPO.jpg",
		password: bcrypt.hashSync("1", 10),
	},
	{
		name: "Slack",
		email: "2@2",
		image: "https://cdn.prod.website-files.com/65ba24129df733a18dfde106/65e070b8e382b5c1e1fa9b20_slack-transp.png",
		password: bcrypt.hashSync("2", 10),
	},
]

module.exports = companies;