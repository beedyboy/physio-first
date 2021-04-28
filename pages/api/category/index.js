import DB from "../../../models";
import connectDB from "../../../services/database";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getallCategories(req, res);
      break;
    case "POST":
      await saveCategory(req, res);
      break;
    case "PUT":
      await updateCategory(req, res);
      break;
  }
};

const getallCategories = async (req, res) => {
  try {
    const categories = await DB.Category.find({});
    res.status(200).json(categories);
  } catch (err) {
    console.log(err);
  }
};

const saveCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    if (!name) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    const category = await DB.Category({
      name,
      description,
    }).save();
    res.status(201).json({ message: "New Category added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
};
const updateCategory = async (req, res) => { 
  const data = req.body; 
  console.log({ data });
  const nameRegex = new RegExp(data.name, "i");
  const check_record = await DB.Category.findOne({ name: nameRegex });  
  const exist = check_record
    ? check_record && check_record._id.toString() === data.id
      ? false
      : true
    : false;

    
  if (exist === false) {
    await DB.Category.findById(data.id, (error, doc) => {
      if (!error) {
        if (check_record.name !== data.name) {
          doc.name = data.name;
        }
        doc.description = data.description;
        doc.status = data.status;
        doc.save();
        res.status(200).json({
          exist,
          check_record,
          message: "Category updated successfully",
        });
      } else {
        return res.status(422).json({ error: "Error updating Category" });
      }
    });
  } else {
    return res.status(422).json({ 
      error: "Duplicate category name is not allowed",
    });
  }
 
};
