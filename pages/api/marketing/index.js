import DB from "../../models";
import connectDB from "../../services/database";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getallMarketing(req, res);
      break;
    case "POST":
      await saveMarketing(req, res);
      break;
    case "PUT":
      await updateMarketing(req, res);
      break;
  }
};

const getallMarketing = async (req, res) => {
  try {
    const categories = await DB.Marketing.find({});
    res.status(200).json(categories);
  } catch (err) {
    console.log(err);
  }
};

const saveMarketing = async (req, res) => {
  const { url_link, description } = req.body;
  try {
    if (!url_link) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    const marketing = await DB.Marketing({
      url_link,
      description,
    }).save();
    res.status(201).json({ message: "New link added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
};
const updateMarketing = async (req, res) => { 
  const data = req.body; 
  console.log({ data });
  const url_linkRegex = new RegExp(data.url_link, "i");
  const check_record = await DB.Marketing.findOne({ url_link: url_linkRegex });  
  const exist = check_record
    ? check_record && check_record._id.toString() === data.id
      ? false
      : true
    : false;

    
  if (exist === false) {
    await DB.Marketing.findById(data.id, (error, doc) => {
      if (!error) {
        if (check_record.url_link !== data.url_link) {
          doc.url_link = data.url_link;
        }
        doc.description = data.description;
        doc.status = data.status;
        doc.save();
        res.status(200).json({
          exist,
          check_record,
          message: "Marketing updated successfully",
        });
      } else {
        return res.status(422).json({ error: "Error updating Marketing" });
      }
    });
  } else {
    return res.status(422).json({ 
      error: "Duplicate marketing url_link is not allowed",
    });
  }
 
};
