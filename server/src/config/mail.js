const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST, // e.g., smtp.gmail.com
  port: process.env.MAIL_PORT, // 587
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Mail Server Ready to Send Messages");
  }
});

module.exports = transporter;
