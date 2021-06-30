import DB from "../../../models";
import connectDB from "../../../services/database";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getAllLeaves(req, res);
      break;
    case "POST":
      await saveLeave(req, res);
      break;
    case "PUT":
      await updateLeave(req, res);
      break;
  }
};

const getAllLeaves = async (req, res) => {
  try {
    const leaves = await DB.Leave.find({});
    res.status(200).json(leaves);
  } catch (err) {
    console.log(err);
  }
};

const saveLeave = async (req, res) => {
  const { leave_type, allowed_days, description } = req.body;
  try {
    if (!leave_type) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    const Leave = await DB.Leave({
      leave_type,
      allowed_days,
      description,
    }).save();
    res.status(201).json({ message: "New Leave type added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
};
const updateLeave = async (req, res) => {
  const data = req.body;
  console.log({ data });
  const leave_typeRegex = new RegExp(data.leave_type, "i");
  const check_record = await DB.Leave.findOne({ leave_type: leave_typeRegex });

  const exist = check_record
    ? check_record && check_record._id.toString() === data.id
      ? false
      : true
    : false;

  if (exist === false) {
    await DB.Leave.findById(data.id, (error, doc) => {
      if (!error) {
        if (doc && doc.leave_type !== data.leave_type) {
          doc.leave_type = data.leave_type;
        }
        doc.allowed_days = data.allowed_days;
        doc.description = data.description;
        doc.status = data.status;
        doc.save();
        res.status(200).json({
          exist,
          check_record,
          message: "Leave updated successfully",
        });
      } else {
        return res.status(422).json({ error: "Error updating Leave" });
      }
    });
  } else {
    return res.status(422).json({
      error: "Duplicate Leave leave_type is not allowed",
    });
  }
};
