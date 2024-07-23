const mongoose = require('mongoose');

async function main() {
  // Use 'host.docker.internal' if you're on Docker for Windows/Mac or adjust accordingly for Linux
  await mongoose.connect('mongodb://127.0.0.1:27017/Destni_user');
  console.log("mongoose responded successfully");
}

module.exports = main();

