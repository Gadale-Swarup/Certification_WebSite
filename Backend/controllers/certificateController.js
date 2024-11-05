
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
    host: "smtp.hostinger.com", // Hostinger's SMTP server
    port: 465, // or 587 for TLS
    secure: true, // Use true for 465, false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Create email options
  const mailOptions = {
    from: `"Wisdom Sprouts IT Training Hub" <${process.env.SMTP_USER}>`,
    to: email, // User-provided email
    subject: `🎉 Congratulations, ${name}! Your Daily Programming Challenge 2024 Certificate 🎓`,
    html: `
    <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
      <h2 style="color: #4CAF50; margin-bottom: 10px;">Hello ${name},</h2>
      
      <p style="font-size: 1.1em;">We are thrilled to congratulate you on successfully participation in the Daily Programming Challenge 2024 organized by Wisdom Sprouts IT Training Hub, Pune! 🌟</p>
      
      <p style="font-size: 1.1em;">Your hard work and dedication have paid off, and it's our pleasure to award you with the attached certificate. This certificate is a testament to your efforts, skills, and commitment to growth.</p>
      
      <p style="font-size: 1.1em;">Feel free to print or share it with your network as you continue on your journey of success!</p>
      
      <div style="border-left: 3px solid #4CAF50; padding-left: 15px; margin-top: 20px;">
        <p style="font-size: 1.2em; color: #555;">Best wishes,</p>
        <p style="font-size: 1.2em; font-weight: bold;">Wisdom Sprouts IT Training Hub</p>
      </div>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />
      
      <footer style="font-size: 0.9em; color: #777;">
        <p>If you have any questions, feel free to reach us at <a href="mailto:support@wisdomsprouts.in" style="color: #4CAF50; text-decoration: none;">helpdesk@wisdomsprouts.in</a>.</p>
        
        <p style="margin-top: 15px;">Stay connected and follow us on social media for updates, tips, and more:</p>
        <p>
          <a href="https://www.instagram.com/wisdomsprouts" style="color: #4CAF50; text-decoration: none; margin-right: 10px;">
            Instagram
          </a> |
          <a href="https://www.linkedin.com/company/wisdom-sprouts-training-and-consulting-solutions" style="color: #4CAF50; text-decoration: none; margin-left: 10px;">
            LinkedIn
          </a>
        </p>
      </footer>
    </div>
  `,
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

// // const generateCertificate = async (req, res) => {
// //   const { name, course, startDate, endDate, awardedDate, certificateNo, email } = req.body;

// //   try {
// //     // Load the certificate background image
// //     const certificateBackground = await loadImage(path.join(__dirname, '../public/img/certificate1.png'));

// //     // Create a canvas with the same dimensions as the background
// //     const canvas = createCanvas(certificateBackground.width, certificateBackground.height);
// //     const ctx = canvas.getContext('2d');

// //     // Draw the background image
// //     ctx.drawImage(certificateBackground, 0, 0);

// //     // Set text properties for the recipient's name
// //     ctx.font = '54px Times New Roman';
// //     ctx.fillStyle = 'black';
// //     ctx.textAlign = 'center';
// //     ctx.fillText(name.toUpperCase(), canvas.width / 2, 770); // Centered name position

// //     // Set consistent line spacing and text properties for the certificate text
// //     ctx.font = '42px Times New Roman';
// //     ctx.fillStyle = 'black';
    
// //     // Start with the first line and increase the y-coordinate by a fixed amount for each subsequent line
// //     let yPosition = 860;
// //     const lineSpacing = 70; // Adjust line spacing as needed for visual alignment
    
// //     ctx.fillText(
// //       `FOR SUCCESSFULLY COMPLETING THE "${course.toUpperCase()}" COURSE`,
// //       canvas.width / 2,
// //       yPosition
// //     );
// //     yPosition += lineSpacing;
// //     ctx.fillText(
// //       `AT WISDOM SPROUTS - IT TRAINING HUB, PUNE. FROM "${startDate.toUpperCase()}" TO`,
// //       canvas.width / 2,
// //       yPosition
// //     );
// //     yPosition += lineSpacing;
// //     ctx.fillText(
// //       `"${endDate.toUpperCase()}". HIS/HER PERFORMANCE HAS BEEN SATISFACTORY SO AS TO FULFILL THE `,
// //       canvas.width / 2,
// //       yPosition
// //     );
// //     yPosition += lineSpacing;
// //     ctx.fillText(
// //       ` REQUIREMENTS FOR SUCCESSFUL COMPLETION OF THE TRAINING.`,
// //       canvas.width / 2,
// //       yPosition
// //     );
// //     yPosition += lineSpacing;
// //     ctx.fillText(
// //       `IN TESTIMONY THEREOF, THIS CERTIFICATE IS AWARDED ON THE ${awardedDate.toUpperCase()}.`,
// //       canvas.width / 2,
// //       yPosition
// //     );

// //     // Add the certificate number at the bottom right
// //     ctx.font = '20px Times New Roman';
// //     ctx.fillText(`CERTIFICATE NO: ${certificateNo.toUpperCase()}`, canvas.width - 150, canvas.height - 40);

// //     // Sanitize the file name to avoid invalid characters
// //     const sanitizeFileName = (name) => {
// //       return name.replace(/[<>:"/\\|?*]/g, '_'); // Replace invalid characters with underscores
// //     };

// //     const fileName = `certificate-${sanitizeFileName(name)}.png`;
// //     const filePath = path.join(__dirname, '../public/img/', fileName); // Ensure this points correctly to the public img directory
// //     const buffer = canvas.toBuffer('image/png');
// //     await fs.writeFileSync(filePath, buffer);
// //     console.log("Saving certificate to:", filePath);

// //     // Send the email after generating the certificate
// //     await sendCertificate(req, res, fileName);

// //   } catch (error) {
// //     console.error("Error generating certificate:", error);
// //     res.status(500).json({ message: "Error generating certificate" });
// //   }
// // };

// const generateCertificate = async (req, res) => {
//   const { name, course, startDate, endDate, awardedDate, certificateNo, email } = req.body;

//   try {
//     // Register your custom font
//     registerFont(path.join(__dirname, '../public/font/Graduate.ttf'), { family: 'Graduate' });

//     // Load the certificate background image
//     const certificateBackground = await loadImage(path.join(__dirname, '../public/img/certificate1.png'));

//     // Create a canvas with the same dimensions as the background
//     const canvas = createCanvas(certificateBackground.width, certificateBackground.height);
//     const ctx = canvas.getContext('2d');

//     // Draw the background image
//     ctx.drawImage(certificateBackground, 0, 0);

//     // Set text properties for the recipient's name using the custom font
//     ctx.font = '54px Graduate'; // Use the registered custom font
//     ctx.fillStyle = 'black';
//     ctx.textAlign = 'center';
//     ctx.fillText(name.toUpperCase(), canvas.width / 2, 770); // Centered name position

//     // Set consistent line spacing and text properties for the certificate text
//     ctx.font = '42px Graduate'; // Use the registered custom font
//     ctx.fillStyle = 'black';

//     let yPosition = 860;
//     const lineSpacing = 70;

//     ctx.fillText(
//       `FOR SUCCESSFULLY COMPLETING THE "${course.toUpperCase()}" COURSE`,
//       canvas.width / 2,
//       yPosition
//     );
//     yPosition += lineSpacing;
//     ctx.fillText(
//       `AT WISDOM SPROUTS - IT TRAINING HUB, PUNE. FROM "${startDate.toUpperCase()}" TO`,
//       canvas.width / 2,
//       yPosition
//     );
//     yPosition += lineSpacing;
//     ctx.fillText(
//       `"${endDate.toUpperCase()}". HIS/HER PERFORMANCE HAS BEEN SATISFACTORY SO AS TO FULFILL THE `,
//       canvas.width / 2,
//       yPosition
//     );
//     yPosition += lineSpacing;
//     ctx.fillText(
//       `REQUIREMENTS FOR SUCCESSFUL COMPLETION OF THE TRAINING.`,
//       canvas.width / 2,
//       yPosition
//     );
//     yPosition += lineSpacing;
//     ctx.fillText(
//       `IN TESTIMONY THEREOF, THIS CERTIFICATE IS AWARDED ON THE ${awardedDate.toUpperCase()}.`,
//       canvas.width / 2,
//       yPosition
//     );

//     // Add the certificate number at the bottom right
//     ctx.font = '42px Graduate'; // Use the registered custom font
//     ctx.fillText(`${certificateNo}`, canvas.width - 150, canvas.height - 40);

//     // Sanitize the file name to avoid invalid characters
//     const sanitizeFileName = (name) => {
//       return name.replace(/[<>:"/\\|?*]/g, '_'); // Replace invalid characters with underscores
//     };

//     const fileName = `certificate-${sanitizeFileName(name)}.png`;
//     const filePath = path.join(__dirname, '../public/img/', fileName);
//     const buffer = canvas.toBuffer('image/png');
//     await fs.promises.writeFile(filePath, buffer); // Use promises with fs
//     console.log("Saving certificate to:", filePath);

//     // Send the email after generating the certificate
//     await sendCertificate(req, res, fileName);

//   } catch (error) {
//     console.error("Error generating certificate:", error);
//     res.status(500).json({ message: "Error generating certificate" });
//   }
// };

// module.exports = { generateCertificate, sendCertificate };
