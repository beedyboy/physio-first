import connectDB from "../../../utils/database";
import DB from "../models"; 
import { hash } from "bcryptjs"; 
export default connectDB(async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const all_records = await DB.User.find({});
        res.status(200).json({
          status: true,
          message: "All Requested Records",
          data: all_records,
        });
      } catch (error) {
        res.status(500).send({ status: false, error });
      }
      break;

    case "POST":
      try {
        if (!req.body) {
          res.statusCode = 404;
          res.end("Error");
          return;
        }
        const data = req.body;
        const emailRegex = new RegExp(data.email, "i");
        const check_record = await DB.User.findOne({ email: emailRegex });

        if (check_record) {
          res.status(200).json({
            status: true,
            message: `Record, with email: ${data.email}, already exists`
          });
        } else {
          await DB.User.create({
            email: data.email,
            password: await hash(data.password, Number(process.env.SECRET)),
            fullname: data.fullname,
            username: data.username
          });
  
          res.status(200).json({
            status: true,
            message: "User created successfully"
          });
        }
       
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    case "PUT":
      try {
        if (!req.body) {
          res.statusCode = 404;
          res.end("Error");
          return;
        }
        const data = req.body;
        const emailRegex = new RegExp(data.email, "i");
        const check_record = await DB.User.findOne({ email: emailRegex });

        if (check_record) {
          res.status(200).json({
            status: true,
            message: `Record, with email: ${data.email}, already exists`
          });
        } else {

        let userData = {};
        if (data.fullname) userData.fullname = data.fullname;
        if (data.username) userData.username = data.username;
  
        const user_record = await DB.User.findByIdAndUpdate(id, userData);

        if (!user_record)
          res.status(400).send({
            status: false,
            message: "Invalid ID details",
          });

        res.status(200).send({
          status: true,
          message: "User Record Updated Successfully",
        });
        }
        
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method}  Not Allowed`);
  }
});
