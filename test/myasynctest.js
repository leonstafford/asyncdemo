const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const { expect } = chai;

// TODO: asynchronously fetch data from here for each plugin
// get list of plugin downloads by day at:
// http://api.wordpress.org/stats/plugin/1.0/downloads.php?slug=wordpress-seo

// static list of plugins we want to get some data about from API
const somePlugins = [
  'wordpress-seo',
  'statically',
  'autoptimize',
];

// dummmy promise to test we know how to chain things up
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('foo');
  }, 300);
});

// out Mocha tests
describe('Test asynchronous code', () => {
  it('should return another output', async () =>{

    // do a bunch of stuff, leading to the value/condition we want to assert on
    return expect(myPromise).to.eventually.equal("fooss");

  });
});
