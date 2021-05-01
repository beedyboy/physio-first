import DB from "../../../models";
import connectDB from "../../../services/database";
import Authenticated from "../../../helpers/Authenticated";
import Assistant from "../../../helpers/assistant";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getAllVacations(req, res);
      break;
    case "POST":
      await saveVacation(req, res);
      break; 
  }
};

const getAllVacations = Authenticated(async (req, res) => {
  try {
    const { userId } = req;
    const vacations = await DB.Vacation.find({staff: userId}).populate('leave', 'leave_type');
    // console.log({vacations})
    res.status(200).json(vacations);
  } catch (err) {
    console.log(err);
  }
});

const saveVacation = Authenticated(async (req, res) => {
  const { leave, allowed_days, description, leave_start_date, leave_end_date } = req.body;
  const { userId } = req;
  try {
    if (!leave) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    const days = await Assistant.getDaysDiff(leave_start_date, leave_end_date);
    await DB.Vacation({
      days,
      leave,
      description,
      allowed_days,
      staff: userId,
      leave_end_date,
      leave_start_date,
    }).save();
    res.status(201).json({ message: "New Vacation application sent successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
}); 