import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();  // MUST be at the top

console.log("ENV EMAIL:", process.env.SENDER_EMAIL);
console.log("ENV PASS:", process.env.SENDER_PASS);

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/sendMail", async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: process.env.SENDER_EMAIL,
      subject: "New Contact Form Submission",
      html: `
        <strong>Name:</strong> ${name}<br>
        <strong>Email:</strong> ${email}<br>
        <strong>Phone:</strong> ${phone}<br>
        <strong>Message:</strong> ${message}
      `,
    });

    res.json({ message: "Email sent!" });
  } catch (error) {
    console.log("EMAIL ERROR:", error);
    res.status(500).json({ message: "Email failed.", error });
  }
});

app.listen(5001, () => console.log("Server running on http://localhost:5001"));
