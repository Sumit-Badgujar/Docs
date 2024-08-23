const express = require('express');
const docsRouter = require("./documentsRoutes")
const router = express.Router(); 

router.use("/access/docs", docsRouter); 

module.exports = router; 
