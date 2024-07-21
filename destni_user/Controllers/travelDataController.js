const Constents = require('../helper/Constent.js');
const statusCode = require("../helper/statuscode.js");
const statusMessage = require("../helper/statusmessage.js");
const trevelModel = require('../models/travelDataModel.js')
const validator = require('validator');
const client = require('../Redis/redis.js')
const { cacheMiddleware, cacheResponse } = require('../Redis/redisMiddleware.js');

exports.rendertravelinfopage = (req,res)=>{
    try{
res.render("destniform.ejs");

    }catch(error){
        res.status(statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR.code).send(statusMessage.SERVER_ERROR.INTERNAL_SERVER_ERROR)
    }
}


exports.saveTravelInfo = async (req, res) => {
    const { from, to, startDate, endDate, people, mode, description } = req.body;
    const user = req.session.userId
  console.log( from, to, startDate, endDate, people, mode, description)

    // Convert people to a number
    const peopleCount = Number(people);
  
    // Input validation
    if (!from || !to || !startDate || !endDate || !peopleCount || !mode) {
      return res.status(statusCode.CLIENT_ERROR.BAD_REQUEST.code).json({ error: 'Please fill all required fields' });
    }
  
    // Validate dates
    if (new Date(startDate) >= new Date(endDate)) {
      return res.status(statusCode.CLIENT_ERROR.BAD_REQUEST.code).json({ error: 'End date must be after start date' });
    }
  
    // Validate people
    if (isNaN(peopleCount) || peopleCount <= 0) {
      return res.status(statusCode.CLIENT_ERROR.BAD_REQUEST.code).json({ error: 'Number of people must be a positive integer' });
    }
  
    // Validate mode
    const validModes = ['bus', 'train', 'flight', 'sharing_cab', 'other'];
    if (!validModes.includes(mode)) {
      return res.status(statusCode.CLIENT_ERROR.BAD_REQUEST.code).json({ error: 'Invalid mode of transport' });
    }
  
    try {
      // Create a new Travel document
      const newTravel = new trevelModel({
        from,
        to,
        startDate,
        endDate,
        people: peopleCount, // Use the parsed number
        mode,
        description,
        userId:user
      });
  
      // Save the document to the database
      const travelInfo = await newTravel.save();
      console.log(travelInfo);
  
      // Send a success response
      res.status(statusCode.SUCCESS.CREATED.code).json({ message: 'Travel information saved successfully', data: travelInfo });
    } catch (err) {
      console.error(err);
      res.status(statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR.code).json({ error: 'Internal server error' });
    }
  };
  



exports.rendersearch=async(req,res)=>{
res.render('searchinput.ejs')
 }






exports.searchUsersByCity = async (req, res) => {
  const { city } = req.query;
  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    const users = await trevelModel.find({ to: new RegExp(city, 'i') });
    cacheResponse(city, users, 3600);
    res.status(200).json(users);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
