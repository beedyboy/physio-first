import DB from "../../../models";
import connectDB from "../../../services/database";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getAllDocuments(req, res);
      break;
    case "POST":
      await saveDocument(req, res);
      break;
    case "PUT":
      await updateDocument(req, res);
      break;
  }
};

const getAllDocuments = async (req, res) => {
  try {
    const Documents = await DB.Document.find({});
    res.status(200).json(Documents);
  } catch (err) {
    console.log(err);
  }
};

const saveDocument = async (req, res) => {
  const { doc_type, title, description } = req.body;
  try {
    if (!doc_type) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
   await DB.Document({
      doc_type,
      title,
      description,
    }).save();
    res.status(201).json({ message: "New Document added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
};
const updateDocument = async (req, res) => {
  const data = req.body;
  const doc_typeRegex = new RegExp(data.doc_type, "i");
  const check_record = await DB.Document.findOne({ doc_type: doc_typeRegex });
  const exist = check_record
    ? check_record && check_record._id.toString() === data.id
      ? false
      : true
    : false;

  if (exist === false) {
    await DB.Document.findById(data.id, (error, doc) => {
      if (!error) {
        if (check_record.doc_type !== data.doc_type) {
          doc.doc_type = data.doc_type;
        }
        doc.title = data.title;
        doc.description = data.description;
        doc.status = data.status;
        doc.save();
        res.status(200).json({
          exist,
          check_record,
          message: "Document updated successfully",
        });
      } else {
        return res.status(422).json({ error: "Error updating Document" });
      }
    });
  } else {
    return res.status(422).json({
      error: "Duplicate Document is not allowed",
    });
  }
};
