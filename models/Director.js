import mongoose from "mongoose"; 
import Assistant from "../helpers/Assistant";
const directorSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true, 
    }, 
    lastname: {
      type: String,
      required: true, 
    },  
    position: {
      type: String,
      required: true, 
    },  
    date_joined: {
      type: String, 
    },  
    story: {
      type: String,
      maxlength: 2500,
    },
    images: {
      type: String,
      get: Assistant.imageArray,
    },
    status: {
      type: String,
      enum: ["Active", "Pending", "Deleted"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);
directorSchema.set('toObject', {getters: true});
directorSchema.set('toJSON', {getters: true});
export default mongoose.models.Director || mongoose.model("Director", directorSchema);
