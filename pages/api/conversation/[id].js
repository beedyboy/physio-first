import DB from "../../../models";
import connectDB from "../../../services/database";
import Authenticated from "../../../helpers/Authenticated";  
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getAllConversations(req, res);
      break;
    case "DELETE":
      await removeConversation(req, res);
      break;
  }
};

const getAllConversations = Authenticated(async (req, res) => {
  try {
    const { id } = req.query;
    const data = await DB.Conversation.find({ ticket: id }).populate(
      "Ticket",
      "title"
    );
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

const removeConversation = async (req, res) => {
  const { id } = req.query;
  await DB.Conversation.findByIdAndRemove(id, (err, doc) => {
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
