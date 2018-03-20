//--------------------------------------------------
//PROMISES using PROMISE LIBRARY (For Browser and Node.js):
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
// https://www.promisejs.org/
//--------------------------------------------------
{

// Default version of promises for Node
const Promise = require('promise');

//PROMISIFYING ASYNC OPS:
//-----------------------

  let myFirstPromise = new Promise((resolve, reject) => {
    //We call resolve(...) when the async op is successful,
    //and reject(...) when it fails (i.e. when an error is thrown).

    //If this 'throw' is included, setTimeout will not be called and
    //the thrown item needs to be caught by a catch block:
    // throw Error('Error is thrown');
    // throw 'Catch Me';  // you can throw anything to a catch block;
    // throw [1,2,3];  // you can throw anything to a catch block;

    //The parameter passed into resolve will be .then((<passed in here>) => {}) for the next promise
    setTimeout(() => {
      let result = 'Success!';
      resolve(result);
    }, 250);

  });

  //To call a promisified async op:

    myFirstPromise.then((result) => {
      console.log("Yay! " + result);
    }).catch((err) => { console.log(err); });

  //Note: to trigger a promise's async function, you need to call the .then() method.
  //The .then() method will receive the return result of the async operation.


//.THEN():
//---------------
//Promise.prototype.then(onFulfillmentCallback, onRejectionCallback):

//The .then() method returns a promise that takes in a success and failure callback.
//It calls the success callback if the previous Promise calls resolve(<result>).
//It calls the failure callback if the previous Promise calls reject(<thrown error>).
//Either resolve() or reject() can fire. Both WILL NOT FIRE.

//Note that when resolve() or reject() is executed, the remaining code after is still executed.
//The .then() fires ONLY AFTER THE MAIN CALLSTACK IS EMPTY. Therefore, code after a resolve() or reject()
//will fire first before the .then() fires and can handle the result or the error passed in via resolve() and reject().

//Whatever is RETURNED by the success and failure callbacks is passed into the next .then()
//as the result (i.e., .then(onFulfillmentCallback(result)).

//When an error has been caught either by (1) .catch(err => {}) OR (2) onRejectionCallback(reason)
//it no longer falls through the chain and the next .then() will fire onFulfillmentCallback(result).

  function onFulfillmentCallback1(result /*= returnValOfPreviousPromise*/) {
    //do tasks here

    //If this Fulfillment Callback fires another Async function, you must promisify it
    //so this returned promise will be chained to the next .then() method in the chain.
    //By returning a new Promise, this promise is automatically passed into the
    //current .then()'s promise resolve => resolve(new Promise);

    function async2(callback) {
      let result = 'done';
      callback(result);
    }

    return new Promise((resolve, reject) => {
      async2(resolve);
    });
  }
    //or

    //If you want to simply return a value, this value will be automatically passed into
    //the current .then()'s resolve(<returned value>).

  function onFulfillmentCallback2(result /*= returnValOfPreviousPromise*/) {
    return result + 'this was added to result';
  }

  //The onRejectionCallback of the .then() method is === .catch(err => {}).
  //It is better to use a catch block instead of writing a onRejectionCallback for every
  //Promise in the promise chain.

  function onRejectionCallback1(reason /*= thrown error*/) {
    //actions to take depending on the incoming error
    console.log(reason);
  }

  //Example of .then():

  const Promise1 = new Promise((resolve, reject) => {
    resolve('1stPassedDownResult');
    reject('Error message');  //As noted above, either resolve OR reject will fire. In this case resolve will.
    console.log('This fires before the .then() executes');
  });

  Promise1.then((result) => {
    console.log(result); //result = '1stPassedDownResult'
    //return a promise or a value for the next .then()
    return 10;
  }, (reason) => {
    //handle Promise1's errors based on the reason
    //Optional - return a value to the next .then() can have a result param in its onFulfillmentCallback(result)
  }).then((result) => {
    console.log(result); //result = 10
    throw 'Final Error';
    return 'This won\'t be passed to the next .then() since an error is thrown'
  }).then((result) => {
    console.log(result); //this won't be called since an error was thrown by the previous Promise
  }).catch(err => {
    console.log(err); //err = 'Final Error'
    //error handle
  });

//.CATCH():
//---------------
//Promise.prototype.catch(onRejectionCallback)

//The .catch() method returns a promise that takes in a failure callback.
//The onRejectionCallback method gets its <err> value in one of two ways:
//(1) from a reject(<error>) being called OR
//(2) from a Error (or other item) thrown further up the Promise chain.

  function onRejectionCallback2(err) {
    //error handle based on the thrown err
    console.log('Error Found ', err);
  }


//.RESOLVE() AND .REJECT():
//--------------------------
// These methods are used to shorten your code by allowing you to
// call .Resolve() and .Reject() without having to create an entire new Promise((resolve, reject) => {})
// just to pass a value to a chain of subsequent Promises.

//Calling Promise.resolve(<whatever value you want to pass to the next promise as the result>)
//immediately invokes the resolve function of the Promise once the .then() is called on it.

//The value can be:
//(a) another promise that will return a value into resolve() via it's resolve() method or simply return if it is a chained promise without an explicit resolve();
//(b) a value (this is the primary use of immediately invoked promise.resolve())

  const PromiseNow2 = new Promise((resolve, reject) => {
    resolve('Resolution from PromiseNow2');
    console.log('This fires first from the main call stack');
  });

  Promise.resolve(10).then(result => {
    console.log('PromiseNow1 fires 3rd ', result);
  }).catch(err => {
    console.log(err);
  });

  Promise.resolve(PromiseNow2).then(result => {
    console.log('PromiseNow2 fires 4th ', result);
  }).catch(err => {
    console.log(err);
  });

  console.log('This first 2nd as synch. code from the main call stack');

//Calling Promise.reject(<whatever value you want to pass to .catch(<here> => {}) OR the
//next promise's onRejection(<here>)) immediately invokes the rejection function of the Promise
//once the .then() is called on it.

  Promise.reject('Immediately Reject').then(onFulfillmentCallback1, onRejectionCallback1);

  //OR

  Promise.reject('Immediately Reject').catch(err => {
    console.log('Immediate Rejection Msg ', err);
  });

//PROMISE.ALL([promise1, promise2, promise3, ...]):
//--------------------------

//Promise All stores all the promises to execute in an array.
//Once all the promises have completed, their results are returned in an array
//with their results in the same index as their corresponding promise.

const p1 = Promise.resolve(3);
const p2 = 42;
const p3 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([p1, p2, p3]).then(results => {
  console.log('Promise All Results ', results);
});
// expected output: Array [3, 42, "foo"]


//PROMISES IN THE BROWSER:
//-----------------------
//https://www.promisejs.org/

// Promises are currently only supported by a pretty small selection of browsers (see kangax compatibility tables).

// The good news is that they're extremely easy to polyfill (minified / unminified):

  //<script src="https://www.promisejs.org/polyfills/promise-7.0.4.min.js"></script>

  // var jQueryPromise = $.ajax('/data.json');
  // var realPromise = Promise.resolve(jQueryPromise);
  //now just use `realPromise` however you like.

}

