/*
HOW SINON WORKS:

Sinon is used for substituting dependencies (functions or modules that contain many functions { fn1:.., fn2:..}, or any global object or function (such as Date objects etc.)) during unit testing.

Mocha tests are run in a node process and then killed once the test ends. During that process, Sinon can be used to stub (return a specific value) / mock (us a mock function) / fake dependencies. 

https://stackoverflow.com/questions/346372/whats-the-difference-between-faking-mocking-and-stubbing

For stub/fake/mocks, how Sinon does this is manipulate the object (has to be an object) that contains the target method or value and add additional properties to it. For instance, if a module is this:

Module is { fn1: fn2: }, target function to mock is fn1. Sinon will do something to the effect of:

sinon manipulated module => { fn1: mock/fake/stub version, fn2: unchanged, originalVersionOfThisModule: { fn1: fn2: }, restoreToOriginalVersion: ()=>{}}. 

Sinon does this manipulation in the global space because the function that is being unit tested will only have access to it's module's scope and in its module's scope is the interface between it's module and the global space. So the only way Sinon can get the module's call for dependencies to it's modules is via the global scope. 

A common way sinon does this is that it manipulates the object returned by the require method => require('...'). It does NOT manipulate the actual module's file (i.e. it won't do an fs.writeFile and manipulate the actual js files of the library or dependency), just the object that is being returned by require(...). These objects, once loaded by Node JS via a read require('') are cached during run-time and exist in the global space for the duration of the Node process.

[ global scope of module method being called === the module's file ] => looks up global dependencies via require('') and during this lookup, sinon will have already manipulated the object that will be returned by require('...the dependency...'). So when the module calls it, it will get the Sinon manipulated version.

To use Sinon, you need to have the EXACT REFERENCE TO THE OBJECT the module will call during runtime. So if a new class is created during runtime within a module and that class has a method that you want to mock, then in the mocha test, before running any tests, you need to have Node run that file first so the new instace of the class is created.Then within that file, you need to have a specific module.exports property that exports that newly created class so you can get the reference to that newly created class via the mocha test file.

The key thing with Sinon is that it has to receive an object because it has to add those additional properties to it. If you are trying to mock a module.exports = function(){}, require('this module') will return a function which Sinon won't be able to put those properties on to copy the original or restore the original version. To work around this and manipulate the function returned by require(''), you can either:

- Revise the module that contains the function being tested to export the function (ex. module.exports = { fnFromModule: require('module that exported only a function') } and then use fnFromModule throughout the module instead of directly using the function from require('...')). Sinon can then manipulate the module.exports = { fnFromModule: ... } object and add on those properties.

- Use proxyquire which will take any paths to modules you want to stub along with their stub values and load them via require('module to sinon mock/fake/stub') and replace the object. So it takes the task of sinon.stub which manipulates the require('') object and does it itself. The limitation of this is that you can't create multiple versions of stubs and have to create essentially a mock function that you replace the dependency with in order to allow for multiple different return values.

Another key thing is that once a Sinon.stub/mock/fake has been created, unless you Sinon.restore or reset the Sinon object, it will persist throughout the entire mocha test (Node process) since it has manipulated the object in the global space. So all tests will see this same stub/mock/fake unless they have been restored to their original object forms via the Sinon restore or other resetting commands. It doesn't matter where in the mocha file a stub is created, it will persist unless you account for resetting in via some way such as beforeEach/afterEach.

So the key things here is for usage of Sinon, you need the exact object reference and it is best to reset the stub/fake/mock before each test.
*/