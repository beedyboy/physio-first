import DB from "../../models";
import connectDB from "../../../../utils/database";

export default connectDB(async function (req, res) {
  try {
    const {
      query: { uid },
    } = req;

    const user_record = await DB.User.findByIdAndRemove(uid);
    if (!user_record) {
      return res.send({
        status: false,
        message: "Invalid ID details",
      });
    } else {
      return res.send({
        status: true,
        message: "User Record Deleted Successfully",
      });
    }
  } catch (error) {
    res.status(400).send({ status: false, data: [], error });
  }
});
