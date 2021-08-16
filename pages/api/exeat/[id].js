import DB from "../../../models";
import connectDB from "../../../services/database";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await DocumentExist(req, res);
      break;
    case "DELETE":
      await removeDocument(req, res);
      break;
  }
};

const DocumentExist = async (req, res) => {
  try {
    const { id } = req.query;
    const nameRegex = new RegExp(id, "i");
    const check_record = await DB.Document.findOne({ doc_type: nameRegex });
    const exist = check_record ? true : false;
    const message = check_record ? "Duplicate Document not allowed" : null;
    res.status(200).json({ exist, message });
  } catch (err) {
    console.log(err);
  }
};

const removeDocument = async (req, res) => {
  const {  id } = req.query;
  await DB.Document.findByIdAndRemove(id, (err, doc) => {
    if (err) {
      return res.status(400).send({
        message: "Invalid details",
        err,
      });
    } else {
      return res.status(200).json({
        message: "Document Record Deleted Successfully",
      });
    }
  }).catch((err) => {
    console.log({ err });
    res.status(400).json({ message: "Invalid details", err });
  });
};
