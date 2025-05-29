import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const MONGODB_URL = process.env.MONGODB_URL; // get our key from .env
    await mongoose.connect(MONGODB_URL)  
    console.log("DB connected");
  } catch (error) {
    console.log("DB connection failed:", error);
  }
}

export default connectDB;