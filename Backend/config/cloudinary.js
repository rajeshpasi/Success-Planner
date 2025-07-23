// config/cloudinary.js

import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, 
});

export default cloudinary;
// This module exports the configured Cloudinary instance for use in other parts of the application.
// Make sure to set the environment variables in your .env file: