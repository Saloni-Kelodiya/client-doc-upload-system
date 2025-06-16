import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

await transporter.sendMail({
  from: process.env.EMAIL,
  to: req.user.email,
  subject: "Document Uploaded",
  text: `File ${req.file.originalname} uploaded.`,
});
