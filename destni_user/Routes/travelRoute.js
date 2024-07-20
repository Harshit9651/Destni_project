const express = require('express');
const terverllController = require('../Controllers/travelDataController');

const router = express.Router();

router.get('/destniform', terverllController.rendertravelinfopage );
router.post('/userterveldata',terverllController.saveTravelInfo);
router.get('/search', terverllController.searchUsersByCity );
router.get('/traevelrender/search',terverllController.rendersearch)

module.exports = router;