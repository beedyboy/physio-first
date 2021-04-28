import DB from "../../../models";
import connectDB from "../../../services/database";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await branchExist(req, res);
      break;
    case "DELETE":
      await removeBranch(req, res);
      break;
  }
};

const branchExist = async (req, res) => {
  try {
    const { branch } = req.query;
    const nameRegex = new RegExp(branch, "i");
    const check_record = await DB.Branch.findOne({ name: nameRegex });
    const exist = check_record ? true : false;
    const message = check_record ? "Duplicate branch not allowed" : "";
    res.status(200).json({ exist, message });
  } catch (err) {
    console.log(err);
  }
};
const removeBranch = async (req, res) => {
  const { id } = req.query;
  await DB.Branch.findByIdAndDelete({ _id: id });
  res.status(200).json({ message: "Branch deleted successfully" });
};
