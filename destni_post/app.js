// 
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);
const redisClient = require('./Redis/redis.js'); 
const commentRoute = require("./Routes/commentRoute.js");
const savepost = require("./Routes/savepostRoute.js");
const { authenticateUser } = require('./Auth/authentication.js');
const protectedroute = require("./Routes/sessionRoute.js");
const postRoute = require("./Routes/postRoute.js");
const ReportRoute = require("./Routes/reportRoute.js");
const errorHandler = require('./middleware/errorhandler.js');
const Constants = require('./helper/constent.js');

const store = new RedisStore({ client: redisClient });
const ejs = require('ejs');
const axios = require('axios');
require('./server/connection.js');
dotenv.config();
const { SESSION_SECRET, PORT } = process.env;

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3001', // Client origin
  credentials: true
}));
app.use(session({
  store: store,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 15 // 15 days
  },
  // Debug session events
  onError: (error) => {
    console.error('Session error:', error);
  }
}));


app.use(errorHandler);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: Constants.LIMIT_MAX_LIMIT,
  message: Constants.LIMITER_NOTIFICATION,
});
app.use(limiter);

app.use('/destni_post', postRoute);
app.use('/destni_post/comment', commentRoute);
app.use('/destni_post/savepost', savepost);
app.use('/destni_post/protectedRoute', protectedroute);
app.use('/destni_post/Report', ReportRoute);

app.get('/', authenticateUser, async (req, res) => {
  res.send(`User ID from  ma ki maru bhosi session: ${req.session.userId}`);
});

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});


