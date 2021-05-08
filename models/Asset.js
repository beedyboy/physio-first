import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const assetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    sub_id: {
      type: ObjectId,
      ref: "SubCategory",
    },
    purchased_price: {
      type: String,
    },
    serial: {
      type: String,
    },
    company_name: {
      type: String,
    },
    start_date: {
      type: String,
    },

    end_date: {
      type: String,
    },
    description: {
      type: String,
      maxlength: 200,
    },
    purchased_date: {
      type: String,
    },
    date_sold: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Active", "Pending", "Deleted", "Sold", "Maintenance"],
      default: "Active",
    },
    condition: {
      type: String,
      enum: ["New", "Leased", "Used"],
      default: "New",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Asset || mongoose.model("Asset", assetSchema);
