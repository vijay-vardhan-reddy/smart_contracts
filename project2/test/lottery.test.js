const assert = require("assert");
const ganache = require("ganache-cli");
const { it } = require("node:test");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require("../compile");

let lottery_instance;
let ats;

beforeEach(async () => {
  ts = await web3.eth.getAccounts();

  lottery_instance = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: ts[0], gas: "1000000" });
});
describe("Lottery Contract", () => {
  it("here it goes", () => {
    assert.ok(lottery_instance.options.address);
  });
  
});