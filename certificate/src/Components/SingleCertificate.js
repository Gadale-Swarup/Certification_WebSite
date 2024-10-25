import React, { useState } from 'react';
import useCertificate from "../Custom/UseCertificate"; // Assuming this is your custom hook
import { toast } from 'react-toastify'; // For feedback
import 'react-toastify/dist/ReactToastify.css'; // React-Toastify CSS
import certificateBackground from "../img/certificate1.png";

const EditCertificate = () => {
    const [formData, setFormData] = useState({
        name: '',
        course: '',
        startDate: '',
        endDate: '',
        awardedDate: '',
        certificateNo: '',
        certificateBackground:certificateBackground, // Provide the default image path
    });
    const [cdata,setCdata]=useState()

    const { certificateHTML, certificateRef } = useCertificate(formData);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleGenerateCertificate = async () => {
        try {
            toast.info("Generating certificate...");

            const response = await fetch('http://localhost:5130/api/certificate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData), // Send form data to backend
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'certificate.png'; // Download the certificate as PNG
                document.body.appendChild(a); // Append the link to the body
                a.click(); // Simulate click to download
                a.remove(); // Clean up the link
                setCdata(response.data)
                toast.success("Certificate downloaded successfully!");
            } else {
                toast.error("Error generating certificate.");
            }
        } catch (error) {
            console.error('Error generating certificate', error);
            toast.error("Error generating certificate.");
        }
    };

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Generate Certificate</h2>

            {/* Form Inputs */}
            <div className="row mb-4">
                <div className="col-md-6 mb-3">
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Enter Name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <input
                        type="text"
                        name="course"
                        className="form-control"
                        placeholder="Enter Course Name"
                        value={formData.course}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <input
                        type="text"
                        name="startDate"
                        className="form-control"
                        placeholder="Start Date"
                        value={formData.startDate}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <input
                        type="text"
                        name="endDate"
                        className="form-control"
                        placeholder="End Date"
                        value={formData.endDate}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <input
                        type="text"
                        name="awardedDate"
                        className="form-control"
                        placeholder="Awarded Date"
                        value={formData.awardedDate}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <input
                        type="text"
                        name="certificateNo"
                        className="form-control"
                        placeholder="Certificate Number"
                        value={formData.certificateNo}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className="text-center">
                <button className="btn btn-primary mx-2" onClick={handleGenerateCertificate}>
                    Generate & Download Certificate
                </button>
            </div>

            {/* Certificate Preview */}
            <div>
                <h4 className="text-center">Certificate Preview</h4>
                <div
                style={{marginLeft:"-220px"}}
                >
                    {certificateHTML}
                </div>
            </div>
        </div>
    );
};

export default EditCertificate;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const CertificateForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     course: '',
//     startDate: '',
//     endDate: '',
//     awardedDate: '',
//     certificateNo: '',
//     email: '',
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await axios.post('http://localhost:5130/api/certificate', formData);
      
//       const { certificateData, fileName } = response.data;

//       // Sending the certificate via email
//       await axios.post('http://localhost:5130/api/send-certificate', {
//         name: formData.name,
//         email: formData.email,
//         certificateData,
//         fileName,
//       });

//       setLoading(false);
//       toast.success('Certificate sent successfully!');
//     } catch (error) {
//       console.error('Error sending certificate:', error);
//       console.log(error)
//       setLoading(false);
//       toast.error('Failed to send the certificate.');
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Generate and Send Certificate</h2>
//       <form onSubmit={handleSubmit} className="mt-4">
//         <div className="form-group">
//           <label>Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="form-control"
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Course</label>
//           <input
//             type="text"
//             name="course"
//             value={formData.course}
//             onChange={handleChange}
//             className="form-control"
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Start Date</label>
//           <input
//             type="date"
//             name="startDate"
//             value={formData.startDate}
//             onChange={handleChange}
//             className="form-control"
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>End Date</label>
//           <input
//             type="date"
//             name="endDate"
//             value={formData.endDate}
//             onChange={handleChange}
//             className="form-control"
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Awarded Date</label>
//           <input
//             type="date"
//             name="awardedDate"
//             value={formData.awardedDate}
//             onChange={handleChange}
//             className="form-control"
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Certificate Number</label>
//           <input
//             type="text"
//             name="certificateNo"
//             value={formData.certificateNo}
//             onChange={handleChange}
//             className="form-control"
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="form-control"
//             required
//           />
//         </div>

//         <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
//           {loading ? 'Generating & Sending...' : 'Generate & Send Certificate'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CertificateForm;
