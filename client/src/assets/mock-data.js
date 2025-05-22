import company_icon from "./images/company_icon.svg";
import profile_img from "./images/profile_img.png";


export const jobCategories = ["Programming","Designing","Management","Marketing","Cybersecurity"]

export const jobLocations = ["Dublin","Cork","California","New York"]

export const jobLevels = ["Junior","Middle","Senior"]

export const jobs = [
	{
			_id: '1',
			title: "Full Stack Developer",
			location: "California",
			level: "Senior Level",
			companyId: {
					"_id": "670e4d25ca9fda8f1bf359b9",
					"name": "Slack",
					"email": "slack@demo.com",
					"image": company_icon,
			},
			description: `
			<p>We are seeking a highly skilled Full Stack Developer to join our dynamic and innovative team. The ideal candidate will have a passion for developing scalable web applications and working across the entire technology stack, including front-end and back-end development. You will have the opportunity to work with the latest technologies and contribute to exciting projects that impact our users directly.</p>
			<h2><strong>Key Responsibilities</strong></h2>
			<ol>
					<li>Build, test, and deploy highly responsive web applications.</li>
					<li>Design user-friendly interfaces using HTML, CSS, and JavaScript.</li>
					<li>Develop and maintain APIs and databases to support application functionality.</li>
					<li>Collaborate with cross-functional teams to define, design, and ship new features.</li>
					<li>Identify and resolve bottlenecks and bugs to optimize application performance.</li>
			</ol>
			<h2><strong>Skills Required</strong></h2>
			<ol>
					<li>Proficiency in HTML, CSS, and JavaScript frameworks (e.g., React, Angular).</li>
					<li>Experience with server-side languages (e.g., Node.js, Python).</li>
					<li>Familiarity with relational and non-relational databases (e.g., MySQL, MongoDB).</li>
					<li>Strong understanding of web security and performance optimization.</li>
					<li>Ability to work in an Agile environment.</li>
			</ol>`,
			salary: 82000,
			date: 1729681667114,
			category: "Programming",
	},
	{
			_id: '2',
			title: "Data Scientist",
			location: "New York",
			level: "Intermediate Level",
			companyId: {
					"_id": "670e4d25ca9fda8f1bf359b9",
					"name": "Slack",
					"email": "slack@demo.com",
					"image": company_icon,
			},
			description: `
			<p>Join our analytics team to help drive business decisions using data. As a Data Scientist, you will leverage your analytical skills to uncover patterns and insights that will influence our strategic direction. You will work closely with stakeholders to understand their needs and deliver impactful analyses that support our growth objectives. Your role is critical in turning data into actionable insights.</p>
			<h2><strong>Key Responsibilities</strong></h2>
			<ol>
					<li>Analyze large datasets to uncover trends and patterns that inform business strategies.</li>
					<li>Develop predictive models to forecast outcomes and improve decision-making.</li>
					<li>Visualize data findings through reports and dashboards for stakeholders.</li>
					<li>Collaborate with cross-functional teams to define data-driven goals.</li>
					<li>Continuously refine data collection and analysis processes to enhance accuracy.</li>
			</ol>
			<h2><strong>Skills Required</strong></h2>
			<ol>
					<li>Proficiency in Python or R for statistical analysis and data manipulation.</li>
					<li>Experience with data visualization tools (e.g., Tableau, Power BI).</li>
					<li>Strong knowledge of SQL and database management.</li>
					<li>Familiarity with machine learning techniques and algorithms.</li>
					<li>Excellent problem-solving and critical-thinking skills.</li>
			</ol>`,
			salary: 72000,
			date: 1729681667114,
			category: "Data Science",
	},
	{
			_id: '3',
			title: "Data Scientist",
			location: "California",
			level: "Senior Level",
			companyId: {
					"_id": "670e4d25ca9fda8f1bf359b9",
					"name": "Slack",
					"email": "slack@demo.com",
					"image": company_icon,
			},
			description: `
			<p>Join our innovative team as a Data Scientist, where you will analyze complex data sets to drive strategic decision-making. You will leverage your statistical and programming skills to uncover insights and develop predictive models, contributing to the overall success of our organization.</p>
			<h2><strong>Key Responsibilities</strong></h2>
			<ol>
					<li>Analyze large datasets to identify trends, patterns, and anomalies.</li>
					<li>Develop and implement predictive models and algorithms.</li>
					<li>Collaborate with cross-functional teams to understand business needs and provide data-driven solutions.</li>
					<li>Visualize data findings and present insights to stakeholders.</li>
					<li>Stay current with industry trends and best practices in data science.</li>
			</ol>
			<h2><strong>Skills Required</strong></h2>
			<ol>
					<li>Proficiency in programming languages such as Python or R.</li>
					<li>Strong knowledge of statistical methods and machine learning techniques.</li>
					<li>Experience with data visualization tools (e.g., Tableau, Power BI).</li>
					<li>Excellent problem-solving skills and attention to detail.</li>
					<li>Ability to communicate complex concepts to non-technical audiences.</li>
			</ol>`,
			salary: 65000,
			date: 1729681667114,
			category: "Data Science",
	},
	{
			_id: '4',
			title: "Sales Manager",
			location: "New York",
			level: "Senior Level",
			companyId: {
					"_id": "670e4d25ca9fda8f1bf359b9",
					"name": "Slack",
					"email": "slack@demo.com",
					"image": company_icon,
			},
			description: `
			<p>Join our team as a Sales Manager, where you will lead our sales efforts to drive growth and increase market share. You will develop sales strategies, manage client relationships, and mentor your sales team to achieve performance goals.</p>
			<h2><strong>Key Responsibilities</strong></h2>
			<ol>
					<li>Develop and implement strategic sales plans to achieve company objectives.</li>
					<li>Manage and lead a team of sales representatives to meet and exceed sales targets.</li>
					<li>Build and maintain strong relationships with key clients and stakeholders.</li>
					<li>Analyze sales data and market trends to identify opportunities for growth.</li>
					<li>Provide training and development opportunities for the sales team.</li>
			</ol>
			<h2><strong>Skills Required</strong></h2>
			<ol>
					<li>Proven experience in sales management and team leadership.</li>
					<li>Strong negotiation and communication skills.</li>
					<li>Ability to analyze data and make informed decisions.</li>
					<li>Experience with CRM software (e.g., Salesforce).</li>
					<li>A results-oriented mindset with a focus on meeting targets.</li>
			</ol>`,
			salary: 59000,
			date: 1729681667114,
			category: "Marketing",
	},
	{
			_id: '5',
			title: "Human Resources Specialist",
			location: "Cork",
			level: "Intermediate Level",
			companyId: {
					"_id": "670e4d25ca9fda8f1bf359b9",
					"name": "Slack",
					"email": "slack@demo.com",
					"image": company_icon,
			},
			description: `
			<p>As a Human Resources Specialist, you will support various HR functions, including recruitment, employee relations, and compliance. You will play a vital role in fostering a positive workplace culture and ensuring that our HR practices align with organizational goals.</p>
			<h2><strong>Key Responsibilities</strong></h2>
			<ol>
					<li>Assist with the recruitment process, including job postings and candidate screenings.</li>
					<li>Support employee onboarding and orientation programs.</li>
					<li>Manage employee records and ensure compliance with HR policies.</li>
					<li>Provide guidance to employees on HR-related inquiries.</li>
					<li>Help organize employee training and development initiatives.</li>
			</ol>
			<h2><strong>Skills Required</strong></h2>
			<ol>
					<li>Strong understanding of HR principles and practices.</li>
					<li>Excellent communication and interpersonal skills.</li>
					<li>Proficiency in HR software (e.g., HRIS, ATS).</li>
					<li>Ability to maintain confidentiality and handle sensitive information.</li>
					<li>Attention to detail and strong organizational skills.</li>
			</ol>`,
			salary: 89000,
			date: 1729681667114,
			category: "Management",
	},
];

