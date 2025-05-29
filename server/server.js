const dotenv = require("dotenv");
dotenv.config();

// connect Middleware
const express = require("express");
const cors = require("cors");

// connect configs
const connectDB = require('./configs/db.js');
const databaseSeeder = require('./configs/databaseSeeder.js');
  

// setup Middleware
const app = express();
app.use(cors());
app.use(express.json());


// Routes
// test and seed routes
app.get('/', (req, res) => { res.json({ message: 'API works!' }); });
app.use('/api/seed', databaseSeeder);
// api routes


// Setup and Run Server
const PORT = process.env.PORT || 3000; 
connectDB(); 
app.listen(PORT, () => console.log(`server listening on port ${PORT}`))