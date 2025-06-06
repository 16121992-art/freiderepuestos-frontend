import dotenv from "dotenv";
dotenv.config();

const config = {
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  stripeKey: process.env.STRIPE_SECRET_KEY,
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudApiKey: process.env.CLOUDINARY_API_KEY,
  cloudApiSecret: process.env.CLOUDINARY_API_SECRET,
  frontendUrl: process.env.FRONTEND_URL,
};

export default config;