export const manageJobs = [
    { _id: 1, title: "Full Stack Developer", date: 1729102298497, location: "Bangalore", applicants: 20 },
    { _id: 2, title: "Marketing Manager", date: 1729102298497, location: "London", applicants: 2 },
    { _id: 3, title: "UI/UX Designer", date: 1729102298497, location: "Dubai", applicants: 25 }
];

export const manageApplications = [
	{ _id: 1, name: "Richard Sanford", jobTitle: "Full Stack Developer", location: "Bangalore", imgSrc: profile_img, status: 'Pending' },
	{ _id: 2, name: "Enrique Murphy", jobTitle: "Data Scientist", location: "San Francisco", imgSrc: profile_img, status: 'Rejected' },
	{ _id: 3, name: "Alison Powell", jobTitle: "Marketing Manager", location: "London", imgSrc: profile_img, status: 'Pending' },
	{ _id: 4, name: "Richard Sanford", jobTitle: "UI/UX Designer", location: "Dubai", imgSrc: profile_img, status: 'Accepted'}
];

export const userApplications = [
    {
				_id: 1,
        company: 'Amazon',
        title: 'Full Stack Developer',
        location: 'Bangalore',
        date: '22 Aug, 2024',
        status: 'Pending',
        logo: company_icon,
    },
    {
				_id: 2,
        company: 'Google',
        title: 'Marketing Manager',
        location: 'London',
        date: '25 Sep, 2024',
        status: 'Accepted',
        logo: company_icon,
    },
    {
				_id: 3,
        company: 'Qualcomm',
        title: 'UI/UX Designer',
        location: 'Dubai',
        date: '15 Oct, 2024',
        status: 'Rejected',
        logo: company_icon,
    }
];

export const company = { 
	name: "Slack", 
	email: "slack@gmail.com", 
	password: "1234", 
	image: profile_img 
};

export const user = { 
	name: "Kostiantyn", 
	email: "slack@gmail.com", 
	password: "1234", 
	resume: null,
	image: profile_img 
};