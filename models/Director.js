import mongoose from "mongoose"; 

function imageArray(data) {
  return JSON.parse(data);
}
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
      maxlength: 1500,
    },
    images: {
      type: String,
      get: imageArray
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
