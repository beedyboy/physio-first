import DB from "../../../models";
import connectDB from "../../../services/database";
import Authenticated from "../../../helpers/Authenticated";
connectDB();

export default async (req, res) => {
  switch (req.method) { 
    case "POST":
      await confirmRow(req, res);
      break; 
  }
};

const confirmRow = Authenticated(async (req, res) => {
  try {
    const { userId } = req;
    await DB.Asset.findById(userId, (error, doc) => {
      if (error) {
        res
          .status(401)
          .json({ error: "Your session expired. Please login again" });
      } else {
        res.status(200).json(doc);
      }
    }).populate('branch', 'name');
  } catch (err) {
    console.log(err);
    return res
      .status(401)
      .json({ error: "Your session expired. Please login again" });
  }
});
 