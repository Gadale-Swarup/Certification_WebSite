// import React, { useState, useEffect, useRef } from "react";
// import html2canvas from "html2canvas";
// import * as XLSX from "xlsx";
// import Modal from "react-modal";
// import { toast, ToastContainer } from "react-toastify";
// import certificateBackground from "../img/certificate1.png";
// import "./style.css";

// const EditableCertificate = () => {
//   const [excelData, setExcelData] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const certificateRef = useRef(null);

//   useEffect(() => {
//     Modal.setAppElement("body");
//   }, []);

//   // Function to handle Excel file upload
//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const data = new Uint8Array(event.target.result);
//       const workbook = XLSX.read(data, { type: "array" });
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];
//       const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
//       setExcelData(jsonData);
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   // Function to generate certificate image
//   const generateCertificateImage = async () => {
//     if (!certificateRef.current) return null;
//     try {
//       const canvas = await html2canvas(certificateRef.current, { scale: 3 });
//       return canvas.toDataURL("image/png", 1.0);
//     } catch (error) {
//       console.error("Error generating certificate image:", error);
//       return null;
//     }
//   };

//   // Function to download the certificate
//   const downloadCertificate = async () => {
//     const imgData = await generateCertificateImage();
//     if (imgData && selectedRow) {
//       const link = document.createElement("a");
//       link.href = imgData;
//       link.download = `certificate-${selectedRow.Name}.png`;
//       link.click();
//     } else {
//       toast.error("Failed to generate the certificate.");
//     }
//   };

//   // Function to send certificate by email
//   const sendCertificateByEmail = async () => {
//     setIsLoading(true);
//     const imgData = await generateCertificateImage();

//     if (imgData && selectedRow) {
//       const payload = {
//         name: selectedRow.Name,
//         email: selectedRow.Email,
//         certificateData: imgData,
//         fileName: `certificate-${selectedRow.Name}.png`,
//       };

//       try {
//         const response = await fetch("http://localhost:5130/api/send-certificate", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(payload),
//         });

//         if (response.ok) {
//           toast.success(`Certificate sent to ${selectedRow.Email} successfully!`);
//         } else {
//           const errorMessage = await response.text();
//           console.error("Error response:", errorMessage);
//           toast.error("Failed to send the certificate. Please try again later.");
//         }
//       } catch (error) {
//         console.error("Error sending certificate:", error);
//         toast.error("An error occurred while sending the email. Please try again.");
//       }
//     } else {
//       toast.error("Failed to generate the certificate.");
//     }

//     setIsLoading(false);
//   };

//   return (
//     <div className="container mt-5">
//       <div className="mb-4">
//         <h2>Upload Excel Sheet and Manage Certificates</h2>
//         <input type="file" onChange={handleFileUpload} accept=".xlsx, .xls" />
//       </div>

//       {/* Excel data table */}
//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Start Date</th>
//             <th>End Date</th>
//             <th>Awarded Date</th>
//             <th>Certificate No</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {excelData.map((row, index) => (
//             <tr key={index}>
//               <td>{row.Name}</td>
//               <td>{row.Email}</td>
//               <td>{row["Start Date"]}</td>
//               <td>{row["End Date"]}</td>
//               <td>{row["Awarded Date"]}</td>
//               <td>{row["Certificate No"]}</td>
//               <td>
//                 <button
//                   className="btn btn-primary mr-2"
//                   onClick={() => {
//                     setSelectedRow(row);
//                     setIsModalOpen(true); // To show the certificate
//                   }}
//                 >
//                   Show Certificate
//                 </button>
//                 <button
//                   className="btn btn-success"
//                   onClick={() => sendCertificateByEmail(row)}
//                 >
//                   Send Email
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Certificate Preview Modal */}
//       <Modal
//         isOpen={isModalOpen}
//         onRequestClose={() => setIsModalOpen(false)}
//         style={{
//           content: {
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             width: "auto",
//             height: "auto",
//             marginTop: "40px",
//             padding: "0",
//             border: "none",
//             background: "transparent",
//           },
//           overlay: {
//             backgroundColor: "rgba(0, 0, 0, 0.5)",
//           },
//         }}
//       >
//         {selectedRow && (
//             <div 
//             className="text-center"
//             style={{marginTop:"350px"}}
//             >
//               &nbsp;
//               <button onClick={downloadCertificate} className="btn btn-success btn-block">
//                 Download Certificate
//               </button>
//               &nbsp;
//               <button
//                   className="btn btn-success"
//                   onClick={() => sendCertificateByEmail()}
//                 >
//                   Send Email
//                 </button>
//               &nbsp;
//               <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
//                 Close
//               </button>
//           <div
//             ref={certificateRef}
//             style={{
//               position: "relative",
//               width: "1000px",
//               height: "772.5px",
//               backgroundImage: `url(${certificateBackground})`,
//               backgroundSize: "cover",
//               margin: "20px",
//               overflow: "hidden",
//               boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
//             }}
//           >
//             {/* Dynamic Name Overlay */}
//             <div
//               style={{
//                 position: "absolute",
//                 top: "49.3%",
//                 left: "50%",
//                 transform: "translate(-50%, -50%)",
//                 fontSize: "29px",
//                 color: "#1f1f1f",
//                 textAlign: "center",
//                 fontFamily: "Graduate",
//               }}
//             >
//               {selectedRow.Name}
//             </div>

