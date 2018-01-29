// MODULES:
const express = require('express');

const app = express();
//-------------------------------------------------------------------
// HELPER MODULES:
/*
  These modules are functions developed by us.
  example) const handleCSV = require('./helpers/handleCSV.js');
  Note: the relative file path.
*/

//-------------------------------------------------------------------
// MIDDLEWARE USED PRIOR TO ALL ROUTING:
/*
  example) app.use(<function to use>);
  Note: middleware must be loaded first, and must include next() to pass the request
  to the next middleware function in the call stack.

  express.static is needed if you want to send not only the HTML, but also
  bundle.js, style.css, and other static assets in one go. Otherwise, fs.readfile
  for each file is the only other option.
*/

app.use(express.static(`${__dirname}/../client/dist`));
//-------------------------------------------------------------------
// ROUTES:
/*
  example) app.get('/', <middleware function(s)>, (req, res) => {});

  Common Status Codes:
  200 - OK - Req has succeeded. Typically used after GET
  201 - Created - Req has successfully created __. Typically used after POST or PUT
  301 - Moved Permanently - Endpoing has been reassigned. The new URI is returned
  400 - Bad request - Req has invalid syntax.
  404 - URL is not recognized (ie. endpoint not valid)
*/

//------------------------------------------
app.get('/testget', (request, response) => {
  response.status(200).send('TEST /testget');
});
//------------------------------------------
app.post('/testpost', (request, response) => {
  response.status(201).send('POST /testpost');
});
//------------------------------------------
app.get('/test/:id', (request, response) => {
  response.status(200).send(request.params.id);
});


//-------------------------------------------------------------------
// SETUP CONNECTION TO SERVER:
const port = 3000;

app.listen(port, () => {
  console.log(`Connected to http://127.0.0.1:${port}`);
});

