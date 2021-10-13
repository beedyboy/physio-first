// import * as Sentry from '@sentry/nextjs'
import DB from "../../../../models";
import connectDB from "../../../../services/database"; 
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
 async function handler(req, res) {
  const {
    query: { params },
    method,
  } = req;
  await connectDB();

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const pipeline = [
          {
            $match: {
              $and: [
                { staff: ObjectId(params[0]) },
                { leave: { $regex: params[1], $options: "i" } },
              ],
            },
          },
        ];
        const stats = await DB.Exeat.aggregate(pipeline);
        // console.log({ stats });
        res.status(200).json(stats);
      } catch (err) {
        throw new Error(err)
        // console.log(err);
        // Sentry.captureException(error)
      }
      break 

    case 'DELETE' /* Delete a model by its ID */:
      const {  id } = params; 
      try {
        const deletedData = await DB.Exeat.deleteOne({ _id: id })
        if (!deletedData) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {}, message: "Document Record Deleted Successfully", })
      } catch (error) {
        res.status(400).json({ success: false, message: "Invalid details", error })
      }
      break

    default:
      try {
        throw new Error('Default Server Error')
      } catch (error) {
        // Sentry.captureException(error)
      }
      // res.status(400).json({ success: false })
      break
  }
} 




// async function handler(req, res) {


//   // Flushing before returning is necessary if deploying to Vercel, see
//   // https://vercel.com/docs/platform/limits#streaming-responses
//   await Sentry.flush(2000)
//   res.status(200).json({ name: 'John Doe' })
// }

// export default Sentry.withSentry(handler)
export default handler;