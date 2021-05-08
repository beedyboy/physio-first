import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const allocationSchema = new mongoose.Schema(
  {
   
    asset: {
      type: ObjectId,
      ref: "Asset",
      required: true
    },
    staff: {
      type: ObjectId,
      ref: "User"
    },
    department: {
      type: ObjectId,
      ref: "Department"
    },
    quantity: {
      type: Number,
    },   
    note: {
      type: String,
      maxlength: 200,
    },  
    type: {
      type: String,
      enum: ['Individual', 'Departmental', 'Others'],
      default: "Individual",
    },
    status: {
      type: String,
      enum: ['Active', 'Returned', 'Deleted'],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Allocation || mongoose.model("Allocation", allocationSchema); 
	
   