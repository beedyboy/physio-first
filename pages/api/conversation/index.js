import DB from "../../../models";
import connectDB from "../../../services/database";
import Authenticated from "../../../helpers/Authenticated";
connectDB();
export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await saveConversation(req, res);
      break; 
  }
};

const saveConversation = Authenticated(async (req, res) => {
  const { ticket, description, respondent } = req.body;
  try {
    if (!ticket || !description) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    await DB.Conversation({
      ticket,
      description,
      respondent,
    }).save();

    res.status(201).json({ message: "New Conversation sent successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});
