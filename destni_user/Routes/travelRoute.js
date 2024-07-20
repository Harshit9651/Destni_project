const express = require('express');
const terverllController = require('../Controllers/travelDataController');

const router = express.Router();

router.get('/', terverllController.rendertrevelinputpage );
router.post('/userterveldata',terverllController.travelData);



module.exports = router;