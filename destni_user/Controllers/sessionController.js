const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const { JWT_SECRET } = process.env;

exports.sessionId = async (req, res) => {
  const token = req.headers['authorization'] || req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  let actualToken;

  if (token.startsWith('Bearer ')) {
    actualToken = token.split(' ')[1];
  } else {
    actualToken = token;
  }

  console.log('Token received:', actualToken);

  try {
    const decoded = jwt.verify(actualToken, JWT_SECRET);
    console.log('Decoded token:', decoded);
    res.json({ userId: decoded.id });
    
  } catch (error) {
    console.error('Token verification error:', error.message);
    res.status(400).json({ error: 'Invalid token.' });
  }
};

