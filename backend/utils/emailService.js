// utils/emailService.js
import nodemailer from "nodemailer";

const sendWelcomeEmail = async (email, name) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // or any other email service
    auth: {
      user: process.env.EMAIL_USER, // your email
      pass: process.env.EMAIL_PASS, // your email password or app password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Welcome to Tomato!",
    text: `Hi ${name},\n\nWelcome to Tomato!\n\nWe're thrilled to have you join our community of food lovers. With just a few clicks, you can explore a wide variety of delicious meals.\n\nTo get started, simply log in to your account, browse our menu, and place your first order! If you have any questions or need assistance, our support team is always here to help.\n\nThank you for choosing us!\n\nBest regards,\nThe Tomato Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export { sendWelcomeEmail };
