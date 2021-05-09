import DB from "../../../models";
import connectDB from "../../../services/database";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getCategories(req, res);
      break;
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
    console.log(req.body) 
    const subRegex = new RegExp(sub_name, "i");
    const check_record = await DB.SubCategory.findOne({
      cat_id: cat_id,
      sub_name: subRegex
    });
    console.log({check_record})
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

const getCategories = async (req, res) => {
  try {
    const { id } = req.query; 
    try {
      const categories = await DB.SubCategory.find({cat_id: id}).populate(
        "cat_id",
        "name -_id"
      );
      res.status(200).json(categories);
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};