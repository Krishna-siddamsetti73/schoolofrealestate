import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();  // MUST be at the top

const app = express();
app.use(express.json());
app.use(cors());

const getMailConfig = () => {
  const SENDER_EMAIL = process.env.SENDER_EMAIL || process.env.sender_email;
  const SENDER_PASS = process.env.SENDER_PASS || process.env.sender_pass;
  const TO_EMAIL = process.env.TO_EMAIL || process.env.to_email;

  if (!SENDER_EMAIL || !SENDER_PASS || !TO_EMAIL) {
    throw new Error("Missing SENDER_EMAIL, SENDER_PASS, or TO_EMAIL environment variable.");
  }

  return {
    SENDER_EMAIL: SENDER_EMAIL.trim(),
    SENDER_PASS: SENDER_PASS.trim(),
    TO_EMAIL: TO_EMAIL.trim(),
  };
};

app.post("/api/sendmail", async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const { SENDER_EMAIL, SENDER_PASS, TO_EMAIL } = getMailConfig();

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
        <strong>Name:</strong> ${name}<br>
        <strong>Email:</strong> ${email}<br>
        <strong>Phone:</strong> ${phone}<br>
        <strong>Message:</strong> ${message}
      `,
    });

    res.json({ message: "Email sent!" });
  } catch (error) {
    console.error("EMAIL ERROR:", error.message);
    res.status(500).json({
      message: "Email failed.",
      error: error.message,
    });
  }
});
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
