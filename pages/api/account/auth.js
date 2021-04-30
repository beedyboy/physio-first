import DB from "../../../models";
import connectDB from "../../../services/database";
connectDB();

export default async (req, res) => {
  switch (req.method) { 
    case "POST":
      await setRoles(req, res);
      break;
    case "PUT":
    //   await updateSub(req, res);
      break;
  }
};
  
const setRoles = async (req, res) => { 
  const { priviledges: acl, id } = req.body;  
  // const acl = JSON.parse(priviledges);
  console.log({acl})
    await DB.User.findById(id, (error, doc) => {
      if (!error) {
        
        doc.acl = acl; 
        doc.save();
        res.status(200).json({ 
          message: "Role updated successfully",
        });
      } else {
        return res.status(422).json({ error: "Error updating record" });
      }
    });
 
};
