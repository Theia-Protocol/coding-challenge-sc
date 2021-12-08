import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

// newly added
import "@openzeppelin/hardhat-upgrades";
import "@nomiclabs/hardhat-ethers"

const { privateKey, mnemonic } = require('./secret.json')

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    localhost: {
      url: "http://127.0.0.1:7545",
      accounts: 
      { mnemonic: mnemonic}        
    },
    rinkeby: {
      url: 'https://rinkeby.infura.io/v3/528e4136b860485394a6344853b8d477',     
      accounts: 
        privateKey !== undefined ? [privateKey] : []
    },
    kovan: {
      url: 'https://kovan.infura.io/v3/528e4136b860485394a6344853b8d477',
      accounts: 
        privateKey !== undefined ? [privateKey] : []
    },
    mainnet: {
      url: 'https://mainnet.infura.io/v3/528e4136b860485394a6344853b8d477',
      accounts:
        privateKey !== undefined ? [privateKey] : []
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
