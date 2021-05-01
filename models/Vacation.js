import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const vacationSchema = new mongoose.Schema(
  {
    staff: {
      type: ObjectId,
      ref: "User",
    },
    leave: {
      type: ObjectId,
      ref: "Leave",
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
    remark: {
      type: String,
    }, 
    status: {
      type: String,
      enum: ['Accepted', 'Pending', 'Rejected'],
      default: "Pending",
    }, 
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Vacation || mongoose.model("Vacation", vacationSchema);
 