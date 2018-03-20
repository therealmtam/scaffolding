const Promise = require('bluebird');

//------------------------------
//PROMISES in ES6:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

//------------------------------
// PROMISIFYING AND USAGE:

//Promisifying Async Ops:

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