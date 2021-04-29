import mongoose from "mongoose"; 

const leaveSchema = new mongoose.Schema(
  {
    leave_type: {
      type: String,
      required: true,
      unique: true,
    }, 
    allowed_days: {
      type: Number,
      default: 0
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

export default mongoose.models.Leave || mongoose.model("Leave", leaveSchema);
