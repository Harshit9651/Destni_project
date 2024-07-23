require('dotenv').config();
const redis = require("redis");
const client = redis.createClient({
    url: `redis://${process.env.REDIS_HOST || '127.0.0.1'}:${process.env.REDIS_PORT || 6379}`
  });
  
client.on('error',(err)=>{
    console.log('redis err',err);
})
client.on('connect',()=>{
    console.log('connected to redis ')
})

client.connect();
module.exports = client;