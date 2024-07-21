const dotenv = require("dotenv");
dotenv.config();
function Constants() {}

Constants.LIMITER_NOTIFICATION = 'Too many requests from this IP, please try again later';
Constants.LIMIT_MAX_LIMIT = 100;
Constants.Hashing_PASSWORD=10;
Constants.session_Expire ='1h';
Constants.Applog = `app listing on port number ${process.env.PORT}`

module.exports = Constants;
