import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema(
  {
    branch: {
      type: ObjectId,
      ref: "Branch",
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
    },
    phone_number: {
      type: String,
    },
    address: {
      type: String,
      maxlength: 200,
    },
    signature: {
      type: String,
      maxlength: 100,
    },
    token: {
      type: String,
    },
    emergency_contact: {
      type: String,
      maxlength: 100,
    },
    emergency_phone: {
      type: String,
      maxlength: 30,
    },
    staffId: {
      type: String,
      required: true,
      maxlength: 30,
    },
    pre_contract: {
      type: Array,
    },
    general: {
      type: Array,
    },
    student: {
      type: Array,
    },
    para_professional: {
      type: Array,
    },
    professional: {
      type: Array,
    },
    marketing: {
      type: Array,
    },
    management_executive: {
      type: Array,
    },
    sec_question_one: {
      type: String,
    },
    sec_answer_one: {
      type: String,
    },
    sec_question_two: {
      type: String,
    },
    sec_answer_two: {
      type: String,
    },
    acl: {
      type: Array,
    },
    status: {
      type: String,
      enum: ["Active", "Pending", "Deleted"],
      default: "Active",
    },
    can_login: { type: Boolean, default: false },
    signed: { type: Boolean, default: false },
    onboarded: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
