import DB from "../../../models";
import connectDB from "../../../services/database";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await marketingExist(req, res);
      break;
    case "DELETE":
      await removeMarketing(req, res);
      break;
  }
};

const marketingExist = async (req, res) => {
  try {
    const { id } = req.query;
    const nameRegex = new RegExp(id, "i");
    const check_record = await DB.Marketing.findOne({ name: nameRegex });
    const exist = check_record ? true : false;
    const message = check_record ? "Duplicate Marketing not allowed" : null;
    res.status(200).json({ exist, message });
  } catch (err) {
    console.log(err);
  }
};

const removeMarketing = async (req, res) => {
  const { id } = req.query;
  await DB.Marketing.findByIdAndRemove(id, (err, doc) => {
    if (err) {
      return res.status(400).send({
        message: "Invalid details",
        err,
      });
    } else {
      return res.status(200).json({
        message: "Marketing Record Deleted Successfully",
      });
    }
  }).catch((err) => {
    console.log({ err });
    res.status(400).json({ message: "Invalid details", err });
  });
};
