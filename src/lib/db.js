// import { MongoClient } from 'mongodb';
// const uri = process.env.MONGODB_URL;
// const client = new MongoClient(uri);

// const connectToDatabase = async()=>{
//     try {
//         await client.connect();
//         console.log('Connected to MongoDB');
//         return client.db();
//     } catch (error) {
//         console.error('Error connecting to MongoDB', error);
//     }
// }
// export default connectToDatabase;
import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};
