import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const subCategorySchema = new mongoose.Schema(
  {
    sub_name: {
      type: String,
    }, 
    cat_id: {
      type: ObjectId,
      ref: "Category",
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

export default mongoose.models.SubCategory || mongoose.model("SubCategory", subCategorySchema);
