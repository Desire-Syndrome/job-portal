const dotenv = require("dotenv");
dotenv.config();

// connect Middleware
const express = require("express");
const cors = require("cors");

// connect Configs
const connectDB = require('./configs/db.js');

  
// setup Middleware
const app = express();
app.use(cors());
app.use(express.json());


// Routes
// test and seeder
app.get('/', (req, res) => { res.json({ message: 'API works!' }); });
const databaseSeeder = require('./databaseSeeder.js');
app.use('/api/seed', databaseSeeder);
// api routes
const companyRoutes = require( "./routes/companyRoutes.js");
app.use('/api/company', companyRoutes);
const userRoutes = require("./routes/userRoutes.js");
app.use('/api/user', userRoutes);
const jobRoutes = require("./routes/jobRoutes.js");
app.use('/api/jobs', jobRoutes);


// Setup and Run Server
const PORT = process.env.PORT || 3000; 
connectDB(); 
app.listen(PORT, () => console.log(`server listening on port ${PORT}`))