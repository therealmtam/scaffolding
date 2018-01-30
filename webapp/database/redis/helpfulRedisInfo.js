// HELPFUL REDIS INFO:
//-----------------------------------------------
// General Notes:

  1)

//-----------------------------------------------
// HOW TO ACCESS REDIS VIA TERMINAL:

  Reference https://redis.io/commands

  After Redis has been started by running:

  > redis-server

  access Redis by:

  > redis-cli
  127.0.0.1: 6379 >GET _<key>_  //insert commands here

//-----------------------------------------------
// HOW TO FLUSH THE CACHE SCRIPT:

const redis = require('redis');

const ClearCache = function () {

  const client = redis.createClient();

  client.once('ready', () => {
    client.flushall((err, result) => {
      if (err) {
        console.log(err); //error handle
      }
      console.log('Removed Redis Cache');
      client.quit();
    });
  });
};

ClearCache();
//-----------------------------------------------
