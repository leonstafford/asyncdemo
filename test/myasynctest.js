const chai = require("chai")
const expect = chai.expect

describe("Test asynchronous code", () => {
  it("should return another output", () => {
      return callToAsyncFunction(input).then(result => {
          //implement result testing logic
          expect(foo).to.be.a('string');
      })
  })
});
