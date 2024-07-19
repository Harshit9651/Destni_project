const express = require('express');

const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const Constants = require('./helper/constent.js');
const cors = require('cors');
const { authenticateUser } = require('./Auth/authentication.js');
const postRouer = require("./Routes/postRoute.js");
const errorHandler = require('./middleware/errorhandler.js');
// const renderdata = require("./Routes/renderRoute.js");
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);
const commentRoute = require("./Routes/commentRoute.js");
const savepost = require("./Routes/savepostRoute.js");

const ejs = require('ejs');
const { default: axios } = require('axios');

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
app.use(cors());
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: Constants.session_MAX_AGE,
  },
}));
app.use(errorHandler);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: Constants.LIMIT_MAX_LIMIT,
  message: Constants.LIMITER_NOTIFICATION,
});
app.use(limiter);


app.use('/destni_post',postRouer);

app.use("/destni_post/comment",commentRoute)
app.use("/destni_post/savepost",savepost)



app.get('/protectedRouteInPost', authenticateUser, (req, res) => {
  req.session.userId = req.user.id;
  console.log(`User ID set: ${req.session.userId}`);

  res.json({ message: 'You have accessed a protected route in destni_post!', user: req.user });
});

app.get('/destni_post/post', (req, res) => {
  console.log(`User ID is: ${req.session.userId}`); 
  res.json({ userId: req.session.userId });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

