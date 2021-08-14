import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const exeatSchema = new mongoose.Schema(
  {
    staff: {
      type: ObjectId,
      ref: "User",
    },
    leave: {
      type: String,
      enum: ['Sick', 'Bereavement', 'Rejected'],
      default: "Bereavement",
    },
    leave_start_date: {
      type: String, 
    },
    leave_end_date: {
      type: String, 
    }, 
    description: {
      type: String,
    },  
    days: {
      type: Number,
      default: 0
    }, 
    status: {
      type: String,
      enum: ['Active', 'Completed'],
      default: "Active",
    }, 
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Exeat || mongoose.model("Exeat", exeatSchema);
 