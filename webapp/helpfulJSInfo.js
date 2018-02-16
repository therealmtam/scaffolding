// HELPFUL JS INFO:

//-----------------------------------------------
// JS NOTES:

  Hoisting:

    All vars and functions declared in a scope are hoisted to the top of that scope.
    However, for vars, the var name is what is hoisted, not it's value. Its value is
    defined during runtime just like anonymous functions. So this would work:
      a = 10;
      var a;
    But this would not work:
      console.log(a); //will console log undefined since only the var name 'a' is hoisted
      var a = 10;

    This scenario demonstrates the hoisted variable name and not value.
        a = 10;
        console.log(a); //prints 10
        var a = 12;
        console.log(a); //prints 12


//-----------------------------------------------
// ES6 (ECMASript 2015)

  //---------------------------------------------
  let and const:

    Use these to tightly control the scope in which variables will be use in.
    Something to note, these do NOT GET HOISTED like var does. Therefore, be careful
    in placing them at the beginning of a scope.

  //---------------------------------------------
  import vs require:

  Import and export default or export is ES6 syntax. Require and module.exports = ___ is Common JS.

  React uses import and export because it also uses ES6 syntax for 'class app extends Component' where class is an ES6 declaration.

  Both import and require can be used in the front-end where the JS engine is the browser. Using import would require transpilation to ensure all browsers can use it.

  On the backend, NOT ALL VERSIONS OF NODE WORK WITH IMPORT since ES6 is still being implemented. However, the ES6 can be transpiled and then it will work with the Node runtime environment. Otherwise, this will not work in Node v 6.11.4 but it may work in 9.5.0 as it is an experimental feature:

    import  { helper1 as HelperModule } from ('./helpers/helper1.js');
    HelperModule();

    and you must use:

    const HelperModule = require('./helpers/helper1.js');
    HelperModule();

    and the module must use module.exports = ___

  https://medium.com/the-node-js-collection/an-update-on-es6-modules-in-node-js-42c958b890c
  https://nodejs.org/api/esm.html#esm_notable_differences_between_import_and_require

//-----------------------------------------------
// VPN:


//-----------------------------------------------
// MQTT:
  It is pub/sub messaging protocol that works ontop of TCP/IP.


//-----------------------------------------------
// Promises:

  Promises are about making asynchronous code retain most of the lost properties of synchronous code such as flat indentation and one exception channel.

