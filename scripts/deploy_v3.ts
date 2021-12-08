// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, upgrades } from "hardhat";

async function main() {
  const AvgPriceV3 = await ethers.getContractFactory('AvgPriceV3');
  console.log('Upgrading AvgPrice to Version 3 ...');
  const avgPrice = await upgrades.upgradeProxy(
    '0x8e54130B70541A114351e1D4977Ed0b491E8E99D',
    AvgPriceV3,
  );
  await avgPrice.deployed();
  console.log('AvgPrice upgraded to Version 3.0');  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
