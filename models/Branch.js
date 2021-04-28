import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const branchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
    },
    address: {
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

export default mongoose.models.Branch || mongoose.model("Branch", branchSchema);
