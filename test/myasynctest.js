const chai = require('chai');

const { expect } = chai;

// get list of plugin downloads by day at:
// http://api.wordpress.org/stats/plugin/1.0/downloads.php?slug=wordpress-seo

const somePlugins = [
  'wordpress-seo',
  'statically',
  'autoptimize',
];

const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('foo');
  }, 300);
});

describe('Test asynchronous code', () => {
  it('should return another output', () => callToAsyncFunction(input).then((result) => {
    // implement result testing logic
    expect(foo).to.be.a('string');
  }));
});
