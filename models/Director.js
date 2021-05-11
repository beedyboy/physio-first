import mongoose from "mongoose"; 

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
      maxlength: 500,
    },
    images: {
      type: String
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

export default mongoose.models.Director || mongoose.model("Director", directorSchema);
