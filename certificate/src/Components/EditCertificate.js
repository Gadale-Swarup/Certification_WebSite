// import React, { useState, useRef, useEffect } from "react";
// import html2canvas from "html2canvas";
// import Modal from "react-modal";
// import certificateBackground from "../img/certificate1.png"; // Path to your certificate background
// import "./style.css"; // Custom CSS file

// const EditableCertificate = () => {
//   const [name, setName] = useState("Supriya Jamadar");
//   const [course, setCourse] = useState("Full Stack Web Development - MERN Stack");
//   const [startDate, setStartDate] = useState("18th September 2023");
//   const [endDate, setEndDate] = useState("20th December 2023");
//   const [awardedDate, setAwardedDate] = useState("30th December 2023");
//   const [certificateNo, setCertificateNo] = useState("WS230704");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
//   const [userEmail, setUserEmail] = useState(""); // To capture the user's email

//   const certificateRef = useRef();

//   useEffect(() => {
//     Modal.setAppElement('body'); // or you can use '#root' depending on your app structure
//   }, []);

//   // Function to download the certificate as PNG
//   const downloadCertificate = () => {
//     if (certificateRef.current) {
//       html2canvas(certificateRef.current, { scale: 3 }).then((canvas) => {
//         const imgData = canvas.toDataURL("image/png", 1.0);
//         const link = document.createElement("a");
//         link.href = imgData;
//         link.download = `certificate-${name}.png`;
//         link.click();
//       });
//     }
//   };

//   // Function to send the certificate as an email
//   const sendCertificateByEmail = async () => {
//     if (certificateRef.current) {
//       html2canvas(certificateRef.current, { scale: 3 }).then(async (canvas) => {
//         const imgData = canvas.toDataURL("image/png", 1.0);

//         // Prepare the payload for the backend
//         const payload = {
//           name,
//           email: userEmail, // User-provided email
//           certificateData: imgData, // Base64 image data
//           fileName: `certificate-${name}.png`,
//         };

//         // Send the certificate to the backend for emailing
//         try {
//           const response = await fetch("http://localhost:5130/api/send-certificate", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(payload),
//           });

//           if (response.ok) {
//             alert("Certificate sent via email successfully!");
//           } else {
//             alert("Failed to send the certificate. Please try again later.");
//           }
//         } catch (error) {
//           console.error("Error sending certificate:", error);
//           alert("An error occurred while sending the email. Please try again.");
//         }
//       });
//     }
//   };

