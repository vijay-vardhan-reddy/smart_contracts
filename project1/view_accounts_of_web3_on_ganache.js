const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
let ts;

beforeEach(async () => {
  // Get a list of all accounts
ts=  await web3.eth.getAccounts()
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    console.log(ts);
  });
}); 