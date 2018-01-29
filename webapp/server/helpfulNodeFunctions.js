// HELPFUL NODE FUNCTIONS:

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
/*
  Notes:

*/

const bodyParser = require('body-parser');


