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
















// const path = require('path');
// const fs = require('fs');
// const Jimp = require('jimp');
// const nodemailer = require('nodemailer');
// require('dotenv').config();

// const Certificate = path.join(__dirname, '../public/img/certificate1.png');
// // If you want to use a custom font later, convert it to .fnt format
// const customFontPath = path.join(__dirname, '../public/font/Graduate-Regular.ttf'); 

// // Send certificate function
// const sendCertificate = async (req, res) => {
//   const { name, email } = req.body;

//   // Basic validation
//   if (!name || !email) {
//     return res.status(400).send("All fields are required.");
//   }

//   // Check for required environment variables
//   if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
//     return res.status(500).send("Email service is not configured.");
//   }

//   // Create a transporter for sending emails
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   });

//   // Create email options
//   const mailOptions = {
//     from: process.env.SMTP_USER,
//     to: email,
//     subject: `Certificate for ${name}`,
//     text: `Dear ${name},\n\nAttached is your certificate for successfully completing the course.\n\nBest regards,\nYour Company`,
//     attachments: [
//       {
//         filename: fileName,
//         path: path.join(__dirname, fileName),
//       },
//     ],
//   };

//   // Send the email
//   try {
//     await transporter.sendMail(mailOptions);
//     res.status(200).send({ message: "Certificate sent successfully!", success: true });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     res.status(500).send({ message: "Failed to send certificate.", success: false });
//   }
// };

// const generateCertificate = async (req, res) => {
//   const { name, course, startDate, endDate, awardedDate, certificateNo, email } = req.body;

//   try {
//     // Load the certificate background image
//     const certificateBackground = await Jimp.read(Certificate);

//     // Load built-in font
//     const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);

//     // Add the name dynamically to the certificate image
//     certificateBackground.print(
//       font,
//       170, // x position
//       800, // y position
//       {
//         text: name,
//         alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
//         alignmentY: Jimp.VERTICAL_ALIGN_TOP,
//       },
//       certificateBackground.bitmap.width - 400 // maxWidth for text
//     );

//     // Add the dynamic course information
//     certificateBackground.print(
//       font,
//       230, // x position
//       800 + 100, // y position (adjusted below the name)
//       {
//         text: `FOR SUCCESSFULLY COMPLETING THE "${course}" COURSE AT WISDOM SPROUTS IT TRAINING HUB, PUNE. FROM "${startDate}" TO "${endDate}". HIS/HER PERFORMANCE HAS BEEN SATISFACTORY SO AS TO FULFILL THE REQUIREMENTS FOR SUCCESSFUL COMPLETION OF THE TRAINING. IN TESTIMONY THEREOF, THIS CERTIFICATE IS AWARDED ON THE ${awardedDate}.`,
//         alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
//         alignmentY: Jimp.VERTICAL_ALIGN_TOP,
//       },
//       certificateBackground.bitmap.width - 400 // maxWidth for text
//     );

//     // Add the certificate number at the bottom
//     certificateBackground.print(
//       font,
//       170, // x position
//       800 + 100 + 200, // y position (adjusted below the course info)
//       {
//         text: `Certificate No: ${certificateNo}`,
//         alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
//         alignmentY: Jimp.VERTICAL_ALIGN_TOP,
//       },
//       certificateBackground.bitmap.width - 400 // maxWidth for text
//     );

//     // Save the image
//     const fileName = `certificate-${name}.png`;
//     const filePath = path.join(__dirname, fileName);
//     await certificateBackground.writeAsync(filePath);

//     // Send the email after generating the certificate
//     await sendCertificate(req, res, fileName, email);

//     // Clean up the file after sending the email
//     // fs.unlinkSync(filePath);
//   } catch (error) {
//     console.error("Error generating certificate:", error);
//     res.status(500).json({ message: "Error generating certificate" });
//   }
// };
// module.exports = {
//    generateCertificate, 
//    sendCertificate };






// const path = require('path');
// const fs = require('fs');
// require('dotenv').config();
// const { createCanvas, loadImage, registerFont } = require('canvas');
// const nodemailer = require('nodemailer');

