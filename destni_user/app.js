const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const flash = require('connect-flash');
const signupRoute = require("./Routes/signupRoute.js");
const signinRoute = require("./Routes/signinRoute.js");
 const userprofileRoute = require("./Routes/userProfileRoute.js");
 const travelRoute = require('./Routes/travelRoute.js');
 
const Constants = require('./helper/Constent.js');
const authenticateToken = require('./Auth/authentication.js')
const path = require('path');
const cors = require('cors');

require('./Server/connection.js');
dotenv.config();

const app = express();
const { SESSION_SECRET, PORT } = process.env;

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],  // Allows inline scripts
      styleSrc: ["'self'", "'unsafe-inline'"],   // Allows inline styles
      // Add other directives as needed
    },
  })
);
app.use(cors());
app.use(flash());
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: Constants.LIMIT_MAX_LIMIT,
  message: Constants.LIMITER_NOTIFICATION,
});
app.use(limiter);

// Routes
app.use('/user', signupRoute);
app.use('/user/signin',signinRoute)
app.use('/user/profile',userprofileRoute)
app.use('/user/travel', travelRoute);

// Test Route
app.get('/hello', (req, res) => {
  console.log(req.session); // Log the whole session object
  console.log('Session userId:', req.session.userId);
  res.send( req.session.userId);
});

// Start the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});


