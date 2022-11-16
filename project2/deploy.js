const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'REPLACE_WITH_YOUR_MNEMONIC',
  // remember to change this to your own phrase!
  'https://rinkeby.infura.io/v3/15c1d32581894b88a92d8d9e519e476c'
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const ts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', ts[0]);

  const ans = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: '1000000', from: ts[0] });

  console.log('Contract deployed to', ans.options.address);
  provider.engine.stop();
};
deploy();
