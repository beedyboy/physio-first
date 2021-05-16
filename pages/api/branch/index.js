import DB from "../../../models";
import connectDB from "../../../services/database";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getallBranches(req, res);
      break;
    case "POST":
      await saveBranch(req, res);
      break;
    case "PUT":
      await updateBranch(req, res);
      break;
  }
};

const getallBranches = async (req, res) => {
  try {
    const branches = await DB.Branch.find({});
    res.status(200).json(branches);
  } catch (err) {
    console.log(err);
  }
};

const saveBranch = async (req, res) => {
  const { name, email, address, phone } = req.body;
  try {
    if (!name || !email) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    const newBranch = await DB.Branch({
      name,
      email,
      address,
      phone,
    });
    newBranch.save((err, doc) => {
      if (err) {
        res.status(404).json({
          error: "branch was not created",
          err
        });
      } else {
        res.status(201).json({ message: "New Branch added successfully" });
      }
      
    }); 
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error", err });
  }
};
 
const updateBranch = async (req, res) => {
  const data = req.body; 
  const nameRegex = new RegExp(data.email, "i");
  const check_record = await DB.Branch.findOne({ email: nameRegex }); 
  const exist = check_record
    ? check_record && check_record._id.toString() === data.id
      ? false
      : true
    : false;

  if (exist === false) {
    await DB.Branch.findById(data.id, (error, doc) => {
      if (!error) {
        doc.name = data.name;
        doc.email = data.email;
        doc.address = data.address;
        doc.phone = data.phone;
        doc.save();
        res.status(200).json({
          exist,
          check_record,
          message: "Branch updated successfully",
        });
      } else {
        return res.status(422).json({ error: "Error updating branch", err: error });
      }
    });
  } else {
    return res.status(422).json({
      error: "Duplicate branch email is not allowed",
    });
  }
};