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
  it("tests the entry", async ()=>{
    await lottery_instance.methods.enter().send({
        from:ts[0],
        value:web3.utill.toWei('0.02','ether')
    });
    const players_array= await lottery_instance.methods.getPlayer().call({
        from: ts[0]
    });
    assert.equal(ts[0],players_array[0]);
    assert.equal(1,players_array.length);

  });
  it("tests multiple entry", async ()=>{
    await lottery_instance.methods.enter().send({
        from:ts[0],
        value:web3.utill.toWei('0.02','ether')
    });
    await lottery_instance.methods.enter().send({
        from:ts[1],
        value:web3.utill.toWei('0.02','ether')
    });
    await lottery_instance.methods.enter().send({
        from:ts[2],
        value:web3.utill.toWei('0.02','ether')
    });
    const players_array= await lottery_instance.methods.getPlayer().call({
        from: ts[0]
    });
    assert.equal(ts[0],players_array[0]);
    assert.equal(ts[1],players_array[1]);
    assert.equal(ts[2],players_array[2]);
    assert.equal(3,players_array.length);

  });
});