import DB from "../../../models";
import connectDB from "../../../services/database";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getById(req, res);
      break;
    case "DELETE":
      await removeApp(req, res);
      break;
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.query; 
    const check_record = await DB.Vacation.findById(id) 
    res.status(200).json(check_record);
  } catch (err) {
    console.log(err);
  }
};

const removeApp = async (req, res) => {
  const {  id } = req.query;
  await DB.Vacation.findByIdAndRemove(id, (err, doc) => {
    if (err) {
      return res.status(400).send({
        message: "Invalid details",
        err,
      });
    } else {
      return res.status(200).json({
        message: "Vacation Record Deleted Successfully",
      });
    }
  }).catch((err) => {
    console.log({ err });
    res.status(400).json({ message: "Invalid details", err });
  });
};
