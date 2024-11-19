// import mongoose from "mongoose";

// export const connectDB = async () => {
//   await mongoose
//     .connect(
//       "mongodb+srv://mannasoumyajit47:tomato@cluster0.wjswu.mongodb.net/food-delivery"
//     )
//     .then(() => console.log("DB Connected"));
// };

import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected");
  } catch (error) {
    console.error("DB Connection Error:", error);
  }
};
