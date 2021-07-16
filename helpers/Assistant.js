import { cloudinary } from "../utils/cloudinary";
import crypto from "crypto";
const moment = require("moment");

const Assistant = {
  generateSlug: (data) => {
    let slug = data
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
    return slug;
  },
  getDaysDiff: (start_date, end_date, date_format = "YYYY-MM-DD") => {
    const getDateAsArray = (date) => {
      return moment(date.split(/\D+/), date_format);
    };
    return (
      getDateAsArray(end_date).diff(getDateAsArray(start_date), "days") + 1
    );
  },
  getYear: (date) => {
    return moment(date).format("YYYY");
  },

  useDate: () => {
    const today = new Date();
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var dd = String(today.getDate()).padStart(2, "0");
    return today.getFullYear() + "/" + mm + "/" + dd;
  },

  genToken: () => {
    return crypto.randomBytes(32).toString("hex");
  },
  uploader: async (image) => {
    var reply = null;
    //  console.log({image})
    await cloudinary.uploader
      .upload(image)
      .then((data) => {
        reply = data;
      })
      .catch((err) => {
        console.log(err);
      });

    return reply;
  },
};

module.exports = Assistant;
