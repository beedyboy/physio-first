import DB from "../../../models";
import connectDB from "../../../services/database"; 
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

connectDB();
export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        if (!req.body) {
          res.statusCode = 404;
          res.end("Error");
          return;
        }
        const { email, password } = req.body;
        const user = await DB.User.findOne({ email });
        if (!user) {
          return res.status(404).json({ error: "user doesn't exist" });
        }
        const check_password = await compare(password, user.password);
        if (!check_password) {
          return res
            .status(401)
            .json({ error: "email or password dont match" });
        }

        const token = await sign(
          { _id: user._id },
          `${process.env.SECRET_KEY}`
        );

        user.token = token;
        user.save();

        res.status(201).json({
          message: "Login successful",
          data: { token, user },
        });
      } catch (error) {
        return res.status(401).json({ error: "email or password dont match" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method}  Not Allowed`);
  }
};
