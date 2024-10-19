import React from "react";
import EditableCertificate from "./Components/EditCertificate";
import 'bootstrap/dist/css/bootstrap.min.css';
import FileUploadComponent from "./Components/FileUpload";

const App = () => {


  return (
    <div>
      <EditableCertificate/><br/>
      <FileUploadComponent/><br/><br/><br/>
      <br/>
    </div>
  );
};

export default App;