//--------------------------------------------------
//BLUEBIRD LIBRARY:
//--------------------------------------------------

// To get started
// (1) > npm install --save bluebird
// (2) include this at the top of the module:
{
  const Promise = require('bluebird');

// .PROMISIFY(<function>)
//----------------------
// http://bluebirdjs.com/docs/api/promise.promisify.html

  //To promisify a node function, the function should conform to node.js convention of
  //accepting a callback as the last argument and calling that callback with error as the first argument
  //and success value on the second argument.

  // https://stackoverflow.com/questions/30116122/im-trying-to-use-the-bluebirds-method-promisify-and-its-not-working

  //Your node function must follow the following convention:
  //Note: the callback MUST BE THE LAST ARG out of all the args. It can also be the only arg.

    const nodeFunction = function( a1, a2, a3 /*...other args*/, callback) {
      //async function
      setTimeout(() => {
        let err = null;   //ex. of a error case => err = new Error('error found');
        let result = a1 + a2 + a3;

        //An error value needs to be passed into the callback. If (error) exists, the promise will call
        //the reject(<error value>) and pass in that error value, otherwise it will call resolve(<result value>);

        //call the callback with the node style calling convention of (err, successValueToPassOn)
        callback(err, result);
      }, 500);
    }

    const nodeFunctionAsync = Promise.promisify(nodeFunction);

    nodeFunctionAsync('arg1', 'arg2', 'arg3').then(result => {
      console.log('Result Here ', result);
    }).catch(err => {
      console.log('Error Here ', err);
    });

  //Depending on the API, you can promisify individual functions if they follow the node-style callback convention:

    const fs = require('fs');
    const readFileAsync = Promise.promisify(fs.readFile);

    readFileAsync('./random.txt', 'utf8').then(result => {
      console.log('Just read this file: ', result);
    });

  //To promisify all instances of a class's methods, you can call the method on the prototype
  // http://bluebirdjs.com/docs/api/promisification.html

    // Promise.promisifyAll(require("mysql/lib/Connection").prototype);
    // Promise.promisifyAll(require("mysql/lib/Pool").prototype);


//.PROMISIFYALL()
//---------------
//http://bluebirdjs.com/docs/api/promisification.html

//Promise.promisifyAll(<target library>) creates promises out of all of the exported functions in
//the target library/module.

// Promisifies the ENTIRE OBJECT ([] or {}) by going through the object's properties and creating an async equivalent OF EACH FUNCTION on the object and its prototype chain. The promisified method name will be the original method name suffixed with suffix (default is "Async"). Any class properties of the object (which is the case for the main export of many modules) are also promisified, both static and instance methods.

// Note that the original methods on the object ARE NOT OVERWRITTEN, NEW METHODS ARE CREATED with the Async - suffix.For example, if you promisifyAll the node.js fs object use fs.statAsync to call the promisified stat method.

  Promise.promisifyAll(require('fs'));

  //To use the promisified versions of the exported functions, add Async to the end of the function name:

  fs.readFileAsync('./random.txt', 'utf8').then(result => {
    console.log('PromisifyAll read this file: ', result);
  }).catch(err => {
    console.log('PromisifyAll Error ', err);
  });

  //The original non-promisified version:

  fs.readFile('./random.txt', 'utf8', (err, result) => {
    if (err) console.log('read file error ', err);
    console.log('read file result ', result);
  });


  //You can promisify async functions in one call using .promisifyAll():

    // const func1 = () => {};
    // const func2 = () => {};

    // Promise.promisifyAll([func1, func2]);

    // func1Async().then();
    // func2Async().then();


//.MAP()
//------
//http://bluebirdjs.com/docs/api/promise.map.html

//This method is used to replace the 2 step process of creating an array of promises then using Promise.all([]).then()
//to return an array of the results from all of the promises.

  //This is the promise.All() way:
    const fileNames = ['random.txt','random.txt','random.txt'];
    var promises = [];
    for (var i = 0; i < fileNames.length; ++i) {
      promises.push(fs.readFileAsync(fileNames[i]));
    }
    Promise.all(promises).then(function () {
      console.log("done");
    });

  //This is the promise.map way:
    Promise.map(fileNames, function (fileName) {
      // Promise.map awaits for returned promises as well.
      return fs.readFileAsync(fileName);
    }).then(function () {
      console.log("done");
    });

//.REDUCE()
//---------
//http://bluebirdjs.com/docs/api/promise.reduce.html

  //The reduce method applies a given reducer function to an array of iterables (could be an array of promises).

  //This is useful if a reducing process requires async actions.

  Promise.reduce(["random.txt", "random.txt", "random.txt"], (total, fileName) => {
    return fs.readFileAsync(fileName, "utf8").then(contents => {
      return total + contents;
    });
  }, 0).then(total => {
    console.log(total);
  });


}


