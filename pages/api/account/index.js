import DB from "../../../models";
import connectDB from "../../../services/database";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await allStaff(req, res);
      break;
    case "POST":
      await addAccount(req, res);
      break;
    case "PUT":
      await updateAccount(req, res);
      break;
  }
};

const allStaff = async (req, res) => {
  try {
    const accounts = await DB.User.find({}).populate("branch", "name -_id");
    return res.status(200).json(accounts);
  } catch (err) {
    console.log(err);
  }
};

const addAccount = async (req, res) => {
  const {
    email,
    firstname,
    lastname,
    phone: phone_number,
    staffId,
    branch,
    address,
    allergies,
    position
  } = req.body;
  try {
    if (
      !email ||
      !firstname ||
      !lastname || 
      !staffId ||
      !branch
    ) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    await DB.User({
      email,
      firstname,
      lastname,
      phone_number,
      staffId,
      branch,
      position,
      allergies,
      address,
    }).save();
    res.status(201).json({ message: "New account added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
};
const updateAccount = async (req, res) => {
  const data = req.body;
  const emailRegex = new RegExp(data.email, "i");
  const check_record = await DB.User.findOne({
    email: emailRegex,
  });
  const exist = check_record
    ? check_record && check_record._id.toString() === data.id
      ? false
      : true
    : false;

  if (exist === false) {
    await DB.User.findById(data.id, (error, doc) => {
      if (!error) {
        if (check_record.email !== data.email) {
          doc.email = data.email;
        }
        doc.firstname = data.firstname;
        doc.lastname = data.lastname;
        doc.phone_number = data.phone_number;
        doc.staffId = data.staffId;
        doc.branch = data.branch;
        doc.position = data.position;
        doc.allergies = data.allergies;
        doc.dob = data.dob;

        doc.address = data.address;
        doc.status = data.status;
        doc.save();
        res.status(200).json({
          exist,
          check_record,
          message: "Account updated successfully",
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
