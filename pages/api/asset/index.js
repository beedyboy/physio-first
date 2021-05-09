import DB from "../../../models";
import connectDB from "../../../services/database";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getAssets(req, res);
      break;
    case "POST":
      await addAsset(req, res);
      break;
    case "PUT":
      await updateAsset(req, res);
      break;
  }
};

const getAssets = async (req, res) => {
  try {
    const assets = await DB.Asset.find({}).populate("sub_id", "sub_name -_id cat_id");
    return res.status(200).json(assets);
  } catch (err) {
    console.log(err);
  }
};

const addAsset = async (req, res) => {
  const {
    sub_id,
    name: title,
    purchased_price,
    serial,
    company_name,
    condition,
    start_date,
    end_date,
    description,
    purchased_date,
  } = req.body;
  try {
    if (
      !sub_id ||
      !title  
    ) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    await DB.Asset({
      sub_id,
      title,
      purchased_price,
      serial,
      company_name,
      condition,
      start_date,
      end_date,
      description,
      purchased_date,
    }).save();
    res.status(201).json({ message: "New asset added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
};
const updateAsset = async (req, res) => {
  const data = req.body; 

    await DB.Asset.findById(data.id, (error, doc) => {
      if (!error) { 
        doc.sub_id = data.sub_id;
        doc.title = data.title;
        doc.purchased_price = data.purchased_price;
        doc.serial = data.serial;
        doc.company_name = data.company_name;
        doc.condition = data.condition;
        doc.start_date = data.start_date; 
        doc.end_date = data.end_date; 
        doc.description = data.description; 
        doc.purchased_date = data.purchased_date;  
        doc.save();
        res.status(200).json({
          exist,
          check_record,
          message: "Asset updated successfully",
        }); 
    }
     else {
    return res.status(422).json({
      error: "Error updating asset",
  }); 
  }}); 
 
};