//             {/* Dynamic Content */}
//             <div
//               style={{
//                 position: "absolute",
//                 top: "65%",
//                 left: "50%",
//                 transform: "translate(-50%, -50%)",
//                 fontSize: "16.5px",
//                 color: "#1f1f1f",
//                 textAlign: "center",
//                 fontFamily: "Graduate",
//                 lineHeight: "2",
//                 width: "80%",
//               }}
//             >
//               <span>{`FOR SUCCESSFULLY COMPLETING THE `}</span>
//               <span style={{ color: "#ff5757" }}>{`"${selectedRow.Course}"`}</span>
//               <span>{` COURSE AT WISDOM SPROUTS IT TRAINING HUB, PUNE. FROM "${selectedRow["Start Date"]}" TO `}</span>
//               <span>{`"${selectedRow["End Date"]}" HIS/HER PERFORMANCE HAS BEEN SATISFACTORY SO AS TO FULFILL THE`}</span>
//               <span>{` REQUIREMENTS FOR SUCCESSFUL COMPLETION OF THE TRAINING. IN TESTIMONY THEREOF, THIS CERTIFICATE IS AWARDED ON THE ${selectedRow["Awarded Date"]}.`}</span>
//             </div>

//             {/* Certificate Number */}
//             <div
//               style={{
//                 position: "absolute",
//                 bottom: "20px",
//                 right: "20px",
//                 fontSize: "20px",
//                 color: "#1f1f1f",
//                 fontFamily: "Graduate",
//               }}
//             >
//               {selectedRow["Certificate No"]}
//             </div>
//           </div>
//         </div>
//         )}
       
//       </Modal>
//       <ToastContainer/>
//     </div>
//   );
// };

// export default EditableCertificate;

