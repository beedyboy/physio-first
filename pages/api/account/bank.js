import nextConnect from "next-connect";
import DB from "../../../models";
import connectDB from "../../../services/database";
import Assistant from "../../../helpers/Assistant";
import Authenticated from "../../../helpers/Authenticated";
import middleware from "../../../middleware/middleware";

import dotenv from "dotenv";
import mailer from "../../../helpers/mailer";
import mailTemplate from "../../../utils/emailTemplate/bank.js";
const handler = nextConnect();

dotenv.config();
handler.use(middleware);
connectDB();

handler.put(
  Authenticated(async (req, res) => {
    try {
      const { userId } = req;
      const { sin } = req.body;
      let img = "";
      if (Object.keys(req.files).length !== 0) {
        // console.log("present", req.files);
        var image = JSON.parse(JSON.stringify(req.files)).image;
        await Assistant.uploader(image.path).then((newPath) => {
          // console.log(newPath.url);
          img = newPath.url;
          // fs.unlinkSync(value[0].path);
        });
      }
      // do stuff with files and body

      await DB.User.findById(userId, (error, doc) => {
        if (!error) {
          doc.sin = sin;
          if (img !== "") {
            doc.cheque = img;
          }
          doc.save();
          const email = doc.email;
          const emergency_contact = doc.emergency_contact ?? "";
          const imgUrl = doc.cheque;
          const fullname = doc.lastname + " " + doc.firstname;
          const msgBody = { fullname, emergency_contact, sin, email, imgUrl };
          let clientOptions = {
            email: process.env.ACCOUNT_ADMIN_EMAIL,
            // bcc: process.env.LEAVE_ADMIN_EMAIL2,
            subject: process.env.CLIENT_EMAIL_SUBJECT.replace(
              "{{SUBJECT}}",
              "PaySlip Information"
            ),
            message: mailTemplate.requestEmail(msgBody),
          };
          mailer.sendEmail(clientOptions);
          res.status(200).json({
            message: "Account information updated successfully",
          });
        } else {
          return res.status(422).json({ error: "Error updating your account" });
        }
      });
    } catch (err) {
      res.status(500).json({ error: "internal server error" });
    }
  })
);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
