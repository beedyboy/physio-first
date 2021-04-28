import DB from "../models"; 
import connectDB from "../../../utils/database"; 

export default connectDB(async function (req, res) {
  try {
    const {
      query: { id },
    } = req;

    await DB.User.findOne(id, (err, doc) => {
      //  console.log({doc}, 'id: ', id)
      if (err) {
        return res.status(400).send({ status: false, data: [], err });
      } else {
        return res.status(200).send({
          status: true,
          message: "All Requested Records",
          data: doc,
        });
      }
    }).catch((err) => {
      console.log({ err });
     return res.send({ status: false, err });
    });
  } catch (error) {
    res.status(400).send({ status: false, data: [], error });
  }
})