import React, { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import certificateBackground from "../img/certificate1.png";
import "./FileUpload.css"; // Make sure this imports the updated styles

const Excelsheet = () => {
  const [excelData, setExcelData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const certificateRef = useRef(null);

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  // Function to handle Excel file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
      setExcelData(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  // Function to generate certificate image
  const generateCertificateImage = async () => {
    if (!certificateRef.current) return null;
    try {
      const canvas = await html2canvas(certificateRef.current, { scale: 3 });
      return canvas.toDataURL("image/png", 1.0);
    } catch (error) {
      console.error("Error generating certificate image:", error);
      return null;
    }
  };

  // Function to download the certificate
  const downloadCertificate = async () => {
    const imgData = await generateCertificateImage();
    if (imgData && selectedRow) {
      const link = document.createElement("a");
      link.href = imgData;
      link.download = `certificate-${selectedRow.Name}.png`;
      link.click();
    } else {
      toast.error("Failed to generate the certificate.");
    }
  };

  // Function to send certificate by email
  const sendCertificateByEmail = async () => {
    setIsLoading(true); // Show spinner
    const imgData = await generateCertificateImage();

    if (imgData && selectedRow) {
      const payload = {
        name: selectedRow.Name,
        email: selectedRow.Email,
        certificateData: imgData,
        fileName: `certificate-${selectedRow.Name}.png`,
      };

      try {
        const response = await fetch("https://certification-backend.onrender.com/api/send-certificate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          toast.success(`Certificate sent to ${selectedRow.Email} successfully!`);
          setIsModalOpen(false);
        } else {
          const errorMessage = await response.text();
          console.error("Error response:", errorMessage);
          toast.error("Failed to send the certificate. Please try again later.");
        }
      } catch (error) {
        console.error("Error sending certificate:", error);
        toast.error("An error occurred while sending the email. Please try again.");
      }
    } else {
      toast.error("Failed to generate the certificate.");
    }

    setIsLoading(false); // Hide spinner
  };

  return (
    <div className="container mt-5 enhanced-container">
      <div className="mb-4">
        <h2 className="header-title">Upload Excel Sheet and Manage Certificates</h2>
        <input
          type="file"
          onChange={handleFileUpload}
          accept=".xlsx, .xls"
          className="custom-file-input"
        />
      </div>

      {/* Show Spinner if isLoading is true */}
      {isLoading && (
        <div className="spinner-overlay">
          <div className="spinner"></div>
        </div>
      )}

      {/* Excel data table */}
      <table className="table table-bordered custom-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Awarded Date</th>
            <th>Certificate No</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {excelData.map((row, index) => (
            <tr key={index}>
              <td>{row.Name}</td>
              <td>{row.Email}</td>
              <td>{row["Start Date"]}</td>
              <td>{row["End Date"]}</td>
              <td>{row["Awarded Date"]}</td>
              <td>{row["Certificate No"]}</td>
              <td>
                <button
                  className="btn btn-primary action-button mr-2"
                  onClick={() => {
                    setSelectedRow(row);
                    setIsModalOpen(true); // To show the certificate
                  }}
                >
                  Show Certificate
                </button>
                <button
                  className="btn btn-success action-button"
                  onClick={() => sendCertificateByEmail(row)}
                >
                  Send Email
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Certificate Preview Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          content: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "auto",
            height: "auto",
            marginTop: "40px",
            padding: "0",
            border: "none",
            background: "transparent",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        {selectedRow && (
          <div className="text-center" style={{ marginTop: "350px" }}>
            &nbsp;
            <button onClick={downloadCertificate} className="btn btn-success action-button">
              Download Certificate
            </button>
            &nbsp;
            <button className="btn btn-success action-button" onClick={() => sendCertificateByEmail()}>
              Send Email
            </button>
            &nbsp;
            <button className="btn btn-secondary action-button" onClick={() => setIsModalOpen(false)}>
              Close
            </button>
            <div
              ref={certificateRef}
              style={{
                position: "relative",
                width: "1000px",
                height: "772.5px",
                backgroundImage: `url(${certificateBackground})`,
                backgroundSize: "cover",
                margin: "20px",
                overflow: "hidden",
                boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
              }}
            >
              {/* Dynamic Name Overlay */}
              <div
                style={{
                  position: "absolute",
                  top: "49.3%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: "29px",
                  color: "#1f1f1f",
                  textAlign: "center",
                  fontFamily: "Graduate",
                }}
              >
                {selectedRow.Name}
              </div>

              {/* Dynamic Content */}
              <div
                style={{
                  position: "absolute",
                  top: "65%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: "16.5px",
                  color: "#1f1f1f",
                  textAlign: "center",
                  fontFamily: "Graduate",
                  lineHeight: "2",
                  width: "80%",
                }}
              >
                <span>{`FOR SUCCESSFULLY COMPLETING THE `}</span>
                <span style={{ color: "#ff5757" }}>{`"${selectedRow.Course}"`}</span>
                <span>{` COURSE AT WISDOM SPROUTS IT TRAINING HUB, PUNE. FROM "${selectedRow["Start Date"]}" TO `}</span>
                <span>{`"${selectedRow["End Date"]}" HIS/HER PERFORMANCE HAS BEEN SATISFACTORY SO AS TO FULFILL THE`}</span>
                <span>{` REQUIREMENTS FOR SUCCESSFUL COMPLETION OF THE TRAINING. IN TESTIMONY THEREOF, THIS CERTIFICATE IS AWARDED ON THE ${selectedRow["Awarded Date"]}.`}</span>
              </div>

              {/* Certificate Number */}
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  right: "20px",
                  fontSize: "20px",
                  color: "#1f1f1f",
                  fontFamily: "Graduate",
                }}
              >
                {selectedRow["Certificate No"]}
              </div>
            </div>
          </div>
        )}
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Excelsheet;
