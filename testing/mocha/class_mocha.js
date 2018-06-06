

const class_mocha = function () {
    const self = this;

    const internalFn = () => {
        return 'internal_fn'
    };

    self.fn1 = () => {
        return `class_mocha_fn1 + ${internalFn()}`;
    };
    
    //For internal functions created within this class, in order to have object reference to these, you need to have a class method that returns any internally formed functions 
    self.getInternalDependencies = () => {
        return {
            internalFn
        }
    }

};


module.exports = class_mocha;