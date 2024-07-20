const Constents = require('../helper/Constent.js');
const statusCode = require("../helper/statuscode.js");
const statusMessage = require("../helper/statusmessage.js");
const trevelModel = require('../models/travelDataModel.js')
const validator = require('validator');
exports.rendertrevelinputpage = async (req, res) => {
    try {
      
       const successMessages = req.flash('success') || [];
        res.render('destniform.ejs', { successMessages }); 
    } catch (error) {
        console.error('Error rendering travel input page:', error);
   
        res.status(statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR.code).send(statusMessage.SERVER_ERROR.INTERNAL_SERVER_ERROR.message);
    }
};

exports.travelData = async (req, res) => {
    try {
        const { from, to, startDate, endDate, people, mode, description } = req.body;
        console.log(req.session.userId);
        
        const isValidInput = (input) => {
            const regex = /^[a-zA-Z0-9\s\-]+$/; // Only allow letters, numbers, spaces, and hyphens
            return regex.test(input);
        };

        if (!isValidInput(from) || !isValidInput(to) || !validator.isDate(startDate) || !validator.isDate(endDate) || !validator.isInt(people, { min: 1 }) || !isValidInput(mode) || !isValidInput(description)) {
            return res.status(statusCode.CLIENT_ERROR.BAD_REQUEST.code).send(statusMessage.CLIENT_ERROR.BAD_REQUEST.message);
        }

        const travelData = new trevelModel({ from, to, startDate, endDate, people, mode, description, user: req.session.userId });
        const savedTravelData = await travelData.save();
        console.log(savedTravelData);
        req.flash('success', 'Travel data added successfully!');
        
        
        res.status(statusCode.SUCCESS.CREATED.code).send(statusMessage.SUCCESS.CREATED.message);
    } catch (error) {
        console.error('Error saving travel data:', error);
        res.status(statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR.code).send(statusMessage.SERVER_ERROR.INTERNAL_SERVER_ERROR.message);
    }
}
