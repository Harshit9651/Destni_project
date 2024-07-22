const client = require('./redis.js');

const cacheMiddleware = (key, duration) => async (req, res, next) => {
  try {
    const cachedData = await client.get(key);
    if (cachedData) {
      console.log('Cache hit');
      return res.status(200).json(JSON.parse(cachedData));
    }
    next();
  } catch (error) {
    console.error('Redis error:', error);
    next();
  }
};

const cacheResponse = (key, data, duration) => {
  client.set(key, JSON.stringify(data), 'EX', duration);
};

module.exports = { cacheMiddleware, cacheResponse };
