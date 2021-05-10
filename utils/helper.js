const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import { sendEmail } from "../helpers/mailer";
import mailTemplate from "./emailTemplate/auth";
// const { cloudinary } = require('./cloudinary');

const helper = {
  generateSlug: (data) => {
    let slug = data
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
    return slug;
  },


  getRandomNo: () => {
    var i = new Date().getTime();
    i = i & 0xffffff;
    return i;
  },

  hash: (password) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
  },

  generateToken: (user) => {
    try {
      var token = jwt.sign(user.id, process.env.SECRET_KEY);
      return token;
    } catch (err) {
      console.log("error", err);
    }
  },

  getRandomizer: (bottom, top) => {
    return Math.floor(Math.random() * (1 + top - bottom)) + bottom;
  },

  generateOTP: () => {
    var rollDie = helper.getRandomizer(0, 9);

    var results = "";
    for (var i = 0; i < 7; i++) {
      results += rollDie + " "; //make a string filled with 1000 random numbers in the range 1-6.
    }
    return results;
  },
  is_inputs_valid: ({ full_name, email, phone_number, subject, message }) => {
    return !full_name || !email || !phone_number || !subject || !message;
  },
  send_mail_to_client: async ({ email, subject }) => {
    try {
      const clientOptions = {
        email,
        subject: process.env.CLIENT_EMAIL_SUBJECT.replace(
          "{{SUBJECT}}",
          subject
        ),
        message: mailTemplate.clientEmail(subject),
      };
      await sendEmail(clientOptions);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  send_mail_to_admin: async ({
    full_name,
    email,
    phone_number,
    subject,
    message,
  }) => {
    try {
      let adminOptions = {
        email: process.env.ADMIN_EMAIL,
        subject: process.env.ADMIN_EMAIL_SUBJECT.replace(
          "{{SUBJECT}}",
          subject
        ),
        message: mailTemplate.adminEmail({
          full_name,
          email,
          phone_number,
          subject,
          message,
        }),
      };
      await sendEmail(adminOptions);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  // uploader: async (image) => {
  //   var reply = null;
  //   //  console.log({image})
  //   await cloudinary.uploader.upload(image)
  //     .then(data => {
  //       reply = data;
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });

  //   return reply;
  // },

  // uploader2: async (file) => {
  //   var reply = null;
  //   const image = dataUri(file).content;
  //   await cloudinary.uploader.upload(image)
  //     .then(data => {
  //       reply = data;
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });

  //   return reply;

  // }
};

module.exports = helper;
