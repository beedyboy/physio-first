import DB from "../../../models";
import connectDB from "../../../services/database";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await userExist(req, res);
      break;
    case "DELETE":
      await removeUser(req, res);
      break;
  }
};

const userExist = async (req, res) => {
  try {
    const { id: email } = req.query; 
    const regex = new RegExp(email, "i");
    const check_record = await DB.User.findOne({email: regex
    });
    console.log({email})
    const exist = check_record ? true : false;
    const message = check_record ? "Duplicate record not allowed" : null;
    res.status(200).json({ exist, message });
  } catch (err) {
    console.log(err);
  }
};

const removeUser = async (req, res) => {
  const { id } = req.query;
  await DB.User.findByIdAndRemove(id, (err, doc) => {
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
