const printAll = require('max').printAll;

const fn_mochaREQ = require('./fn_mocha.js');

// console.log(`\n fn_mocha0 => ${module.exports.fn_mocha}\n`);
// console.log(`\n fn_mocha1 => ${module.exports.fn_mocha()}\n`);

const fn1 = () => {
    console.log(`\n require('./fn_mocha') => ${require('./fn_mocha')}\n`);
printAll(require('./fn_mocha'));

    console.log(`\n fn_mocha1 => ${module.exports.fn_mocha}\n`);
    console.log(`\n fn_mocha2 => ${module.exports.fn_mocha()}\n`);
    console.log(`\n fn_mocha.restore => ${require('./fn_mocha')}\n`);
    return 'module_mocha_fn1';

};


const fn2 = () => ('module_mocha_fn2');


module.exports = {
    fn1,
    fn2,
    fn_mocha: fn_mochaREQ
}