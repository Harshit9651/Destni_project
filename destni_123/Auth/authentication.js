
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const { JWT_SECRET } = process.env;

exports.checkUserSignin = (req, res, next) => {
  const token = req.cookies.token || req.headers['authorization'];
  console.log('Token received: ' + token);

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  let actualToken;

  // Check if the token is in the Bearer format
  if (token.startsWith('Bearer ')) {
    actualToken = token.split(' ')[1];
  } else {
    actualToken = token;
  }

  try {
    const decoded = jwt.verify(actualToken, JWT_SECRET);
    req.user = decoded; // Store the decoded user info in the request object
    console.log(req.user)
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};