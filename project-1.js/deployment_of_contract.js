const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile");

let ts;
let contract_instance;

beforeEach(async () => {
  // Get a list of all accounts
  ts = await web3.eth.getAccounts();
  contract_instance = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["Hi from github"],
    })
    .send({ from: ts[0], gas: "1000" });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    console.log(contract_instance);
  });
});