import DB from "../../../models";
import connectDB from "../../../services/database";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getallDepartment(req, res);
      break;
    case "POST":
      await saveDepartment(req, res);
      break;
    case "PUT":
      await updateDepartment(req, res);
      break;
  }
};

const getallDepartment = async (req, res) => {
  try {
    const categories = await DB.Department.find({});
    res.status(200).json(categories);
  } catch (err) {
    console.log(err);
  }
};

const saveDepartment = async (req, res) => {
  const { name, description } = req.body;
  try {
    if (!name) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
      await DB.Department({
      name,
      description,
    }).save();
    res.status(201).json({ message: "New Department added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
};
const updateDepartment = async (req, res) => { 
  const data = req.body; 
  const nameRegex = new RegExp(data.name, "i");
  const check_record = await DB.Department.findOne({ name: nameRegex });  
  const exist = check_record
    ? check_record && check_record._id.toString() === data.id
      ? false
      : true
    : false;

    
  if (exist === false) {
    await DB.Department.findById(data.id, (error, doc) => {
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
          message: "Department updated successfully",
        });
      } else {
        return res.status(422).json({ error: "Error updating Department" });
      }
    });
  } else {
    return res.status(422).json({ 
      error: "Duplicate department name is not allowed",
    });
  }
 
};
