// HELPFUL NODE INFO:

//-----------------------------------------------
// FS READ FILE (async):
/*
  Notes:
  Remember to encode data if it is not a string (ex. html).
  Binary data doesn't require encoding.
*/

fs.readFile(`${__dirname}/_____`, 'utf8', (err, html) => {
  if (err) {
    console.log(err);
  }
  response.status(200).send(html);
});
//-----------------------------------------------
// BODY PARSER:

  This requires npm installation:

    npm install --save body-parser

  BodyParser returns a function that acts as middleware. The function
  listens for req.on(‘data’) and constructs req.body from the chunks of data it gets.

    const bodyParser = require('body-parser');
    const multer = require('multer');

    // for parsing application/json (ex. Stringified JSON data):
    app.use(bodyParser.json());

    // for parsing application/x-www-form-urlencoded (ex. info from a <form method="post">:
    // This object will contain key - value pairs, where the value can be a string or
    // array(when extended is false), or any type(when extended is true).
    app.use(bodyParser.urlencoded({ extended: true }));

    // for parsing multipart/form-data (ex. using it for downloading a CSV file):
    app.use(multer());

  After the middleware is used on the request, request.body will exist and will
  contain the POST request's body info.

//-----------------------------------------------
// EXPORTING MODULES:

  There are many syntactical ways to export modules:

  modules.export = {
    fn1: fn1,
    fn2: fn2,
  }

  modules.export const fn1 = () => {

  }

//-----------------------------------------------
// DELOPYMENT NOTES:

1) Install npm:
  > sudo apt-get install npm
  > sudo apr-get update

2) Install node:
  > curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
  > sudo apt-get install -y nodejs
  (Reference: https://nodejs.org/en/download/package-manager/)

3) To run node as daemon:

  > sudo npm install -g forever  //this doesn't need to be on the dependencies list
  > sudo forever start ./server/index.

  (Reference: https://www.youtube.com/watch?v=P4mT5Tbx_KE)
  (Reference: https://github.com/foreverjs/forever)

  > sudo forever list //this shows all the forever processes running. Note it is different if sudo is omitted
  > sudo kill _#FOREVER PID_  //this kills the process


