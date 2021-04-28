import mongoose from "mongoose"; 
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    }, 
    description: {
      type: String,
      maxlength: 200,
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

export default mongoose.models.Category || mongoose.model("Category", categorySchema);
