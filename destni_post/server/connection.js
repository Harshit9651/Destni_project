const dotenv = require('dotenv');
dotenv.config();


const mongoose = require('mongoose');

async function main() {
  // const url = await process.env.MONGODBURL;
  // console.log(url)
    await mongoose.connect(process.env.MONGODBURL);
  console.log("mongoose responsed sucessfully");
}

module.exports = main();
