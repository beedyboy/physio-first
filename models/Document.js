import mongoose from "mongoose"; 

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String, 
    }, 
    doc_type: {
      type: String,
      required: true, 
    },  
    description: {
      type: String,
      maxlength: 500,
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

export default mongoose.models.Document || mongoose.model("Document", documentSchema);
