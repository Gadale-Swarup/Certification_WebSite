const nodemailer = require("nodemailer");

require('dotenv').config(); 

// Send certificate function
const sendCertificate = async (req, res) => {
  const { name, email, certificateData, fileName } = req.body;

  // Basic validation
  if (!name || !email || !certificateData || !fileName) {
    return res.status(400).send("All fields are required.");
  }


  // Check for required environment variables
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return res.status(500).send("Email service is not configured.");
  }

  // Create a transporter for sending emails
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Create email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email, // User-provided email
    subject: `Certificate for ${name}`,
    text: `Dear ${name},\n\nAttached is your certificate for successfully completing the course.\n\nBest regards,\nYour Company`,
    attachments: [
      {
        filename: fileName,
        content: certificateData.split("base64,")[1],
        encoding: "base64",
      },
    ],
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Certificate sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send certificate.");
  }
};

module.exports = { sendCertificate };

