const {createClient}= require('redis');
const client =createClient();
const redisDatabase = async () => {
    try {
        await client.connect();    
        console.log("Redis Connected")
    } catch (error) {
        console.log(error); 
    }
}
module.exports={client,redisDatabase};