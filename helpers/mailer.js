const nodemailer = require("nodemailer");

const mailer = {
  getTransporter: () => {
    return nodemailer.createTransport({
      host: process.env.SOLUTION_INFLUX_MAIL_HOST,
      port: process.env.SOLUTION_INFLUX_MAIL_PORT,
      auth: {
        user: process.env.SOLUTION_INFLUX_MAIL_USERNAME,
        pass: process.env.SOLUTION_INFLUX_MAIL_PASSWORD,
      },
      // tls: { secureProtocol: "TLSv1_method" }
    });
  },

  getMailOptions: ({ email, subject, message }) => {
    return {
      from: `${process.env.SOLUTION_INFLUX_EMAIL_FROM_NAME} <${process.env.SOLUTION_INFLUX_EMAIL_FROM_EMAIL}>`,
      to: email,
      subject: subject,
      html: message,
    };
  },

  sendEmail: async (data) => {
    const transporter = mailer.getTransporter();
    const mailOptions = mailer.getMailOptions(data);

    return await transporter.sendMail(mailOptions);
  },
};

module.exports = mailer;
