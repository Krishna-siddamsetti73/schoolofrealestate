import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const getMailConfig = () => {
  const SENDER_EMAIL = process.env.SENDER_EMAIL;
  const SENDER_PASS = process.env.SENDER_PASS;
  const TO_EMAIL = process.env.TO_EMAIL;

  if (!SENDER_EMAIL || !SENDER_PASS || !TO_EMAIL) {
    throw new Error("Missing environment variables");
  }

  return {
    SENDER_EMAIL,
    SENDER_PASS,
    TO_EMAIL,
  };
};

app.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    const { SENDER_EMAIL, SENDER_PASS, TO_EMAIL } =
      getMailConfig();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: SENDER_EMAIL,
        pass: SENDER_PASS,
      },
    });

    await transporter.sendMail({
      from: SENDER_EMAIL,
      replyTo: email,
      to: TO_EMAIL,
      subject: "New Contact Form Submission from HSRE",
      html: `
        <strong>Name:</strong> ${name}<br/>
        <strong>Email:</strong> ${email}<br/>
        <strong>Phone:</strong> ${phone}<br/>
        <strong>Message:</strong> ${message}
      `,
    });

    return res.status(200).json({
      message: "Email sent successfully",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

export default app;