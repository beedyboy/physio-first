import DB from "../../../models";
import connectDB from "../../../services/database";
import Authenticated from "../../../helpers/Authenticated"; 
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getAllVacations(req, res);
      break;
    case "PUT":
      await updateVacation(req, res);
      break;
  }
};

const getAllVacations = Authenticated(async (req, res) => {
  try {
    const vacations = await DB.Vacation.find({})
      .populate("leave", "leave_type")
      .populate("staff", "firstname lastname _id");
    res.status(200).json(vacations);
  } catch (err) {
    console.log(err);
  }
});

const updateVacation = Authenticated(async (req, res) => {
  const data = req.body;
  try {
    await DB.Vacation.findById(data.id, (error, doc) => {
      if (!error) {
        doc.remark = data.remark;
        doc.status = data.status;
        doc.save();
        res.status(200).json({
          message: `Application ${status} successfully`,
        });
      } else {
        return res.status(422).json({ error: "Error updating application" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});