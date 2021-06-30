
import mongoose from "mongoose"; 
const dotenv = require("dotenv");
dotenv.config();
const connection = {};
async function dbConnect() {
  try {
    if (connection.isConnected) {
      return;
    }
  
    // const db = await mongoose.connect(process.env.DATABASE_URL || "mongodb://localhost:27017/realty", {
    const db = await mongoose.connect(process.env.DATABASE,
      { 
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
       }
    );
    connection.isConnected = db.connections[0].readyState;
    console.log("DATABASE", connection);
  } catch (error) {
    console.log('catch', {error})
  }
}

export default dbConnect;
