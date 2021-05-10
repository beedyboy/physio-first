import DB from "../../../models";
import connectDB from "../../../services/database";
import Authenticated from "../../../helpers/Authenticated";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getTickets(req, res);
      break;
    case "POST":
      await addTicket(req, res);
      break;
  }
};

const getTickets = Authenticated(async (req, res) => {
  try {
    const { userId } = req;
    const assets = await DB.Ticket.find({ staff: userId })
      .populate("sub_id", "sub_name -_id cat_id")
      .populate("assigned_to", "firstname lastname")
      .populate("staff", "firstname lastname");
    return res.status(200).json(assets);
  } catch (err) {
    console.log(err);
  }
});

const addTicket = Authenticated(async (req, res) => {
  const {
    sub_id,
    name: title,
    purchased_price,
    serial,
    company_name,
    condition,
    start_date,
    end_date,
    description,
    user,
    purchased_date,
  } = req.body;
  try {
    if (!sub_id || !title) {
      return res.status(422).json({ error: "Please add all the fields" });
    }

    const { userId: staff } = req;

    await DB.Ticket({
      sub_id,
      title,
      purchased_price,
      serial,
      company_name,
      condition,
      start_date,
      end_date,
      staff,
      description,
      purchased_date,
    }).save();
    res.status(201).json({ message: "New asset added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});
