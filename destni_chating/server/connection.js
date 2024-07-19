const mongoose = require('mongoose');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Destni_chatting');
  console.log("mongoose responsed sucessfully");
}

module.exports = main();
