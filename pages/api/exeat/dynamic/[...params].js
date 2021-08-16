import DB from "../../../../models";
import connectDB from "../../../../services/database";
connectDB();

export default function handler(req, res) {
    const { params } = req.query
    res.end(`Post: ${params.join(', ')}`)

    try {
        const payload = await DB.Exeat.find({});
        res.status(200).json(payload);
      } catch (err) {
        console.log(err);
      }

  }