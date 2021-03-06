import DB from "../../../models";
import { genSaltSync, hashSync, compareSync } from "bcryptjs";
import crypto from "crypto";
import mailer from "../../../helpers/mailer";
import connectDB from "../../../services/database";
import mailTemplate from "../../../utils/emailTemplate/auth.js";

const clientURL = process.env.CLIENT_URL;
connectDB();
export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await recoveryRequest(req, res);
      break;
    case "PUT":
      await resetNow(req, res);
      break;
  }
};

const recoveryRequest = async (req, res) => {
  try {
    if (!req.body) {
      res.statusCode = 404;
      res.end("Error");
      return;
    }
    const { email } = req.body;
    const user = await DB.User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "user doesn't exist" });
    }
    // check if there is a token already
    const token = await DB.Token.findOne({ staff: user._id });
    let resetToken = crypto.randomBytes(32).toString("hex");
    const salt = genSaltSync();
    const hash = hashSync(resetToken, salt);
    const recoveryUrl = `${clientURL}/auth/${resetToken}/${user._id}`;
    const fullname = user.lastname + " " + user.firstname;
    const msgBody = { fullname, email, recoveryUrl };
    let clientOptions = {
      email: user.email,
      subject: process.env.CLIENT_EMAIL_SUBJECT.replace(
        "{{SUBJECT}}",
        "Password Recovery"
      ),
      message: mailTemplate.requestEmail(msgBody),
    };
    if (token) {
      //    delete or send available
      await DB.Token.findByIdAndDelete({ _id: token._id });
      mailer.sendEmail(clientOptions);
      res.status(201).json({
        recoveryUrl,
        message: "We have sent a password recover instructions to your email.",
      });
    } else {
      await DB.Token({ staff: user._id, token: hash }).save();
      mailer.sendEmail(clientOptions);

      // console.log({clientOptions})
      res.status(201).json({
        recoveryUrl,
        fullname,
        message: "We have sent a password recover instructions to your email.",
      });
    }
  } catch (err) {
    return res
      .status(401)
      .json({ error: "request error! please try again later...", err });
  }
};
const resetNow = async (req, res) => {
  try {
    const { staff_id, token, password } = req.body;
    console.log({ staff_id });
    const passwordResetToken = await DB.Token.findOne({ staff: staff_id });
    if (!passwordResetToken) {
      res
        .status(401)
        .json({ message: "Invalid or expired password reset token" });
    }
    const isValid = await compareSync(token, passwordResetToken.token);

    if (!isValid) {
      res
        .status(401)
        .json({ error: "Invalid or expired password reset token" });
    }

    const salt = genSaltSync();
    const hash = hashSync(password, salt);
    const data = {
      password: hash,
    };
    const filter = { _id: staff_id };
    const user_record = await DB.User.findOneAndUpdate(filter, data);
    if (user_record) {
      res.status(200).json({ message: "Password changed  successfully" });
    } else {
      return res.status(422).json({ error: "Error updating password" });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ error: "reset error! please try again later..." });
  }
};
