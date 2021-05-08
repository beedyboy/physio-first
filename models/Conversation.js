import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const converstaionSchema = new mongoose.Schema(
  {
    ticket: {
      type: ObjectId,
      ref: "Ticket",
    },
    description: {
      type: String,
    },

    requester: {
      type: String,
      enum: ["Staff", "Customer"],
    },

    respondent: {
      type: String,
      enum: ["Requester", "TaskPerson"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Converstaion ||
  mongoose.model("Converstaion", converstaionSchema);
