import nextConnect from "next-connect";
import DB from "../../../../models";
import connectDB from "../../../../services/database";
import middleware from "../../../../middleware/middleware"; 
import dotenv from "dotenv";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

const handler = nextConnect();

dotenv.config();
handler.use(middleware);
connectDB();

handler.get(async (req, res) => {
  const { params } = req.query; 

if(params.length < 2) {
  return res.status(422).json({ error: "Error getting record", params });
}
  try { 
    const pipeline = [
      {
        $match: {
          $and: [
            { staff: ObjectId(params[0]) },
            { leave: {$regex: params[1],  "$options": "i"}},  
          ],
        },
      }, 
    ];
    const stats = await DB.Exeat.aggregate(pipeline);
    console.log({ stats });
    res.status(200).json(stats);
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
