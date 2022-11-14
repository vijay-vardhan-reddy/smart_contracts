const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile");

let ts;
let contract_instance;
let argument_to_pass='Heyyy';
let updated='hiiii';

beforeEach(async () => {
  // Get a list of all accounts
  ts = await web3.eth.getAccounts();
  contract_instance = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: [argument_to_pass],
    })
    .send({ from: ts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploy test", () => {
    assert.ok(contract_instance.options.address);
  });
  it("initialization_test",async ()=>{
    const test_assign= await contract_instance.methods.message().call();
    assert.equal(test_assign,argument_to_pass);

  });
  it("updating the message",async ()=>{
    await contract_instance.methods.setMessage(updated).send({from: ts[0]});
    const test_again= await contract_instance.methods.message().call();
    assert.ok(test_again,updated);
  });
  
});