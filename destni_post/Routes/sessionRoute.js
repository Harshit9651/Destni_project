const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/sessionController");
const {authenticateUser} = require("../Auth/authentication")


 router.get('/protectedRouteInPost',authenticateUser,sessionController.protecteddata);
 router.get("/developer",sessionController.testproteacteddata)

  module.exports = router;
