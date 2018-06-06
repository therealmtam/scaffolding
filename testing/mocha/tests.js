'use strict ';

require('mocha');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');


const printAll = require('max').printAll;

describe('MODULE MOCHA', () => {

    const module_mocha = require('./module_mocha.js');
console.log('\n\n\n TEST\n\n\n');


    it('FN1 - Should be expected result', () => {

console.log(`\n fn_mocha BEFORE => ${require('./module_mocha').fn_mocha}\n`);

        let stubVar = sinon.stub(require('./module_mocha'), 'fn_mocha').returns('STUFF');

console.log(`\n fn_mocha AFTER => ${require('./module_mocha').fn_mocha}\n`);        
        // const expectedResult = 'module_mocha_fn1';
        
        const result = module_mocha.fn1();

        console.log(`\n result => ${result}\n`);
        
console.log(`\n fn_mocha AFTER AFTER => ${require('./module_mocha').fn_mocha}\n`);

printAll(require('./module_mocha').fn_mocha);

        // stubVar.restore();

console.log(`\n fn_mocha AFTER AFTER AFTER => ${require('./module_mocha').fn_mocha}\n`);
printAll(require('./module_mocha').fn_mocha);


    });

    if('', () => {


        console.log(`\n fn_mocha WAY AFTER => ${require('./module_mocha').fn_mocha}\n`);
    });

});



xdescribe('FN MOCHA', () => {

    const fn_mocha = require('./fn_mocha');

    it('Should pass' ,() => {

        console.log(`\n module mocha fn1 BEFORE => ${require('./module_mocha').fn1}\n`);

        sinon.stub(require('./module_mocha'), 'fn1').returns('NEW RETURN');

        console.log(`\n module mocha fn1 AFTER => ${require('./module_mocha').fn1}\n`);

        const result = fn_mocha();

        console.log(`\n result => ${result}\n`);
    });

    it ('Should pass2', () => {
        console.log(`\n module mocha fn1 WAY AFTER => ${require('./module_mocha').fn1()}\n`);


    });
});

xdescribe('', () => {
    
    it('', () => {
        
        console.log(`\n module mocha fn1 WAY WAY AFTER => ${require('./module_mocha').fn1()}\n`);
    })
})