// // Register a custom font if needed (e.g., Google Fonts like Graduate)
// // Make sure to download and store the font file in the correct directory
// registerFont(path.join(__dirname, '../public/font/Graduate-Regular.ttf'), { family: 'Graduate' });

// // Function to send the certificate via email
// const sendCertificate = async (req, res, fileName) => {
//   const { name, email } = req.body;

//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   });

//   const mailOptions = {
//     from: process.env.SMTP_USER,
//     to: email,
//     subject: `Certificate for ${name}`,
//     text: `Dear ${name},\n\nAttached is your certificate for successfully completing the course.\n\nBest regards,\nYour Company`,
//     attachments: [
//       {
//         filename: fileName,
//         path: path.join(__dirname, `../public/img/${fileName}`), // Correct path to the certificate image
//       },
//     ],
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.status(200).send({ message: "Certificate sent successfully!", success: true });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     res.status(500).send({ message: "Failed to send certificate.", success: false });
//   }
// };

// // Function to generate the certificate

// const generateCertificate = async (req, res) => {
//   const { name, course, startDate, endDate, awardedDate, certificateNo, email } = req.body;

//   try {
//     // Load the certificate background image
//     const certificateBackground = await loadImage(path.join(__dirname, '../public/img/certificate1.png'));

//     // Create a canvas with the same dimensions as the background
//     const canvas = createCanvas(certificateBackground.width, certificateBackground.height);
//     const ctx = canvas.getContext('2d');

//     // Draw the background image
//     ctx.drawImage(certificateBackground, 0, 0);

//     // Set text properties for "CERTIFICATE OF COMPLETION"
//     ctx.font = '54px Graduate'; // Update to match the style in the image
//     ctx.fillStyle = '#2f3e6a'; // Dark blue color matching the image
//     ctx.textAlign = 'center';
//     ctx.fillText('CERTIFICATE OF COMPLETION', canvas.width / 2, 180);

//     // Set text properties for the name (larger, bolded)
//     ctx.font = 'bold 48px Times New Roman';
//     ctx.fillStyle = 'black';
//     ctx.fillText(name.toUpperCase(), canvas.width / 2, 310); // Centered name position

//     // Set text properties for the course information
//     ctx.font = '22px Times New Roman';
//     ctx.fillStyle = 'black';
//     ctx.textAlign = 'center';
//     ctx.fillText(
//       `For successfully completing the "${course}" course at Wisdom Sprouts - IT Training Hub, Pune.`,
//       canvas.width / 2,
//       410
//     );
//     ctx.fillText(`From "${startDate}" to "${endDate}".`, canvas.width / 2, 450);
//     ctx.fillText(
//       `His/Her performance has been satisfactory so as to fulfill the requirements for successful`,
//       canvas.width / 2,
//       490
//     );
//     ctx.fillText(
//       `completion of the training. This certificate is awarded on the ${awardedDate}.`,
//       canvas.width / 2,
//       530
//     );

//     // Add the certificate number at the bottom
//     ctx.font = '20px Times New Roman';
//     ctx.fillStyle = 'black';
//     ctx.fillText(`Certificate No: ${certificateNo}`, canvas.width - 180, canvas.height - 40); // Bottom right position

//     // Sanitize the file name to avoid invalid characters
//     const sanitizeFileName = (name) => {
//       return name.replace(/[<>:"/\\|?*]/g, '_'); // Replace invalid characters with underscores
//     };
    
//     const fileName = `certificate-${sanitizeFileName(name)}.png`;
//     const filePath = path.join(__dirname, '../public/img/', fileName); // Ensure this points correctly to the public img directory
//     const buffer = canvas.toBuffer('image/png');
//     await fs.writeFileSync(filePath, buffer);
//     console.log("Saving certificate to:", filePath);

//     // Send the email after generating the certificate
//     await sendCertificate(req, res, fileName);

//   } catch (error) {
//     console.error("Error generating certificate:", error);
//     res.status(500).json({ message: "Error generating certificate" });
//   }
// };


// module.exports = { generateCertificate, sendCertificate };
