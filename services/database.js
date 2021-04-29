import mongoose from "mongoose";
const dotenv = require("dotenv");
dotenv.config();

function connectDB() {
  if (mongoose.connections[0].readyState) {
    console.log("already connected");
    return;
  }
  mongoose.connect(process.env.DEV_DATABASE_URL, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
  });
  mongoose.connection.on("connected", () => {
    console.log("connected to mongo");
  });
  mongoose.connection.on("error", (err) => {
    console.log("error connecting", err);
  });
}

// const connection = {};

// const connectDB = (handler) => async (req, res) => {
//   if (mongoose.connections[0].readyState) {
//     console.log("already connected")
//     // Use current db connection
//     return handler(req, res);
//   }
//   // Use new db connection
//   const db = await mongoose.connect(process.env.DEV_DATABASE_URL, {
// useUnifiedTopology: true,
// useFindAndModify: false,
// useCreateIndex: true,
// useNewUrlParser: true,
//   });
//   connection.isConnected = db.connections[0].readyState;

//   console.log("[info] - DATABASE CONNECTION STATUS:", connection.isConnected);

//   return handler(req, res);
// };

export default connectDB;
