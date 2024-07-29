

// const axios = require('axios');
// const { CLIENT_ERROR } = require('../helper/statuscode');
// const { CLIENT_ERROR: CLIENT_ERROR_MESSAGES } = require('../helper/statusmessage');

// exports.authenticateUser = async (req, res, next) => {
//   try {
//     let token = req.headers['authorization'];

//     if (!token && req.headers.cookie) {
//       const cookies = req.headers.cookie.split('; ').reduce((prev, current) => {
//         const [name, value] = current.split('=');
//         prev[name] = value;
//         return prev;
//       }, {});

//       token = cookies.token;
//     }

//     console.log('Token received:', token);

//     if (!token) {
//       return res.status(CLIENT_ERROR.UNAUTHORIZED.code).json({ message: CLIENT_ERROR_MESSAGES.UNAUTHORIZED.message });
//     }

//     const response = await axios.get('http://localhost:3001/user/checkuser/sessionId', {
//       headers: {
//         'Authorization': token,
//         'Cookie': req.headers.cookie
//       },
//       withCredentials: true
//     });

//     console.log('Response from destni_user:', response.data);

//     // req.session.userId = response.data.user;
//     req.session.userId = response.data

//     req.session.save(err => {
//       if (err) {
//         console.error('Session save error:', err);
//         return res.status(CLIENT_ERROR.UNAUTHORIZED.code).json({ message: CLIENT_ERROR_MESSAGES.UNAUTHORIZED.message });
//       }

//       console.log('Session userId:', req.session.userId);
//       next();
//     });
//   } catch (error) {
//     if (error.response && error.response.status) {
//       console.error('Authentication error:', error.response.data);
//       return res.status(error.response.status).json({ message: error.response.data.message || CLIENT_ERROR_MESSAGES.UNAUTHORIZED.message });
//     }
//     console.error('Authentication error:', error.message);
//     res.status(CLIENT_ERROR.UNAUTHORIZED.code).json({ message: CLIENT_ERROR_MESSAGES.UNAUTHORIZED.message });
//   }
// };
// // In your destni_post microservice

//second=======================================================================================================================================

// const axios = require('axios');
// const { CLIENT_ERROR } = require('../helper/statuscode');
// const { CLIENT_ERROR: CLIENT_ERROR_MESSAGES } = require('../helper/statusmessage');

// exports.authenticateUser = async (req, res, next) => {
//   try {
//     let token = req.headers['authorization'];

//     if (!token && req.headers.cookie) {
//       const cookies = req.headers.cookie.split('; ').reduce((prev, current) => {
//         const [name, value] = current.split('=');
//         prev[name] = value;
//         return prev;
//       }, {});

//       token = cookies.token;
//     }

//     if (!token) {
//       return res.status(CLIENT_ERROR.UNAUTHORIZED.code).json({ message: CLIENT_ERROR_MESSAGES.UNAUTHORIZED.message });
//     }

//     const response = await axios.get('http://localhost:3001/user/checkuser/sessionId', {
//       headers: {
//         'Authorization': token,
//         'Cookie': req.headers.cookie
//       },
//       withCredentials: true
//     });

//     // Extract user details from the response and store it in session
//     req.session.userId = response.data.userId;

//     req.session.save(err => {
//       if (err) {
//         console.error('Session save error:', err);
//         return res.status(CLIENT_ERROR.UNAUTHORIZED.code).json({ message: CLIENT_ERROR_MESSAGES.UNAUTHORIZED.message });
//       }

//       console.log('Session userId:', req.session.userId);
//       next();
//     });
//   } catch (error) {
//     if (error.response && error.response.status) {
//       console.error('Authentication error:', error.response.data);
//       return res.status(error.response.status).json({ message: error.response.data.message || CLIENT_ERROR_MESSAGES.UNAUTHORIZED.message });
//     }
//     console.error('Authentication error:', error.message);
//     res.status(CLIENT_ERROR.UNAUTHORIZED.code).json({ message: CLIENT_ERROR_MESSAGES.UNAUTHORIZED.message });
//   }
// };
 // In your destni_post microservice

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

    if (!token) {
      return res.status(CLIENT_ERROR.UNAUTHORIZED.code).json({ message: CLIENT_ERROR_MESSAGES.UNAUTHORIZED.message });
    }

    const response = await axios.get('http://localhost:3001/user/checkuser/sessionId', {
      headers: {
        'Authorization': token,
        'Cookie': req.headers.cookie
      },
      withCredentials: true
    });

    // Extract user details from the response and store it in session
    req.session.userId = response.data.userId;

    req.session.save(err => {
      if (err) {
        console.error('Session save error:', err);
        return res.status(CLIENT_ERROR.UNAUTHORIZED.code).json({ message: CLIENT_ERROR_MESSAGES.UNAUTHORIZED.message });
      }

      console.log('Session userId:', req.session.userId);
      next();
    });
  } catch (error) {
    if (error.response && error.response.status) {
      console.error('Authentication error:', error.response.data);
      return res.status(error.response.status).json({ message: error.response.data.message || CLIENT_ERROR_MESSAGES.UNAUTHORIZED.message });
    }
    console.error('Authentication error:', error.message);
    res.status(CLIENT_ERROR.UNAUTHORIZED.code).json({ message: CLIENT_ERROR_MESSAGES.UNAUTHORIZED.message });
  }
};
