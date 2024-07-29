const express = require('express');
const router = express.Router();
const sessionController = require('../Controllers/sessionController');

router.get('/sessionId',sessionController.sessionId);
module.exports = router;
