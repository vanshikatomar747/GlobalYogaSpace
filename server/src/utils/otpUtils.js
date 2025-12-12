// Generate OTP
export const sendOtpWhatsApp = (phone) => {
  // Example OTP sending logic
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(`Sending OTP ${otp} to WhatsApp number ${phone}`);
  return otp;
};

import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || 'smtp.ethereal.email',
  port: process.env.MAIL_PORT || 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

// Example email sending stub
export const sendOtpEmail = async (email, otp) => {
  console.log(`Sending OTP ${otp} to email ${email}`);
  try {
    const info = await transporter.sendMail({
      from: '"GlobalYogaSpace" <no-reply@globalyogaspace.com>',
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}`,
      html: `<b>Your OTP is ${otp}</b>`,
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
