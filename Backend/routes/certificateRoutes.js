const express = require("express");
const { sendCertificate,generateCertificate } = require("../controllers/certificateController");
// const multer = require('multer');
// const { processExcelUpload } = require('../controllers/certificateController');

// Configure multer for file uploads
const router = express.Router();
// const upload = multer({ dest: 'uploads/' });


// Define the route for Excel upload
// router.post('/upload-excel', upload.single('file'), processExcelUpload);

// POST route for sending certificates
router.post("/send-certificate", sendCertificate);  
// router.post("/certificate", generateCertificate);



module.exports = router;
