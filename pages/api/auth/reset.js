import connectDB from "../../../utils/database";
import DB from "../models";
import { compare, hash } from "bcryptjs";
export default connectDB(async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        if (!req.body) {
          res.statusCode = 404;
          res.end("Error");
          return;
        }
        const { email, password, newpassword } = req.body;
        const user = await DB.User.findOne({ email });
        if (!user) {

          res.status(200).json({
            status: false,
            message: "Invalid user information",
          });
          }

        const check_password = await compare(password, user.password);
        if (!check_password) {

        res.status(200).json({
          status: false,
          message: "Invalid user information",
        });
        }

        const changedPassword = await hash(
          newpassword,
          Number(process.env.SECRET)
        );

        user.password = changedPassword;
        user.save();

        res.status(200).json({
          status: true,
          message: "Password changed successfully",
        });
      } catch (error) {
        res.status(200).json({ success: false, error });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method}  Not Allowed`);
  }
});
