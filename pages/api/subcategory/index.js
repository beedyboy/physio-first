import DB from "../../../models";
import connectDB from "../../../services/database";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getallSubCategories(req, res);
      break;
    case "POST":
      await saveSub(req, res);
      break;
    case "PUT":
      await updateSub(req, res);
      break;
  }
};

const getallSubCategories = async (req, res) => {
  try {
    const categories = await DB.SubCategory.find({}).populate(
      "cat_id",
      "name -_id"
    );
    res.status(200).json(categories);
  } catch (err) {
    console.log(err);
  }
};

const saveSub = async (req, res) => {
  const { cat_id, sub_name, description } = req.body;
  try {
    if (!cat_id || !sub_name) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
     await DB.SubCategory({
      cat_id,
      sub_name,
      description,
    }).save();
    res.status(201).json({ message: "New Sub-category added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
};
const updateSub = async (req, res) => {
  const data = req.body;
  const cat_idRegex = new RegExp(data.cat_id, "i");
  const subRegex = new RegExp(data.sub_name, "i");
  const check_record = await DB.SubCategory.findOne({
    cat_id: cat_idRegex,
    sub_name: subRegex,
  });
  const exist = check_record
    ? check_record && check_record._id.toString() === data.id
      ? false
      : true
    : false;

  if (exist === false) {
    await DB.SubCategory.findById(data.id, (error, doc) => {
      if (!error) {
        if (check_record.sub_name !== data.sub_name) {
          doc.sub_name = data.sub_name;
        }
        if (check_record.cat_id !== data.cat_id) {
          doc.cat_id = data.cat_id;
        }
        doc.description = data.description;
        doc.status = data.status;
        doc.save();
        res.status(200).json({
          exist,
          check_record,
          message: "Sub-category updated successfully",
        });
      } else {
        return res.status(422).json({ error: "Error updating record" });
      }
    });
  } else {
    return res.status(422).json({
      error: "Duplicate record is not allowed",
    });
  }
};
