const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const flash = require('connect-flash');
const signupRoute = require("./Routes/signupRoute.js");
const signinRoute = require("./Routes/signinRoute.js");
 const userprofileRoute = require("./Routes/userProfileRoute.js");
 const travelRoute = require('./Routes/travelRoute.js');
 const sessionRoute = require("./Routes/sessionRoute.js");
 const redisClient = require('./Redis/redis.js'); 
const Constants = require('./helper/Constent.js');
const authenticateToken = require('./Auth/authentication.js')
const User = require('./models/UserprofileModel.js')
const path = require('path');
const cors = require('cors');
const axios = require('axios')

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
// app.use(helmet());
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: ["'self'", "'unsafe-inline'"],
//       styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
//       // Add other directives as needed
//     },
//   })
// );

const store = new RedisStore({ client: redisClient });
// Enable CORS with credentials
app.use(cors({
  origin: 'http://localhost:3002', // Adjust this to your client origin
  credentials: true
}));
app.use(flash());
// app.use(session({
//   store: store,
//   secret: SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     maxAge: 1000 * 60 * 60 * 24, // 1 day
//   },
// }));
app.use(session({
  store:store,
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // Set secure to true if using HTTPS in production
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  }
}));

// Rate Limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: Constants.LIMIT_MAX_LIMIT,
//   message: Constants.LIMITER_NOTIFICATION,
// });
// app.use(limiter);

// Routes
app.use('/user', signupRoute);
app.use('/user/signin',signinRoute)
app.use('/user/profile',userprofileRoute)
app.use('/user/travel', travelRoute);
app.use('/user/checkuser',sessionRoute)

// Test Route

// Start the server
app.listen(PORT, () => {
  console.log(Constants.Applog);
});
app.get('/',(req,res)=>{
res.render("homepage.ejs")
})
app.get('/1',(req,res)=>{
  res.render("destniform.ejs")
  })


app.get('/test',(req,res)=>{
res.render('test.ejs')
})
app.get('/hello', (req, res) => {
  console.log(req.session); // Log the whole session object
  console.log('Session userId bhn chodddddd:', req.session.userId);
  res.send(req.session.userId);
});
app.post('/input', (req, res) => {
  const {bio} = req.body;

console.log(bio)
res.send("ok")
});

app.get('/users',async(req,res)=>{
const user = await User.findOne({userId:req.session.userId})
console.log(user);
res.send(user)
})