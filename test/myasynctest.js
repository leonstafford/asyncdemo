const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const superagent = require('superagent');

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
const getPluginDownloads = async (name) => {
  const path = `sites/${name}`;
  const host = 'http://api.wordpress.org';
  const response = await makeApiCall(host, path);
  return JSON.parse(response.text);
};

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
  it('should return another output', async () => {
    // do a bunch of stuff, leading to the value/condition we want to assert on
    expect(myPromise).to.eventually.equal('foo');
  });
});
