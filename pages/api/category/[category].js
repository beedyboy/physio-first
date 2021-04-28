import DB from "../../../models";
import connectDB from "../../../services/database";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await categoryExist(req, res);
      break;
    case "DELETE":
      await removeCategory(req, res);
      break;
  }
};

const categoryExist = async (req, res) => {
  try {
    const { category } = req.query;
    const nameRegex = new RegExp(category, "i");
    const check_record = await DB.Category.findOne({ name: nameRegex });
    const exist = check_record ? true : false;
    const message = check_record ? "Duplicate category not allowed" : null;
    res.status(200).json({ exist, message });
  } catch (err) {
    console.log(err);
  }
};

const removeCategory = async (req, res) => {
  const { category: id } = req.query;
  await DB.Category.findByIdAndRemove(id, (err, doc) => {
    if (err) {
      return res.status(400).send({
        message: "Invalid details",
        err,
      });
    } else {
      return res.status(200).json({
        message: "Category Record Deleted Successfully",
      });
    }
  }).catch((err) => {
    console.log({ err });
    res.status(400).json({ message: "Invalid details", err });
  });
};
