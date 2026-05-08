import nodemailer from "nodemailer";

const getMailConfig = () => {
  const SENDER_EMAIL = process.env.SENDER_EMAIL;
  const SENDER_PASS = process.env.SENDER_PASS;
  const TO_EMAIL = process.env.TO_EMAIL;

  if (!SENDER_EMAIL || !SENDER_PASS || !TO_EMAIL) {
    throw new Error("Missing SENDER_EMAIL, SENDER_PASS, or TO_EMAIL environment variable.");
  }

  return {
    SENDER_EMAIL: SENDER_EMAIL.trim(),
    SENDER_PASS: SENDER_PASS.trim(),
    TO_EMAIL: TO_EMAIL.trim(),
  };
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const { name, email, phone, message } = req.body || {};

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

    return res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.error("EMAIL ERROR:", error.message);

    return res.status(500).json({
      message: "Email failed.",
      error: error.message,
    });
  }
}
