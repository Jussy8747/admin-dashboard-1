import mongoose from "mongoose";
import env from "dotenv";
env.config();

const mongoUrl = process.env.MONGO_URL;

const connectDb = async () => {
  try {
    const con = await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })(`MongoDb conneted: ${con.connection.host}`);
  } catch (error) {
    `Error : ${error.message}`;
  }
};

export default connectDb;
