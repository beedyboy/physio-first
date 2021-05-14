import DB from "../../../models";
import connectDB from "../../../services/database";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await DirectorExist(req, res);
      break;
    case "DELETE":
      await removeDirector(req, res);
      break;
  }
};

const DirectorExist = async (req, res) => {
  try {
    const {firstname, lastname, position } = req.body; 
    const firstnameRegex = new RegExp(firstname, "i");
    const check_record = await DB.Director.findOne({
      firstname: firstnameRegex,
      lastname: lastname,
      position: position
    });  
    const exist = check_record ? true : false;
    const message = check_record ? "Duplicate Director not allowed" : null;
    res.status(200).json({ exist, message });
  } catch (err) {
    console.log(err);
  }
};

const removeDirector = async (req, res) => {
  const { id } = req.query;
  await DB.Director.findByIdAndRemove(id, (err, doc) => {
    if (err) {
      return res.status(400).send({
        message: "Invalid details",
        err,
      });
    } else {
      return res.status(200).json({
        message: "Director Record Deleted Successfully",
      });
    }
  }).catch((err) => {
    console.log({ err });
    res.status(400).json({ message: "Invalid details", err });
  });
};
