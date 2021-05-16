import nextConnect from "next-connect";
import DB from "../../../models";
import connectDB from "../../../services/database"; 
import Assistant from "../../../helpers/Assistant";
import middleware from '../../../middleware/middleware';
// import { IncomingForm } from 'formidable'

import dotenv from "dotenv"; 
const handler = nextConnect();

dotenv.config();
handler.use(middleware); 
connectDB(); 
  
// const updateDirector = async (req, res) => {
//   const data = req.body; 
  
//     await DB.Director.findById(data.id, (error, doc) => {
//       if (!error) {
        
//         doc.firstname = data.firstname;
//         doc.lastname = data.lastname;
//         doc.position = data.position;
//         doc.date_joined = data.date_joined;
//         doc.story = data.story;
//         doc.save();
//         res.status(200).json({ 
//           message: "Director updated successfully",
//         });
//       } else {
//         return res.status(422).json({ error: "Error updating Director" });
//       }
//     }); 
// };

handler.post(async (req, res) => {
  try {
   
  const { firstname, lastname, position, story, date_joined } = req.body;
    let urls = [];
    var image = JSON.parse(JSON.stringify(req.files)).image;
console.log('image', image.path)
    // var imageSize = Object.keys(image).length; 
    // let count = 0;

    // if (imageSize > 0) {
       
    //   for (const [key, value] of Object.entries(image)) {
    //     console.log("path: ", key);
    //     await Assistant.uploader(value.path).then((newPath) => {
    //       console.log(newPath.url);
    //       urls.push(newPath.url);
    //       // fs.unlinkSync(value[0].path);
    //     });
    //     count += 1;
    //   }
    // }
    await Assistant.uploader(image.path).then((newPath) => {
      console.log(newPath.url);
      urls.push(newPath.url);
      // fs.unlinkSync(value[0].path);
    });
    // do stuff with files and body
 
      let images = JSON.stringify(urls);
      const newDirector = await DB.Director({
        firstname,
        lastname,
        position,
        images: images,
        date_joined,
        story,
      });
      
      newDirector.save((err, doc) => {
        if (err) {
          res.status(404).json({
            error: "Director was not created",
            err
          });
        } else {
          res.status(201).json({ message: "New director created successfully" });
        }
        
      }); 
  } catch (err) {
    res.status(500).json({ error: "internal server error" });
  }
});


handler.get(async (req, res) => {
  try {
    const directors = await DB.Director.find({});
    res.status(200).json(directors);
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
