import connectDB from "../../../utils/database";
import DB from "../models"; 
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
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
        const { email, password } = req.body;
        const user = await DB.User.findOne({ email });
        if (!user) throw new Error();
  
        const check_password = await compare(password, user.password);
        if (!check_password) throw new Error();
  
        const token = await sign({ _id: user._id }, `${process.env.SECRET_KEY}`);
  
        user.token = token;
        user.save(); 
       
        res.status(200).json({
          status: true,
          message: "Login successful",
          data: { token, user }
        });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
 
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method}  Not Allowed`);
  }
});
