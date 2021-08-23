import DB from "../../../models";
import mongoose from "mongoose";
import connectDB from "../../../services/database";
import Authenticated from "../../../helpers/Authenticated";
// import mailer from "../../../helpers/mailer";
connectDB();
const { ObjectId } = mongoose.Types;

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await historyAggregate(req, res);
      break;
    case "PUT":
      await updateVacation(req, res);
      break;
  }
};

// const historyAggregate = Authenticated(async (req, res) => {
//   try {
//     const { date, staff, leave_type } = req.body;
//     const status = "Accepted";
//     const pipeline = [
//       {
//         $match: {
//           $and: [
//             { staff: ObjectId(staff) },
//             { leave_start_date: {$regex: date,  "$options": "i"}},
//             { leave: ObjectId(leave_type) },
//             { status: "Accepted" },
//           ],
//         },
//       },
//       { $group: { "_id": staff, days: { $sum: "$days" }, } }
//     ];
//     const stats = await DB.Vacation.aggregate(pipeline);
//     console.log({ stats });
//     res.status(200).json(stats);
//   } catch (err) {
//     console.log(err);
//   }
// });

const historyAggregate = Authenticated(async (req, res) => {
  try {
    const { date, staff, leave_type } = req.body;
    const status = "Accepted";
    const pipeline = [
      {
        $match: {
          $and: [
            { staff: ObjectId(staff) },
            { leave_start_date: {$regex: date,  "$options": "i"}},
            // { leave: ObjectId(leave_type) },
            { status: "Accepted" },
          ],
        },
      },
      { $group: { "_id": staff, days: { $sum: "$days" }, } }
    ];
    const stats = await DB.Vacation.aggregate(pipeline);
    console.log({ stats });
    res.status(200).json(stats);
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

    await DB.Vacation.findByIdAndUpdate(
      data.id,
      appData,
      { new: true },
      (err, record) => {
        if (record) {
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
