const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");


router.get('/',reportController.renderreportpage)
router.post('/reportdata',reportController.report)





module.exports = router;
