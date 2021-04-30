import DB from "../../../models";
import connectDB from "../../../services/database";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getAllVacations(req, res);
      break;
    case "POST":
      await saveVacation(req, res);
      break;
    case "PUT":
      await updateVacation(req, res);
      break;
  }
};

const getAllVacations = async (req, res) => {
  try {
    const categories = await DB.Vacation.find({});
    res.status(200).json(categories);
  } catch (err) {
    console.log(err);
  }
};

const saveVacation = async (req, res) => {
  const { Vacation_type, allowed_days, description } = req.body;
  try {
    if (!Vacation_type) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    const Vacation = await DB.Vacation({
      Vacation_type,
      allowed_days,
      description,
    }).save();
    res.status(201).json({ message: "New Vacation type added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
};
const updateVacation = async (req, res) => {
  const data = req.body;
  const Vacation_typeRegex = new RegExp(data.Vacation_type, "i");
  const check_record = await DB.Vacation.findOne({ Vacation_type: Vacation_typeRegex });
  const exist = check_record
    ? check_record && check_record._id.toString() === data.id
      ? false
      : true
    : false;

  if (exist === false) {
    await DB.Vacation.findById(data.id, (error, doc) => {
      if (!error) {
        if (check_record.Vacation_type !== data.Vacation_type) {
          doc.Vacation_type = data.Vacation_type;
        }
        doc.allowed_days = data.allowed_days;
        doc.description = data.description;
        doc.status = data.status;
        doc.save();
        res.status(200).json({
          exist,
          check_record,
          message: "Vacation updated successfully",
        });
      } else {
        return res.status(422).json({ error: "Error updating Vacation" });
      }
    });
  } else {
    return res.status(422).json({
      error: "Duplicate Vacation Vacation_type is not allowed",
    });
  }
};
