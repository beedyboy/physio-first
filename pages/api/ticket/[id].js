import DB from "../../../models";
import connectDB from "../../../services/database";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getSingleAsset(req, res);
      break;
    case "DELETE":
      await removeAsset(req, res);
      break;
  }
};

const getSingleAsset = async (req, res) => {
  try {
    const { id } = req.query;
    await DB.Asset.findById(id, (error, doc) => {
      if (error) {
        res.status(401).json({ error: "Invalid asset details" });
      } else {
        res.status(200).json(doc);
      }
    }).populate("sub_id", "sub_name -_id cat_id");
  } catch (err) {
    console.log(err);
  }
};

const removeAsset = async (req, res) => {
  const { id } = req.query;
  await DB.Asset.findByIdAndRemove(id, (err, doc) => {
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
