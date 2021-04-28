import DB from "../../../models";
import connectDB from "../../../services/database";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await subExist(req, res);
      break;
    case "DELETE":
      await removeSubCategory(req, res);
      break;
  }
};

const subExist = async (req, res) => {
  try {
    const { cat_id, sub_name } = req.body;
    const cat_idRegex = new RegExp(cat_id, "i");
    const subRegex = new RegExp(sub_name, "i");
    const check_record = await DB.SubCategory.findOne({
      cat_id: cat_idRegex,
      sub_name: subRegex
    });
    const exist = check_record ? true : false;
    const message = check_record ? "Duplicate record not allowed" : null;
    res.status(200).json({ exist, message });
  } catch (err) {
    console.log(err);
  }
};

const removeSubCategory = async (req, res) => {
  const { id } = req.query;
  await DB.SubCategory.findByIdAndRemove(id, (err, doc) => {
    if (err) {
      return res.status(400).send({
        message: "Invalid details",
        err,
      });
    } else {
      return res.status(200).json({
        message: "Record Deleted Successfully",
      });
    }
  }).catch((err) => {
    console.log({ err });
    res.status(400).json({ message: "Invalid details", err });
  });
};
