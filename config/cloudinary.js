import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { ENV_VARS } from './envVars.js';

dotenv.config();

cloudinary.config({
  cloud_name: ENV_VARS.CLOUDINARY_CLOUD_NAME,
  api_key: ENV_VARS.CLOUDINARY_API_KEY,
  api_secret: ENV_VARS.CLOUDINARY_API_SECRET,
});

export default cloudinary;
