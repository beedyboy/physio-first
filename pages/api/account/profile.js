import DB from "../../../models";
import connectDB from "../../../services/database";
import Authenticated from "../../../helpers/Authenticated";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await myProfile(req, res);
      break;
    case "POST":
      await signDoc(req, res);
      break;
    case "PUT":
      await updateProfile(req, res);
      break;
  }
};

const myProfile = Authenticated(async (req, res) => {
  try {
    const { userId } = req;
    await DB.User.findById(userId, (error, doc) => {
      if (error) {
        res
          .status(401)
          .json({ error: "Your session expired. Please login again" });
      } else {
        res.status(200).json(doc);
      }
    }).populate('branch', 'name');
  } catch (err) {
    console.log(err);
    return res
      .status(401)
      .json({ error: "Your session expired. Please login again" });
  }
});

const updateProfile = Authenticated(async (req, res) => {
  const data = req.body;
  const { userId } = req;

  await DB.User.findById(userId, (error, doc) => {
    if (!error) {
      doc.firstname = data.firstname;
      doc.lastname = data.lastname;
      doc.phone_number = data.phone;
      doc.position = data.position;
      doc.alergies = data.alergies;
      doc.dob = data.dob;
      doc.staffId = data.staffId;

      doc.emergency_contact = data.emergency_contact;
      doc.emergency_phone = data.emergency_phone;
      doc.address = data.address;
      doc.position = data.position;
      doc.alergies = data.alergies;
      doc.status = data.status;
      doc.save();
      res.status(200).json({
        message: "Profile updated successfully",
      });
    } else {
      return res.status(422).json({ error: "Error updating your profile" });
    }
  });
});

const signDoc = Authenticated(async (req, res) => {
  const data = req.body;
  const { userId } = req;

  await DB.User.findById(userId, (error, doc) => {
    if (!error) {
      doc.signature = data.signature;
      doc.signed = true;
      doc.save();
      res.status(200).json({
        message: "Document signed successfully",
      });
    } else {
      return res.status(422).json({ error: "Error signing the document" });
    }
  });
});
