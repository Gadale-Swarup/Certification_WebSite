import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import EditableCertificate from "./Components/EditCertificate";
import Excelsheet from "./Components/FileUpload";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Navbar from "./Components/Navbar";
// import EditCertificate from "./Components/SingleCertificate";

const App = () => {


  return (
    <>
      <Navbar/>
    <Router>
      <Routes>
        <Route path="/" element={<EditableCertificate/>}/>
        {/* <Route path="/" element={<EditCertificate/>}/> */}
        <Route path="/excel" element={<Excelsheet/>}/>
      </Routes>
    </Router>
    </>
  );
};

export default App;
