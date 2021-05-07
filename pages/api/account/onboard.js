import DB from "../../../models";
import connectDB from "../../../services/database"; 
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PUT":
      await setOnboard(req, res);
      break;
  }
};

const setOnboard = async (req, res) => {
  const { onBoarding, id } = req.body; 
  const pre_contract = onBoarding.pre_contract;
  const general = onBoarding.general;
  const student = onBoarding.student;
  const para_professional = onBoarding.para_professional;
  const professional = onBoarding.professional;
  const marketing = onBoarding.marketing;
  const management_executive = onBoarding.management_executive;
  const post_contract = onBoarding.post_contract;
  await DB.User.findById(id, (error, doc) => {
    if (!error) {
      doc.pre_contract = pre_contract;
      doc.general = general;
      doc.student = student;
      doc.para_professional = para_professional;
      doc.professional = professional;
      doc.marketing = marketing;
      doc.management_executive = management_executive;
      doc.post_contract = post_contract;
      doc.onboarded = true;
      doc.save();
      res.status(200).json({
        message: "User onboarded successfully",
      });
    } else {
      return res.status(422).json({ error: "Error onboarding user" });
    }
  });
};

 