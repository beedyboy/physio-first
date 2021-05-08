import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const ticketSchema = new mongoose.Schema(
  {
    
    title: {
      type: String,
    }, 
    email: {
      type: String, 
      trim: true
    },
    staff: {
      type: ObjectId,
      ref: "User"
    },
    assigned_to: {
      type: ObjectId,
      ref: "User"
    },
    ticket_date: {
      type: String,
    },   
      
    requester: {
      type: String,
      enum: ['Staff', 'Customer'] 
    },
    category: {
      type: String,
      enum: ['Order', 'Asset'] 
    },
    priority: {
      type: String,
      enum: ['High', 'Low', 'Medium'],
      default: "Low",
    },
    status: {
      type: String,
      enum: ['Pending', 'Active', 'InProgress', 'Closed'],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema); 
	
   