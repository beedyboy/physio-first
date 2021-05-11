import DB from "../../../models";
import connectDB from "../../../services/database";
import { multerUploads } from "../../../helpers/multer";
import Assistant from "../../../helpers/Assistant";
connectDB();
var upload = multerUploads.single("image");
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getDirectors(req, res);
      break;
    case "POST":
      await saveDirector(req, res);
      break;
    case "PUT":
      await updateDirector(req, res);
      break;
  }
};

const getDirectors = async (req, res) => {
  try {
    const directors = await DB.Director.find({});
    res.status(200).json(directors);
  } catch (err) {
    console.log(err);
  }
};

const saveDirector = upload(async (req, res) => {
  const { firstname, lastname, position, story, date_joined } = req.body;
  try {
    if (!firstname || !lastname || !position) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    var image = req.file;
    let images = "";

    var count = 0;
    await Assistant.uploader(image).then((newPath) => {
      console.log(newPath.url);
      images = newPath.url;
      count += 1;
    });
    if (count === 1) {
      await DB.Director({
        firstname,
        lastname,
        position,
        date_joined,
        story,
      }).save();
      res.status(201).json({ message: "New director created successfully" });
    } else {
      res.status(404).json({
        error: "Director was not created",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});
const updateDirector = async (req, res) => {
  const data = req.body;
  console.log({ data });
  const url_linkRegex = new RegExp(data.url_link, "i");
  const check_record = await DB.Director.findOne({ url_link: url_linkRegex });
  const exist = check_record
    ? check_record && check_record._id.toString() === data.id
      ? false
      : true
    : false;

  if (exist === false) {
    await DB.Director.findById(data.id, (error, doc) => {
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
          message: "Director updated successfully",
        });
      } else {
        return res.status(422).json({ error: "Error updating Director" });
      }
    });
  } else {
    return res.status(422).json({
      error: "Duplicate Director url_link is not allowed",
    });
  }
};
