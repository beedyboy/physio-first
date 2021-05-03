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
 

export default connectDB;
