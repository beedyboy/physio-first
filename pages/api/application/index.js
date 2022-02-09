import DB from "../../../models";
import connectDB from "../../../services/database";
import Authenticated from "../../../helpers/Authenticated";
import mailer from "../../../helpers/mailer";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getAllVacations(req, res);
      break;
    case "POST":
      await getHistory(req, res);
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

const getHistory = Authenticated(async (req, res) => {
  try {
    const { leave_type, staff } = req.body;
    const leave = new RegExp(leave_type, "i");
    const vacations = await DB.Vacation.find({
      leave: leave_type,
      staff: staff,
    })
      .populate("leave", "leave_type")
      .populate("staff", "firstname lastname _id");
    console.log({ vacations });
    res.status(200).json(vacations);
  } catch (err) {
    console.log(err);
  }
});

const updateVacation = Authenticated(async (req, res) => {
  const data = req.body;
  try {
    let appData = {};
    if (data.remark) appData.remark = data.remark;
    if (data.status) appData.status = data.status;
    const userId = data.staffId;
    await DB.Vacation.findByIdAndUpdate(
      data.id,
      appData,
      { new: true },
      (err, record) => {
        if (record) {
          DB.User.findById(userId, (error, doc) => {
            if (!error) {
              const userData = {
                email: doc.email,
                subject: process.env.CLIENT_EMAIL_SUBJECT.replace(
                  "{{SUBJECT}}",
                  "Vacation Update"
                ),
                message: `Your vacation application has been  ${data.status}`,
              };

              mailer.sendEmail(userData);
            }
          });

          res
            .status(200)
            .json({ message: `Application ${data.status} successfully` });
        } else {
          res.status(422).json({ error: "Error updating application" });
        }
      }
    );
  } catch (err) {
    console.log({ err });
    res.status(500).json({ error: "internal server error!" });
  }
});
