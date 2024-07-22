const bcrypt = require('bcryptjs');
const statusCodes = require('../helper/statuscode.js');
const jwt = require('jsonwebtoken');

const Constants = require('../helper/Constent.js');

const User = require("../models/signupModel.js");

const { JWT_SECRET } = process.env;

exports.rendersigninpage =async(req,res)=>{
    res.render('signin.ejs')
    }
    
    
    exports.signin = async (req, res) => {
      const { username, password } = req.body;
      console.log(username, password);
    
      if (!username ||!password) {
        return res.status(statusCodes.CLIENT_ERROR.BAD_REQUEST.code).json({ error: 'Please provide both username and password' });
      }
    
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return res.status(statusCodes.CLIENT_ERROR.UNAUTHORIZED.code).json({ error: 'Invalid username ' });
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(statusCodes.CLIENT_ERROR.UNAUTHORIZED.code).json({ error: 'Invalid username or password' });
        }
    
        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: Constants.session_Expire });
        res.cookie('token', token, { httpOnly: true, secure: false });
    
        req.session.userId = user._id;
        console.log('Session set userId:', req.session.userId);
    
        res.status(statusCodes.SUCCESS.OK.code).json({ message: 'Signin successful', token });
      } catch (err) {
        console.error(err);
        res.status(statusCodes.SERVER_ERROR.INTERNAL_SERVER_ERROR.code).json({ error: 'Internal server error' });
      }
    };
    
    
    