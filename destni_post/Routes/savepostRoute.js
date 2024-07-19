const express = require("express");
const router = express.Router();
const savepostController = require("../controllers/savepostController");
router.get('/rendersavepage',savepostController.rendersavepostpage)
router.post('/savepostdata',savepostController.savePost);


module.exports = router;