// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, upgrades } from "hardhat";

async function main() {
  const DateTime = await ethers.getContractFactory('DateTime');
  console.log('Deploying DateTime');
  const dateTime = await DateTime.deploy();
  await dateTime.deployed();
  console.log('DateTime deployed to:', dateTime.address);
  // HardHat : 0x5FbDB2315678afecb367f032d93F642f64180aa3
  // Ganache : 0x01dA278412c40e7D984F48cF3e998a69E044F88a
  
  
  const AvgPrice = await ethers.getContractFactory('AvgPrice');
  console.log('Deploying AvgPrice...');
  const avgPrice = await upgrades.deployProxy(AvgPrice,['0x01dA278412c40e7D984F48cF3e998a69E044F88a'], { initializer: 'initialize'})
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
