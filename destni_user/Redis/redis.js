const redis = require("redis");
const client = redis.createClient();
client.on('error',(err)=>{
    console.log('redis err',err);
})
client.on('connect',()=>{
    console.log('connected to redis ')
})

client.connect();
module.exports = client;