import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const tokenSchema = new mongoose.Schema(
  {
    staff: {
      type: ObjectId,
      ref: "User",
      required: true
    }, 
    token: {
      type: String, 
      required: true
    },  
    createdAt: {
      type: Date, 
      default: Date.now(),
      expires: 3600, //expires in one hour
    }, 
  },
);

export default mongoose.models.Token || mongoose.model("Token", tokenSchema);
 



// function generateRefreshToken(user, ipAddress) {
//   // create a refresh token that expires in 7 days
//   return new db.RefreshToken({
//       user: user.id,
//       token: randomTokenString(),
//       expires: new Date(Date.now() + 7*24*60*60*1000),
//       createdByIp: ipAddress
//   });
// }

// function randomTokenString() {
//   return crypto.randomBytes(40).toString('hex');
// }
