const client = require("../../config/redis");

 const getRedis = async (req, res, next) => {
  const redisData = await client.get("allEmployee");
  if (redisData) {
    res.status(200).json({
      data: JSON.parse(redisData),
      message: "all data fecth from redis successfully",
    });
  } else {
    next();
  }
};
module.exports={getRedis}