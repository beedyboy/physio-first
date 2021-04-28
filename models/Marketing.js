import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const marketingSchema = new mongoose.Schema(
  {
    url_link: {
      type: String,
    }, 
    description: {
      type: String 
    }, 
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Marketing || mongoose.model("Marketing", marketingSchema);
