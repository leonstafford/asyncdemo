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
  const path = `stats/plugin/1.0/downloads.php?slug=/${pluginName}&limit=5`;
  const host = 'http://api.wordpress.org';
  const response = await makeApiCall(host, path);
  return [
    pluginName,
    JSON.parse(response.text),
  ];
};

// TODO: asynchronously fetch data from here for each plugin
// get list of plugin downloads by day at:
// http://api.wordpress.org/stats/plugin/1.0/downloads.php?slug=wordpress-seo

// dummmy promise to test we know how to chain things up
const getListOfPluginNames = new Promise((resolve, reject) => {
  setTimeout(() => {
    // static list of plugins we want to get some data about from API
    resolve([
      'wordpress-seo',
      'statically',
      'autoptimize',
    ]);
    // this will now delay anything happening, as we're waiting on
    // the list of plugins to start off our API querying
  }, 100);
});

// our Mocha tests
describe('Test asynchronous code', () => {
  it('should return another output', async () => {
    // let's try doing a top level promise stuff here, then some more promises within it!
    getListOfPluginNames
      .then((pluginNames) => {
        // return an array of promises by iterating each plugin name
        // and making our async API request, which returns promise
        return Promise.all(
          pluginNames.map((pluginName) => getPluginDownloads(pluginName)),
        );
      }).then((results) => {
        // destructure our resolved array for each API response promise
        // we passed the pluginName along so we could use that again here
        console.log('Download data by plugins:');
        results.forEach(([pluginName, downloadData]) => {
          console.log('');
          console.log(`${pluginName}:`);
          console.log('');

          // iterate each date's download data (object returned from WP API)
          Object.entries(downloadData).forEach(([day, downloads]) => {
            console.log(`On ${day}, there were ${downloads} downloads.`);
          });
        });

        console.log('');
      }).catch((error) => {
        console.log(error);
      });

    // expect(myPromise).to.eventually.equal('foo');

    // do a bunch of stuff, leading to the value/condition we want to assert on
    // expect(myPromise).to.eventually.equal('foo');
  });
});
