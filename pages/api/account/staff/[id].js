import DB from "../../../models";
import connectDB from "../../../services/database";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await myProfile(req, res);
      break; 
  }
};
 

const myProfile = Authenticated(async (req, res) => {
  try {
    const { id } = req.query;
    await DB.User.findById(id, (error, doc) => {
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
