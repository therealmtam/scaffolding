

//DEPENDENCIES
const printAll = require('max').printAll;
// const module_mocha = require('./module_mocha');


// console.log(`\n module_mocha => ${module_mocha}\n`);
// printAll(module_mocha);

// console.log(`\n module_mocha_fn1 => ${module_mocha.fn1}\n`);


//FN_MOCHA
const fn_mocha = function () {
    // console.log(`\n module_mocha_fn => ${module_mocha.fn1()}\n`);

    return 'fn_mocha';
}

//EXPORTS
module.exports = fn_mocha;