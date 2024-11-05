import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import EditableCertificate from "./Components/EditCertificate";
import Excelsheet from "./Components/FileUpload";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Navbar from "./Components/Navbar";
import Completion from "./Components/Completion";
import Participation from "./Components/Participation";
// import EditCertificate from "./Components/SingleCertificate";

const App = () => {


  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<EditableCertificate/>}/>
        {/* <Route path="/" element={<EditCertificate/>}/> */}
        <Route path="/excel" element={<Excelsheet/>}/>
        <Route path="/Completion" element={<Completion/>}/>
        <Route path="/participation" element={<Participation/>}/>
      </Routes>
    </Router>
    </>
  );
};

export default App;
