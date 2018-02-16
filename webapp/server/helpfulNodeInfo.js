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

A better way is to pipe a readable stream to the response which is a writable stream.
This allows the browser to render content as it is recieved in chunks rather than having
to wait for the entire chunk to come in.

See the NodeJS notes for a better idea.

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

  Modules are executed in their own module scope and not in an overall global scope.
  For instance, if index.js requires a function located in another module and executes it
  in the index.js scope, the function, when called, will use modules and libraries that are
  located ONLY IN ITS MODULE and NOT the modules/libraries in index.js.

  Therefore, modules need to have their own set of dependencies and don't normally share them in the global
  scope. There is probably some way to make them global, but that may lead to future errors when a piece of code
  has dependencies you don't know where they are located.

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
  > sudo kill _#_of_FOREVER_PID_  //this kills the process


//-----------------------------------------------
// NOTES:
  //-----------------------------------------------
  READ/WRITE STREAM vs READ:

  let myReadStream = fs.createReadStream(__dirname + '/document.txt', 'utf8'//omit this if sending binary data);  //every read stream needs a write stream to send the buffered data to.
  let writeStream = fs.writeStream(__dirname + '/newdoc.txt' //location to write it to)

  There are 2 ways to send the data on the readstream buffer to the writestream:
  1) myReadStream.on('data', (chunk) => {
    console.log('buffer data chunk = ', chunk);
      writeStream.write(chunk)
    });

  2) myReadStream.pipe(writeStream); //this take removes the need for the event listener and will automatically pipe the readstream buffer data to the write stream

  This is especially useful when sending to the writable stream which is the Response object:

    app.get('/', (request, response) => {
      let myReadStream = fs.createReadStream(__dirname + '/document.txt', 'utf8');
      myReadStream.pipe(response);
    })

    One thing to make sure of is that the content-type is properly set so the browser can understand how to read the data.

    If the content-type is html, the browser by default knows this type and will interpret incoming data as such without setting headers or even an encoding type for the readstream.

      app.get('/', (request, response) => {
        let myReadStream = fs.createReadStream(__dirname + '/index.html');
        myReadStream.pipe(response);
      })

    If the content-type is plain-text, the browser by default also knows this type and will interpret the incoming data as such without setting headers or even an encoding type for the readstream.

    If the content-type is json, the headers need

  //-----------------------------------------------
  HEADERS:

  Headers are used to tell the endpoint information about what is in the Request or the Response.
  A browser, when entering a URL and sending a GET request to an endpoint, will send its own set of headers
  as seen below from Chrome.
  You can then filter the requests and adjust responses based on certain criteria such as recieving the Content-Type
  headers in the 'accept' header can give a server clues about what to send back to the user and the 'user-agent' can
  also help tell the endpoint about what browser the request came from so that it can send back appropriate content.


  response.writeHead(200, { 'Content-Type': 'text/html' } );  //writes the headers for the response to tell the browser it will get text that is html

  Common content-types:
    text/plain
    text/html
    application/json; charset=utf-8 //specifies that the content is JSON encoded in utf8

    image/png
    multipart/form-data
    audio/mpeg
    video/mp4

    This header indicates that the body content is presented in the html format. The
    format of the content type values is a primary type/subtype followed by an optional
    semicolon delimited attribute-value pairs (known as parameters).

    https://stackoverflow.com/questions/23714383/what-are-all-the-possible-values-for-http-content-type-header

  To access the headers of a Request object, just target the headers key:

  request.headers => For a default GET request by the browser pinging a given endpoint 'localhost:3000/testroute':

    { host: 'localhost:3000',
    connection: 'keep-alive',
    pragma: 'no-cache',
    'cache-control': 'no-cache',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
    accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.9' }

  //-----------------------------------------------
  TCP server vs UDP =>

  There are 2 ways of handling connections, TCP or UDP. UDP doesn't do a handshake to make sure that the data has gotten to the endpoint. It just continuously sends data packets (streams / buffers of bytes) to the endpoint. TCP, on the otherhand, will do a handshake with the endpoint which also takes more time and effort. Thus, UDP is great for VoIP services. TCP is a superset of HTTP server. HTTP server is a TCP server but with REST and some other add-ons.

  https: //stackoverflow.com/questions/23444308/tcp-server-vs-http-server-in-vert-x

  You would use HTTP server(usually as Express.js) if you want the request - response paradigm of communication.Requests come from clients and responses from server.A very typical model of how the web works.

  In TCP(sockets), it is a different paradigm.The client opens a longer - lived channel between it and the server, where both can send each other anything(data) anytime.Any one can terminate at any time.Think of a meassing app that
  for example created a new connection socket with the server, tells it that it is user #24578, then server checks if there are new messages to “push” to that user. The connection stays open, when some one at that time sends a new message, the server checks if the user is online (because the connection is still there) and instanly route the message to that user. Otherwise stores it for the next time the user connects (opens a socket). Hence the realtime term. Note things like server “pushing” in TCP.

  Things like FTP, SMTP use TCP like HTTP.

  https: //www.youtube.com/watch?v=qSAze9b0wrY

  https://www.quora.com/What-is-the-difference-between-an-HTTP-server-and-a-TCP-server-in-NodeJS

  So FTP, SMTP, HTTP are ways of structuring the data that will be sent over the open socket. TCP is the protocol by which that data is transmitted. so HTTP uses TCP to do the transmission.

  Ports are the specific address at which incoming information can arrive at the computer. When using a node server, it listens to that port from within the computer so when there are incoming requests to that port on that computer, it can receive them. Ports are used to handle outside-computer information and route it to a specific program on the computer that wants that internal piece of data - like a shipping port.

  //-----------------------------------------------
  WEBSOCKETS:

    Using Socket.io:

    Server side:

      const app = express();
      app.listen(3000, () => {
        console.log('Connected to port ', 3000);
      })

      const socket = require('socket.io');
      let io = socket(app); //this turns the port into a socket called io.
      io.on('connection', (socket) => {
        console.log('Socket passed in info ', socket.id); //the socket object has different properties
      });

    Client side:

      import io from 'socket.io-client/dist/socket.io'; //this is ES6
      (OR you can cdn <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js"></script>)
      (so then the library is in the global scope and 'io' can be accessed):

      const socket = io.connect('http://localhost:3000'); //this emits a connection event on the server.

    For more on setting up socket:
    https://www.youtube.com/watch?v=KNqVpESuyQo

    The number of concurrent socket connections to a server is variable but here is a test:
    http://drewww.github.io/socket.io-benchmarking/

      The lesson is, when a server queues up too many async tasks (i.e., there are too many async tasks that
      fill the queue faster than the queue can be cleared), then the server performance is dramatically
      degraded. This happens for sockets just as it happens for too many simultaneous connections to a
      database. To prevent this bottleneck, one should be mindful of the queuing of async tasks and
      figure out the performance of a given server as more tasks are given to it, even synchronously
      executed tasks.
  //-----------------------------------------------
  Process - Global Node Object:

  The process object is a global that provides information about, and control over, the current Node.js process.As a global, it is always available to Node.js applications without using require().

  In any Node environment, you can type in process to find all the properties it has:
    ~ > Node //runs a node environment
    >process  //when this is run, there are many global properties

  It is used by HEROKU to specify the port number for the server using:

    process.env.PORT

  Any user created variables in the environment will disappear once the runtime environment is exited.

  Process can create a read and writeable streams:

    Process.stdin:
      The process.stdin property returns a stream connected to stdin(fd 0).It is a net.Socket(which is a Duplex stream) unless fd 0 refers to a file, in which case it is a Readable stream.

    Process.stdout:
      The process.stdout property returns a stream connected to stdout (fd 1). It is a net.Socket (which is a Duplex stream) unless fd 1 refers to a file, in which case it is a Writable stream.

      process.stdin.setEncoding('utf8');

      process.stdin.on('readable', () => {
        const chunk = process.stdin.read();
        if (chunk !== null) {
          process.stdout.write(`data: ${chunk}`);
        }
      });

      process.stdin.on('end', () => {
        process.stdout.write('end');
      });

    Process.stdout and process.stderr differ from other Node.js streams in important ways:

      - They are used internally by console.log() and console.error(), respectively.
      - They cannot be closed (end() will throw).
      - They will never emit the 'finish' event.
      - Writes may be synchronous depending on what the stream is connected to and whether the system is Windows or POSIX.

    (NOTE: console.log() is a synchronous function)

//-----------------------------------------------
// EXPRESS:

  1) Express.static:

    app.use(express.static('__file location of static assets__'));

    This middleware will be used on every request and check to see if the request is looking for a static asset. If it is, then the middleware will check the file location you specify to see if that asset is inside. If it isn't then you have to specify where that static asset is in the app.get('/__your route here__') routing.

    Ex. for static assets you want to serve on an individual basis that are outside of the express.static target location, you have to specify that location and pipe or fs.readFile and send the output manually because the request will fall through the middleware and needs to be handled since the static asset isn't there.

      app.get('/', (request, response) => {
        const readStream = fs.createReadStream(__dirname + '/../client/index.html');
        readStream.pipe(response);
      });

//-----------------------------------------------
// EVENT LOOP AND THREADING WITH NODEJS & JS

  When an async process is executed, it is then sent to a background worker that places it
  into an event queue and each task in the queue and executed by the thread pool of the Nodejs
  Process for concurrent processing.

  Once an event is completed, it's callback function is then put onto a callback queue where
  the event loop picks items from and places onto the call stack when the call stack is cleared.

  https://medium.com/@tigranbs/concurrency-vs-event-loop-vs-event-loop-concurrency-eb542ad4067b
  https://www.codingeek.com/tutorials/nodejs/is-nodejs-single-threaded/
  https://medium.com/@gaurav.pandvia/understanding-javascript-function-executions-tasks-event-loop-call-stack-more-part-1-5683dea1f5ec

  This makes Nodejs a single threaded process as it utilizes a threadpool for async operations
  and events.

//-----------------------------------------------
// JS ENGINES:

    https://www.youtube.com/watch?v=86tgU7UaJmU
    https://www.youtube.com/watch?v=UP5sAaHaZPk

    NodeJS is written in C++ since it utilizes Google's V8 JS engine which is written in C++.

    The stack of conversion is Javascript => C++ => Assembly Language => Machine Code.