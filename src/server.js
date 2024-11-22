import nodemailer from "nodemailer";
import express from "express";
import { pingMongodb } from "./db/index.js";
import { Mail } from "./db/models/Mail.js";

const app = express();
app.use(express.json({ limit: "20mb" }));

app.post("/mail/send-email", async (req, res) => {
  const { to, subject, body } = req.body;
  const now = new Date().toISOString(); // Get current timestamp

  try {
    // Store email details in MongoDB
    await Mail.insertMany([{ to, subject, body, sentAt: now }]);

    // Send email using Nodemailer
    // // const transporter = nodemailer.createTransport({
    // //   // Replace with your email provider's settings
    // //   service: "gmail",
    // //   auth: {
    // //     user: "your_email@gmail.com",
    // //     pass: "your_password",
    // //     sentAt: now, // Add the sentAt timestamp
    // //   },
    // // });

    // // const mailOptions = {
    // //   from: "Your Name <your_email@gmail.com>",
    // //   to,
    // //   subject,
    // //   text: body,
    // // };

    // await transporter.sendMail(mailOptions);

    res.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error sending email" });
  }
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, async () => {
  await pingMongodb();
  console.log(`Mail service listening on port ${PORT}`);
});
