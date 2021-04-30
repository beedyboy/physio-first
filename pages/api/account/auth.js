import DB from "../../../models";
import connectDB from "../../../services/database";
import { hash } from "bcryptjs"; 
connectDB();

export default async (req, res) => {
  switch (req.method) { 
    case "POST":
      await setRoles(req, res);
      break;
    case "PUT":
      await setLogin(req, res);
      break;
  }
};
  
const setRoles = async (req, res) => { 
  const { priviledges: acl, id } = req.body;   
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
  
const setLogin = async (req, res) => { 
  const { password, id } = req.body;   
 const newPwd = await hash(password, Number(process.env.SECRET));
    await DB.User.findById(id, (error, doc) => {
      if (!error) {
       
        doc.password = newPwd; 
        doc.can_login = true;
        doc.save();
        res.status(200).json({ 
          message: "Login data added successfully",
        });
      } else {
        return res.status(422).json({ error: "Error updating record" });
      }
    });
 
};
