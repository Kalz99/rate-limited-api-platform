const { createClient } = require('redis');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


const client = createClient({
    username: 'default',
    password: process.env.REDIS_PW,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }

});


client.on('error', (err) => {
    console.error('Redis Error:', err);
});

(async () => {
    await client.connect();
    console.log('Redis connected');
})();

module.exports = client;




