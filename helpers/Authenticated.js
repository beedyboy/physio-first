import jwt from "jsonwebtoken";

function Authenticated(icomponent) {
  return (req, res) => {
    const { authorization } = req.headers;
   if(authorization === undefined) {
    return res.status(401).json({ error: "you must logged in" });
   } else {
    const bearer = authorization.split(" ")[1];
    // console.log({bearer})
        if (!bearer || bearer === 'null' || bearer === null) {
          return res.status(401).json({ error: "you must logged in" });
        }
        try {
          const { _id } = jwt.verify(bearer, process.env.SECRET_KEY);
          //   console.log({_id})
          req.userId = _id;
          return icomponent(req, res);
        } catch (err) {
          console.log(err);
          return res.status(401).json({ error: "you must logged in" });
        }
   }
  };
}

export default Authenticated;
