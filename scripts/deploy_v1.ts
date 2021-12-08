// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, upgrades } from "hardhat";

async function main() {
  const AvgPrice = await ethers.getContractFactory('AvgPrice');
  console.log('Deploying AvgPrice...');
  const avgPrice = await upgrades.deployProxy(AvgPrice,[], { initializer: 'initialize'})
  await avgPrice.deployed();
  console.log('AvgPrice deployed to:', avgPrice.address);
  // HardHat : 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
  // Ganache : 0x57c1593B240E1e2a43c7BF3e8f9d3Cc79C2d4C89
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
