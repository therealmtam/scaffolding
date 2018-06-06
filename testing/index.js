//----------------------------
//This module exports one function module.exports = function () {}
const fn_mocha = require('./mocha/fn_mocha');

//expect: 'fn_mocha'
console.log(`\nfn_mocha => ${fn_mocha()}\n`);

//----------------------------
//This is like a node module that exports functions via an object { fn1: ()=>{}, fn2: ()=>{}, ...}
const module_mocha = require('./mocha/module_mocha');  

//expect: 'module_mocha_fn1'
console.log(`\nmodule_mocha_fn1 => ${module_mocha.fn1()}\n`);

//----------------------------
//This module exports a class with internal dependencies (internal functions within the class) and module dependencies.
const class_mocha = require('./mocha/class_mocha');

const testClass = new class_mocha();

//expect: 'class_mocha_fn1 internal_fn'
console.log(`\ntestClass.fn1 => ${testClass.fn1()}\n`);




