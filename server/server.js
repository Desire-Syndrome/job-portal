import 'dotenv/config'; 

// middleware
import express from 'express';
import cors from 'cors';

// configs
import connectDB from './configs/db.js'; // database

// routers
// import companyRoutes from "./routes/companyRoutes.js";
// import jobRoutes from "./routes/jobRoutes.js";
// import userRoutes from "./routes/userRoutes.js";


const app = express();
// Connect Middlewares
app.use(cors());
app.use(express.json());


// Routes
// test and middleware routes
app.get('/', (req, res) => { res.json({ message: 'API works!' }); });
// api routes
// app.use('/api/company', companyRoutes);
// app.use('/api/jobs', jobRoutes);
// app.use('/api/users', userRoutes);


// Setup and Run Server
const PORT = process.env.PORT || 3000; // assign port from .env
connectDB(); // connect to DB
app.listen(PORT, () => console.log(`server listening on port ${PORT}`))