import nextConnect from "next-connect";
import DB from "../../../../models";
import connectDB from "../../../../services/database";
import middleware from "../../../../middleware/middleware";

import dotenv from "dotenv";
const handler = nextConnect();

dotenv.config();
handler.use(middleware);
connectDB();

handler.get(async (req, res) => {
  const { params } = req.query;
  
  try {
    if(params.length < 2) {
      return res.status(422).json({ error: "Error getting record", params });
    }
    const data = {
    staff: params[0],
    leave: params[1],
  }; 
    const payload = await DB.Exeat.find(data);
    // console.log({payload})
    res.status(200).json(payload);
  } catch (err) {
    console.log(err);
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
