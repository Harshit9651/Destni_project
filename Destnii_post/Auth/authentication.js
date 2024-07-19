

const axios = require('axios');
const { CLIENT_ERROR } = require('../helper/statuscode');
const { CLIENT_ERROR: CLIENT_ERROR_MESSAGES } = require('../helper/statusmessage');

exports.authenticateUser = async (req, res, next) => {
  try {
    let token = req.headers['authorization'];

    if (!token && req.headers.cookie) {
      const cookies = req.headers.cookie.split('; ').reduce((prev, current) => {
        const [name, value] = current.split('=');
        prev[name] = value;
        return prev;
      }, {});

      token = cookies.token;
    }

    console.log('Token received:', token);

    if (!token) {
      return res.status(CLIENT_ERROR.UNAUTHORIZED.code).json({ message: CLIENT_ERROR_MESSAGES.UNAUTHORIZED.message });
    }

    const response = await axios.get('http://localhost:3001/user/protectedRoute', {
      headers: { 'Authorization': token }
    });

    console.log('Response from destni_user:', response.data);

    req.user = response.data.user;
    next();
  } catch (error) {
    if (error.response && error.response.status) {
      console.error('Authentication error:', error.response.data);
      return res.status(error.response.status).json({ message: error.response.data.message || CLIENT_ERROR_MESSAGES.UNAUTHORIZED.message });
    }
    console.error('Authentication error:', error.message);
    res.status(CLIENT_ERROR.UNAUTHORIZED.code).json({ message: CLIENT_ERROR_MESSAGES.UNAUTHORIZED.message });
  }
};
