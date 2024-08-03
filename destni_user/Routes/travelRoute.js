const express = require('express');
const terverllController = require('../Controllers/travelDataController');
const { cacheMiddleware, cacheResponse } = require('../Redis/redisMiddleware.js');


const router = express.Router();

router.get('/destniform', terverllController.rendertravelinfopage );
router.post('/userterveldata',terverllController.saveTravelInfo);
router.get('/search',cacheMiddleware('city', 3600), terverllController.searchUsersByCity );
router.get('/traevelrender/search',terverllController.rendersearch);
router.get('/usertraveldata',terverllController.userDestination);


module.exports = router;