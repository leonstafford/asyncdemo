const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const superagent = require('superagent');

chai.use(chaiAsPromised);

const { expect } = chai;

const makeApiCall = async (host, path, method = 'GET', params) => {
  const url = `${host}/${path}`;
  const request = superagent(method, url).redirects(0).timeout(30 * 1000);
  let response;
  if (params) {
    response = await request.send(params);
  } else {
    response = await request;
  }
  return response;
};

// I took out the try/catch from original reference code
// the error we were trying to catch should trigger in this
// promise's error state (my hunch, not verified)
const getPluginDownloads = async (pluginName) => {
  const path = `stats/plugin/1.0/downloads.php?slug=/${pluginName}`;
  const host = 'http://api.wordpress.org';
  const response = await makeApiCall(host, path);
  return JSON.parse(response.text);
};

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
    console.log('output from myPromise');
    resolve('foo');
    // by adjusting this timeout duration, we can see this promise
    // outputting to console before/after typical wp.org API response
    // time for fetching the downloads data
  }, 3000);
});

// out Mocha tests
describe('Test asynchronous code', () => {
  it('should return another output', async () => {
    // let's try doing a top level promise stuff here, then some more promises within it!
    getPluginDownloads('autoptimize').then((response) => {
      console.log(response);
      expect(myPromise).to.eventually.equal('foo');
    });

    // do a bunch of stuff, leading to the value/condition we want to assert on
    // expect(myPromise).to.eventually.equal('foo');
  });
});
