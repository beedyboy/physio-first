import DB from "../../../models";
import connectDB from "../../../services/database";
import Authenticated from "../../../helpers/Authenticated";
import Assistant from "../../../helpers/Assistant";
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
    const tickets = await DB.Ticket.find({ staff: userId }) 
      .populate("assigned_to", "firstname lastname")
      .populate("staff", "firstname lastname");
    return res.status(200).json(tickets);
  } catch (err) {
    console.log(err);
  }
});

const addTicket = Authenticated(async (req, res) => {
  const {
    name: title,
      description,
      email,
      requester,
      category,
      priority,
      user,
  } = req.body;
  try {
    if (!description || !title) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    const ticket_date = Assistant.useDate();
    const { userId: staff } = req;
if(user === "Admin") {
  await DB.Ticket({
    title,
    description, 
    staff,
    ticket_date,
    requester,
    category,
    priority,
  }).save();
} else {
  await DB.Ticket({
    title,
    description, 
    email,
    staff,
    ticket_date,
    requester,
    category,
    priority,
  }).save();
}
   
    res.status(201).json({ message: "New ticket added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});
