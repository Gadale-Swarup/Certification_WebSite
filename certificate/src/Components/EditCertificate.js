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
import { toast, ToastContainer } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import useCertificate from "../Custom/UseCertificate";
import certificateBackground from "../img/certificate1.png";
import "./style.css";

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
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [certificateImg, setCertificateImg]=useState(null);

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
    Modal.setAppElement("body");
  }, []);

  // Save the certificate image to localStorage
  const saveCertificateToLocalStorage = (imgData) => {
    try {
      localStorage.setItem("certificateImage", imgData);
    } catch (error) {
      console.error("Error saving certificate to localStorage:", error);
    }
  };

  // Generate the certificate image and save it to localStorage
  const generateCertificateImage = async () => {
    if (!certificateRef.current) return null;

    try {
      const canvas = await html2canvas(certificateRef.current, { scale: 3 });
      const imgData = canvas.toDataURL("image/png", 1.0);
      setCertificateImg(imgData);
      localStorage.setItem("certificateImage", imgData);
      saveCertificateToLocalStorage(imgData); // Save the image in localStorage
     
        return imgData;
    } catch (error) {
      console.error("Error generating certificate image:", error);
      return null;
    }

  };

  // Download the certificate
  const downloadCertificate = async () => {
    const canvas = await html2canvas(certificateRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png", 1.0);
    const link = document.createElement("a");
    link.href = imgData;
    link.download = `Wisodm-Certificate-${name}.png`;
    link.click();
  };

  // Send the certificate via email
  const sendCertificateByEmail = async () => {
    setIsLoading(true);

    // Get the certificate image from localStorage
    let imgData = localStorage.getItem("certificateImage");
    console.log("imgData",certificateImg)

    if (!imgData) {
      imgData = await generateCertificateImage(); // Generate if not saved yet
    }
    if (imgData) {
      const payload = {
        name,
        email: userEmail,
        certificateData: certificateImg,
        fileName: `certificate-${name}.png`,
      };

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
          localStorage.removeItem("certificateImage");
          toast.success("Certificate sent via email successfully!");
        } else {
          const errorMessage = await response.text();
          console.error("Error response:", errorMessage);
          toast.error(
            "Failed to send the certificate. Please try again later."
          );
        }
      } catch (error) {
        console.error("Error sending certificate:", error);
        toast.error(
          "An error occurred while sending the email. Please try again."
        );
      }
    } else {
      toast.error("Failed to generate the certificate.");
    //   console.log(error);
    }
    setIsLoading(false);
  };

  console.log("name",name,certificateImg);

  const handleSendEmail = () => {
    // saveCertificateToLocalStorage();
   
    generateCertificateImage();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!userEmail) {
      toast.warning("Please enter your email address.");
      return;
    }
    if (!emailPattern.test(userEmail)) {
      toast.warning("Please enter a valid email address.");
      return;
    }
    sendCertificateByEmail();
    setIsEmailModalOpen(false);
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div
        className="mb-4 m-5 p-4 border border-secondary shadow-lg bg-body-tertiary rounded"
        style={{ width: "500px",height:"400px"}}
      >
        <h2 className="text-center">Certificate Details</h2>
        <div className="row">
          {[
            { label: "Name", state: name, setter: setName },
            { label: "Course", state: course, setter: setCourse },
            { label: "Start Date", state: startDate, setter: setStartDate },
            { label: "End Date", state: endDate, setter: setEndDate },
            {
              label: "Awarded Date",
              state: awardedDate,
              setter: setAwardedDate,
            },
            {
              label: "Certificate No",
              state: certificateNo,
              setter: setCertificateNo,
            },
          ].map((field, index) => (
            <div className="col-6 mb-3" key={index}>
              <label>{field.label}:</label>
              <input
                type="text"
                className="form-control"
                value={field.state}
                onChange={(e) => field.setter(e.target.value)}
              />
            </div>
          ))}
        </div>
        {/* <div
        // className="text-center"
        >
          <button
            onClick={() => {
              setIsModalOpen(true);
              generateCertificateImage();
            }}
            className="btn btn-primary btn-block"
            style={{ marginLeft: "25px" }}
          >
            Show Certificate
          </button>
          <button
            onClick={() => {
              setIsEmailModalOpen(true);
              generateCertificateImage();
            }}
            className="btn btn-success btn-block"
            style={{ marginLeft: "95px" }}
          >
            Send by Email
            { console.log("123",certificateImg)}
          </button>
        </div> */}
           <div>
          {isLoading ? (
           <div className="text-center mt-2">
           <button
             className="btn btn-secondary"
             onClick={() => setIsModalOpen(false)}
           >
          <Spinner
           className="text-center"
           animation="border" role="status">
             <span className="sr-only "></span>
           </Spinner>
           </button>
         </div>
          ) : (
            <div
              style={{
                height: "600px",
                // textAlign: "center",
              }}
            >
              <button
            onClick={() => {
              setIsModalOpen(true);
              generateCertificateImage();
            }}
            className="btn btn-primary btn-block"
            style={{ marginLeft: "25px" }}
          >
            Show Certificate
          </button>
          <button
            onClick={() => {
              setIsEmailModalOpen(true);
              generateCertificateImage();
            }}
            className="btn btn-success btn-block"
            style={{ marginLeft: "100px" }}
          >
            Send by Email
            { console.log("123",certificateImg)}
          </button>
            </div>
          )}
        </div>
        <div style={{opacity:0,overflow:"hidden"}}>{certificateHTML}</div>

   
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
            height: "600px",
            margin: "auto",
            marginTop: "20px",
            padding: "0",
            border: "none",
            background: "transparent",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <div>
          {isLoading ? (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : (
            <div
              style={{
                height: "600px",
                textAlign: "center",
              }}
            >
              <button
                onClick={() => setIsEmailModalOpen(true)}
                className="btn btn-success btn-block mt-5"
              >
               
                Send Certificate by Email
              </button>
              &nbsp;
              <button
                onClick={downloadCertificate}
                className="btn btn-success btn-block mt-5"
              >
                Download Certificate
              </button>
              &nbsp;
              <button
                className="btn btn-secondary mt-5"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
              <div>{certificateHTML}</div>
            </div>
          )}
          <div className="text-center mt-2">
            <button
              className="btn btn-secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      {/* Email Modal */}
      <Modal
        isOpen={isEmailModalOpen}
        onRequestClose={() => setIsEmailModalOpen(false)}
        style={{
          content: {
            width: "300px",
            height: "200px",
            margin: "auto",
            padding: "20px",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <div className="form-group">
          <label htmlFor="email">Enter Your Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <div className="mt-3">
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button className="btn btn-primary" onClick={handleSendEmail}>
            Send Email
          </button>
          &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button
            className="btn btn-secondary"
            onClick={() => setIsEmailModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default EditableCertificate;
