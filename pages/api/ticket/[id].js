import DB from "../../../models";
import connectDB from "../../../services/database";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getSingleTicket(req, res);
      break;
    case "DELETE":
      await removeTicket(req, res);
      break;
  }
};

const getSingleTicket = async (req, res) => {
  try {
    const { id } = req.query;
    await DB.Ticket.findById(id, (error, doc) => {
      if (error) {
        res.status(401).json({ error: "Invalid ticket details" });
      } else {
        res.status(200).json(doc);
      }
    })
      .populate("sub_id", "sub_name -_id cat_id")
      .populate("assigned_to", "firstname lastname")
      .populate("staff", "firstname lastname");
  } catch (err) {
    console.log(err);
  }
};

const removeTicket = async (req, res) => {
  const { id } = req.query;
  await DB.Ticket.findByIdAndRemove(id, (err, doc) => {
    if (err) {
      return res.status(400).send({
        message: "Invalid details",
        err,
      });
    } else {
      return res.status(200).json({
        message: "Record Deleted Successfully",
      });
    }
  }).catch((err) => {
    console.log({ err });
    res.status(400).json({ message: "Invalid details", err });
  });
};
