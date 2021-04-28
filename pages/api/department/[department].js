import DB from "../../../models";
import connectDB from "../../../services/database";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await departmentExist(req, res);
      break;
    case "DELETE":
      await removeDepartment(req, res);
      break;
  }
};

const departmentExist = async (req, res) => {
  try {
    const { department } = req.query;
    const nameRegex = new RegExp(department, "i");
    const check_record = await DB.Department.findOne({ name: nameRegex });
    const exist = check_record ? true : false;
    const message = check_record ? "Duplicate department not allowed" : null;
    res.status(200).json({ exist, message });
  } catch (err) {
    console.log(err);
  }
};

const removeDepartment = async (req, res) => {
  const { department: id } = req.query;
  await DB.Department.findByIdAndRemove(id, (err, doc) => {
    if (err) {
      return res.status(400).send({
        message: "Invalid details",
        err,
      });
    } else {
      return res.status(200).json({
        message: "Department Record Deleted Successfully",
      });
    }
  }).catch((err) => {
    console.log({ err });
    res.status(400).json({ message: "Invalid details", err });
  });
};
