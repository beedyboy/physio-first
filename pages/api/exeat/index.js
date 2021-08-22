import DB from "../../../models";
import connectDB from "../../../services/database";
import Authenticated from "../../../helpers/Authenticated";
import Assistant from "../../../helpers/Assistant"; 
connectDB();
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getAllExeats(req, res);
      break;
    case "POST":
      await saveExeat(req, res);
      break;
    case "PUT":
      await updateExeat(req, res);
      break;
  }
};

const getAllExeats = Authenticated(async (req, res) => {
  try {
    const { userId } = req;
    const Exeats = await DB.Exeat.find({ staff: userId }).populate(
      "leave",
      "leave_type"
    );
    // console.log({Exeats})
    res.status(200).json(Exeats);
  } catch (err) {
    console.log(err);
  }
});

const saveExeat = Authenticated(async (req, res) => {
  const {
    leave,
    staffId,
    description,
    leave_start_date,
    leave_end_date,
  } = req.body; 
  try {
    if (!leave) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    const days = await Assistant.getDaysDiff(leave_start_date, leave_end_date);
    if (days < 0) {
      res.status(400).json({ error: "Start date must be before the end date" });
    }
    const newExeat = await DB.Exeat({
      days,
      leave,
      description, 
      staff: staffId,
      leave_end_date,
      leave_start_date,
    });
    newExeat.save((err, doc) => {
      if (err) {
        res.status(404).json({
          error: "Exeat was not created",
          err,
        });
      } else {
        res
          .status(201)
          .json({ message: "New Exeat record created successfully" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

const updateExeat = Authenticated(async (req, res) => {
  const data = req.body;
   
  const days = await Assistant.getDaysDiff(data.leave_start_date, data.leave_end_date);
  if (days < 0) {
    res.status(400).json({ error: "Start date must be before the end date" });
  }
  await DB.Exeat.findById(data.id, (error, doc) => {
    if (!error) {
      doc.staff = data.staffId;
      doc.leave = data.leave;
      doc.leave_start_date = data.leave_start_date;
      doc.leave_end_date = data.leave_end_date;
      doc.description = data.description;
      doc.days = days;
      doc.save();
      res.status(200).json({
        message: "Exeat data updated successfully",
      });
    } else {
      return res.status(422).json({ error: "Error updating record" });
    }
  });
});
