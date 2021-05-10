import DB from "../../../../models";
import connectDB from "../../../../services/database";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getTickets(req, res);
      break; 
    case "PUT":
      await updateTicket(req, res);
      break;
  }
};

const getTickets = async (req, res) => {
  try {
    const assets = await DB.Ticket.find({})
      .populate("sub_id", "sub_name -_id cat_id")
      .populate("assigned_to", "firstname lastname")
      .populate("staff", "firstname lastname");
    return res.status(200).json(assets);
  } catch (err) {
    console.log(err);
  }
};
 
const updateTicket = async (req, res) => {
  const data = req.body;

  await DB.Ticket.findById(data.id, (error, doc) => {
    if (!error) {
      if(data.assigned_to) {
        doc.assigned_to = data.assigned_to;
      }
      if(data.status) {
        doc.status = data.status;
      }
      
      doc.save();
      res.status(200).json({
        exist,
        check_record,
        message: "Ticket updated successfully",
      });
    } else {
      return res.status(422).json({
        error: "Error updating asset",
      });
    }
  });
};