//   // Function to handle sending the email after user submits the email in the modal
//   const handleSendEmail = () => {
//     // Simple regex for email validation
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!userEmail) {
//       alert("Please enter your email address.");
//       return;
//     }
//     if (!emailPattern.test(userEmail)) {
//       alert("Please enter a valid email address.");
//       return;
//     }
//     sendCertificateByEmail();
//     setIsModalOpen(true)
//     setIsEmailModalOpen(false); // Close email modal after sending
//   };

//   return (
//     <div className="container mt-5 d-flex justify-content-center">
//       <div className="mb-4 m-5 p-5 border border-secondary shadow-lg bg-body-tertiary rounded" style={{ width: '500px' }}>
//         <h2 className="text-center">Certificate Details</h2>
//         {/* Input Fields */}
//         {["name", "course", "startDate", "endDate", "awardedDate", "certificateNo"].map((field, index) => (
//           <div className="form-group" key={index}>
//             <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}: </label>
//             <input
//               type="text"
//               id={field}
//               className="form-control"
//               value={eval(field)} // Replace with a better approach
//               onChange={(e) => {
//                 const value = e.target.value;
//                 switch (field) {
//                   case "name":
//                     setName(value);
//                     break;
//                   case "course":
//                     setCourse(value);
//                     break;
//                   case "startDate":
//                     setStartDate(value);
//                     break;
//                   case "endDate":
//                     setEndDate(value);
//                     break;
//                   case "awardedDate":
//                     setAwardedDate(value);
//                     break;
//                   case "certificateNo":
//                     setCertificateNo(value);
//                     break;
//                   default:
//                     break;
//                 }
//               }}
//             />
//           </div>
//         ))}
//         <br />
//         <div className="text-center">
//           <button onClick={() => setIsModalOpen(true)} className="btn btn-primary btn-block">Show Certificate</button>
//           &nbsp;&nbsp;
//           <button onClick={() => setIsEmailModalOpen(true)} className="btn btn-success">
//             Send Certificate by Email
//           </button>
//         </div>
//       </div>

//       {/* Certificate Preview Modal */}
//       <Modal
//         isOpen={isModalOpen}
//         onRequestClose={() => setIsModalOpen(false)}
//         style={{
//           content: {
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             width: 'auto',
//             height: 'auto',
//             margin: 'auto',
//             padding: '0',
//             border: 'none',
//             background: 'transparent',
//           },
//           overlay: {
//             backgroundColor: 'rgba(0, 0, 0, 0.75)',
//           },
//         }}
//       >
//         <div style={{ textAlign: 'center' }}>
//           <div
//             ref={certificateRef}
//             style={{
//               position: "relative",
//               width: "1000px",
//               height: "772.5px",
//               backgroundImage: `url(${certificateBackground})`,
//               backgroundSize: "cover",
//               margin: "20px",
//               overflow: 'hidden',
//               boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
//             }}
//           >
//             {/* Dynamic Name Overlay */}
//             <div style={{
//               position: "absolute",
//               top: "49.3%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               fontSize: "29px",
//               color: "#1f1f1f",
//               textAlign: "center",
//               fontFamily: "Graduate",
//             }}>
//               {name}
//             </div>

//             {/* Dynamic Content */}
//             <div style={{
//               position: "absolute",
//               top: "65%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               fontSize: "16.5px",
//               color: "#1f1f1f",
//               textAlign: "center",
//               fontFamily: "Graduate",
//               lineHeight: '2',
//               width: "80%",
//             }}>
//               <span>{`FOR SUCCESSFULLY COMPLETING THE `}</span>
//               <span style={{ color: '#ff5757' }}>{`"${course}"`}</span>
//               <span>{ ` COURSE AT`}</span>
//               <span className="my-5">{ ` WISDOM SPROUTS IT TRAINING HUB, PUNE. FROM "${startDate}" TO `}</span>
//               <span>{`"${endDate}" HIS/HER PERFORMANCE HAS BEEN SATISFACTORY SO AS TO FULFILL THE`}</span>
//               <span>{ `REQUIREMENTS FOR SUCCESSFUL COMPLETION OF THE TRAINING. `}</span>
//               <span>{`IN TESTIMONY THEREOF, THIS CERTIFICATE IS AWARDED ON THE ${awardedDate}.`}</span>
//             </div>

//             {/* Certificate Number */}
//             <div style={{
//               position: "absolute",
//               bottom: "20px",
//               right: "20px",
//               fontSize: "20px",
//               color: "#1f1f1f",
//               fontFamily: "Graduate",
//             }}>
//               {certificateNo}
//             </div>
//           </div>
//           <button onClick={downloadCertificate} style={{ marginBottom: '20px', zIndex: 10 }} className="btn btn-success">
//             Download Certificate as PNG
//           </button>
//           &nbsp;&nbsp;<button onClick={() => setIsEmailModalOpen(true)} style={{ marginBottom: '20px', zIndex: 10 }} className="btn btn-success">
//             Send Certificate by Email
//           </button>
//         </div>
//       </Modal>

//       {/* Email Modal */}
//       <Modal
//         isOpen={isEmailModalOpen}
//         onRequestClose={() => setIsEmailModalOpen(false)
//         }
//         style={{
//           content: {
//             width: '400px',
//             height: '250px',
//             margin: 'auto',
//             padding: '20px',
//             borderRadius: '8px',
//           },
//           overlay: {
//             backgroundColor: 'rgba(0, 0, 0, 0.75)',
//           },
//         }}
//       >
//         <div>
//           <h4 className="text-center">Send Certificate via Email</h4>
//           <div className="form-group">
//             <label htmlFor="userEmail">Enter your email:</label>
//             <input
//               type="email"
//               id="userEmail"
//               className="form-control"
//               value={userEmail}
//               onChange={(e) => setUserEmail(e.target.value)}
//             />
//           </div>
//           <div className="text-center mt-4">
//             <button onClick={handleSendEmail} className="btn btn-primary">Send Email</button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default EditableCertificate;

import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import Modal from "react-modal";
import useCertificate from "../Custom/UseCertificate"; // Adjust the import path as necessary
import certificateBackground from "../img/certificate1.png"; // Path to your certificate background
import "./style.css"; // Custom CSS file

const EditableCertificate = () => {
  const [name, setName] = useState("Supriya Jamadar");
  const [course, setCourse] = useState(
    "Full Stack Web Development - MERN Stack"
  );
  const [startDate, setStartDate] = useState("18th September 2023");
  const [endDate, setEndDate] = useState("20th December 2023");
  const [awardedDate, setAwardedDate] = useState("30th December 2023");
  const [certificateNo, setCertificateNo] = useState("WS230704");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(""); // To capture the user's email

  // Use the custom hook to get certificate HTML and reference
  const { certificateHTML, certificateRef } = useCertificate({
    name,
    course,
    startDate,
    endDate,
    awardedDate,
    certificateNo,
    certificateBackground,
  });

  useEffect(() => {
    Modal.setAppElement("body"); // or you can use '#root' depending on your app structure
  }, []);

  // Function to download the certificate as PNG
  const downloadCertificate = () => {
    if (certificateRef.current) {
      html2canvas(certificateRef.current, { scale: 3 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png", 1.0);
        const link = document.createElement("a");
        link.href = imgData;
        link.download = `certificate-${name}.png`;
        link.click();
      });
    }
  };

  // Function to send the certificate as an email
  const sendCertificateByEmail = async () => {
    if (certificateRef.current) {
      html2canvas(certificateRef.current, { scale: 3 }).then(async (canvas) => {
        const imgData = canvas.toDataURL("image/png", 1.0);

        // Prepare the payload for the backend
        const payload = {
          name,
          email: userEmail, // User-provided email
          certificateData: imgData, // Base64 image data
          fileName: `certificate-${name}.png`,
        };

        // Send the certificate to the backend for emailing
        try {
          const response = await fetch(
            "http://localhost:5130/api/send-certificate",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            }
          );

          if (response.ok) {
            alert("Certificate sent via email successfully!");
          } else {
            alert("Failed to send the certificate. Please try again later.");
          }
        } catch (error) {
          console.error("Error sending certificate:", error);
          alert("An error occurred while sending the email. Please try again.");
        }
      });
    }
  };

  // Function to handle sending the email after user submits the email in the modal
  const handleSendEmail = () => {
    // Simple regex for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userEmail) {
      alert("Please enter your email address.");
      return;
    }
    if (!emailPattern.test(userEmail)) {
      alert("Please enter a valid email address.");
      return;
    }
    sendCertificateByEmail();
    setIsEmailModalOpen(false); // Close email modal after sending
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div
        className="mb-4 m-5 p-5 border border-secondary shadow-lg bg-body-tertiary rounded"
        style={{ width: "500px" }}
      >
        <h2 className="text-center">Certificate Details</h2>
        {/* Input Fields */}
        {[
          "name",
          "course",
          "startDate",
          "endDate",
          "awardedDate",
          "certificateNo",
        ].map((field, index) => (
          <div className="form-group" key={index}>
            <label htmlFor={field}>
              {field.charAt(0).toUpperCase() +
                field.slice(1).replace(/([A-Z])/g, " $1")}
              :{" "}
            </label>
            <input
              type="text"
              id={field}
              className="form-control"
              value={eval(field)} // Replace with a better approach
              onChange={(e) => {
                const value = e.target.value;
                switch (field) {
                  case "name":
                    setName(value);
                    break;
                  case "course":
                    setCourse(value);
                    break;
                  case "startDate":
                    setStartDate(value);
                    break;
                  case "endDate":
                    setEndDate(value);
                    break;
                  case "awardedDate":
                    setAwardedDate(value);
                    break;
                  case "certificateNo":
                    setCertificateNo(value);
                    break;
                  default:
                    break;
                }
              }}
            />
          </div>
        ))}
        <br />
        <div className="text-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary btn-block"
          >
            Show Certificate
          </button>
          &nbsp;&nbsp;
          <button
            onClick={() => setIsEmailModalOpen(true)}
            className="btn btn-success"
          >
            Send Certificate by Email
          </button>
        </div>
      </div>

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
            margin: "auto",
            padding: "0",
            border: "none",
            background: "transparent",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
        }}
      >
        <div style={{ textAlign: "center" }}>
          {certificateHTML}
          <button
            onClick={downloadCertificate}
            style={{ marginBottom: "20px", zIndex: 10 }}
            className="btn btn-success"
          >
            Download Certificate as PNG
          </button>
          &nbsp;&nbsp;
          <button
            onClick={() => setIsEmailModalOpen(true)}
            style={{ marginBottom: "20px", zIndex: 10 }}
            className="btn btn-success"
          >
            Send Certificate by Email
          </button>
        </div>
      </Modal>

      {/* Email Modal */}
      <Modal
        isOpen={isEmailModalOpen}
        onRequestClose={() => setIsEmailModalOpen(false)}
        style={{
          content: {
            width: "400px",
            height: "250px",
            margin: "auto",
            padding: "20px",
            borderRadius: "8px",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
        }}
      >
        <div>
          <h4 className="text-center">Send Certificate via Email</h4>
          <div className="form-group">
            <label htmlFor="userEmail">Enter your email:</label>
            <input
              type="email"
              id="userEmail"
              className="form-control"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <div className="text-center mt-4">
            <button onClick={handleSendEmail} className="btn btn-primary">
              Send Email
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditableCertificate;
