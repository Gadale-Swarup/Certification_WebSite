import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const CertificateGenerator = () => {
  const certificateRef = useRef();

  const generatePDF = () => {
    html2canvas(certificateRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297); // A4 size in mm
      pdf.save('certificate.pdf');
    });
  };

  return (
    <div>
      <div ref={certificateRef} style={{ width: '210mm', height: '297mm', position: 'relative' }}>
        <img
          src="your_background_image_url_here" // Add your background image URL
          alt="Certificate Background"
          style={{ position: 'absolute', width: '100%', height: '100%', zIndex: -1 }}
        />
        <div style={{ textAlign: 'center', paddingTop: '150px' }}>
          <h1>Name of Recipient</h1>
          <p style={{ marginTop: '30px', fontSize: '18px' }}>
            This certificate is awarded to [Name] for outstanding achievement.
          </p>
        </div>
      </div>

      <button onClick={generatePDF}>Download Certificate</button>
    </div>
  );
};

export default CertificateGenerator;
