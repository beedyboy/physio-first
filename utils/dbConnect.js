// import mongoose from "mongoose";

// const connection = {};

// async function dbConnect() {
//   try {
//     //If DB is connected, return
//     if (connection.isConnected) return true;

//     const connectionConfig = {
//       useNewUrlParser: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//       useUnifiedTopology: true,
//     }
//     const db = await mongoose.connect(process.env.DATABASE, connectionConfig);
    // connection.isConnected = db.connections[0].readyState;

    // console.log("[info] - DATABASE CONNECTION STATUS:", connection.isConnected);

//     return true;

//   } catch (error) {
//     console.log('catch', { error });
//     return false;
//   }
// }

// export default dbConnect;
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
