
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

async function main() {
  const url = await process.env.MONGODB_URL;

//console.log(url)
  await mongoose.connect(process.env.MONGODB_URL );
  console.log("mongoose responded successfully");
}

module.exports = main();

