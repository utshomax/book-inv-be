import { connect , set } from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI: string = process.env.MONGO_URI || "";
    set('strictQuery', false);
    await connect(mongoURI);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
