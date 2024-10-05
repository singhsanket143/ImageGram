import dotenv from "dotenv";

dotenv.config();

export const DB_URL = process.env.DB_URL;
export const API_KEY = process.env.CLOUDINARY_API_KEY;
export const API_SECRET = process.env.CLOUDINARY_API_SECRET;
