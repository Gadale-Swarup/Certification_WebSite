import React, { useState } from "react";
import ReactDOM from 'react-dom'; // Import ReactDOM
import html2canvas from "html2canvas";
import * as XLSX from 'xlsx';
import certificateBackground from "../img/certificate1.png"; // Path to your certificate background

const FileUploadComponent = () => {
  const [file, setFile] = useState(null);
  const [certificates, setCertificates] = useState([]);

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Function to read Excel and extract certificate data
  const processExcelFile = async (file) => {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    // Assuming each row contains the necessary fields
    const certs = jsonData.map(row => {
      const { name, course, startDate, endDate, awardedDate, certificateNo, email } = row;
      return { name, course, startDate, endDate, awardedDate, certificateNo, email };
    });

    setCertificates(certs);
  };

  // Function to generate certificate HTML
  const generateCertificateHTML = ({ name, course, startDate, endDate, awardedDate, certificateNo }) => {
    return (
      <div
        style={{
          position: "relative",
          width: "1000px",
          height: "772.5px",
          backgroundImage: `url(${certificateBackground})`,
          backgroundSize: "cover",
          margin: "20px",
          overflow: 'hidden',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Dynamic Name Overlay */}
        <div style={{
          position: "absolute",
          top: "49.3%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "29px",
          color: "#1f1f1f",
          textAlign: "center",
          fontFamily: "Graduate",
        }}>
          {name}
        </div>

        {/* Dynamic Content */}
        <div style={{
          position: "absolute",
          top: "65%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "16.5px",
          color: "#1f1f1f",
          textAlign: "center",
          fontFamily: "Graduate",
          lineHeight: '2',
          width: "80%",
        }}>
          <span>{`FOR SUCCESSFULLY COMPLETING THE `}</span>
          <span style={{ color: '#ff5757' }}>{`"${course}"`}</span>
          <span>{ ` COURSE AT`}</span>
          <span>{ ` WISDOM SPROUTS IT TRAINING HUB, PUNE. FROM "${startDate}" TO `}</span>
          <span>{`"${endDate}" HIS/HER PERFORMANCE HAS BEEN SATISFACTORY SO AS TO FULFILL THE`}</span>
          <span>{ `REQUIREMENTS FOR SUCCESSFUL COMPLETION OF THE TRAINING. `}</span>
          <span>{`IN TESTIMONY THEREOF, THIS CERTIFICATE IS AWARDED ON THE ${awardedDate}.`}</span>
        </div>

        {/* Certificate Number */}
        <div style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          fontSize: "20px",
          color: "#1f1f1f",
          fontFamily: "Graduate",
        }}>
          {certificateNo}
        </div>
      </div>
    );
  };

  // Function to send email with the generated certificate image
  const sendEmailWithCertificate = async (email, certificateImage) => {
    try {
      const response = await fetch("http://localhost:5130/api/send-certificate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          certificateImage // Send the certificate as a base64 image
        })
      });

      if (response.ok) {
        console.log(`Certificate sent successfully to ${email}`);
      } else {
        console.error(`Failed to send certificate to ${email}`);
      }
    } catch (error) {
      console.error(`Error sending certificate to ${email}:`, error);
    }
  };

  // Handle form submission to upload the file and generate certificates
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload an Excel file.");
      return;
    }

    await processExcelFile(file);

    // Generate certificates for each entry and send via email
    for (const cert of certificates) {
      const { name, course, startDate, endDate, awardedDate, certificateNo, email } = cert;

      // Generate the certificate HTML
      const certificateHTML = generateCertificateHTML({ name, course, startDate, endDate, awardedDate, certificateNo });

      // Convert the certificateHTML to a canvas image
      const certificateContainer = document.createElement("div");
      ReactDOM.render(certificateHTML, certificateContainer); // Use ReactDOM to render certificateHTML
      const certificateCanvas = await html2canvas(certificateContainer, { scale: 3 });
      const certificateImage = certificateCanvas.toDataURL("image/png", 1.0);

      // Send the certificate via email
      await sendEmailWithCertificate(email, certificateImage);
    }

    alert("Certificates are being processed and sent.");
  };

  return (
    <div className="container mt-5">
      <h2>Upload Excel Sheet to Send Certificates</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="file">Excel File:</label>
          <input type="file" className="form-control" id="file" onChange={handleFileChange} />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Upload and Send Certificates</button>
      </form>
    </div>
  );
};
export default FileUploadComponent;
