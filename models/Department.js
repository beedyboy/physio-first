import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
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

export default mongoose.models.Department || mongoose.model("Department", departmentSchema);
