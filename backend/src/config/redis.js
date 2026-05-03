const { createClient } = require('redis');

const client = createClient({
    username: 'default',
    password: '3XFToQ5DVJg3R4KkEA8AFDLvXNzVVxNo',
    socket: {
        host: 'redis-18197.c1.us-west-2-2.ec2.cloud.redislabs.com',
        port: 18197
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




