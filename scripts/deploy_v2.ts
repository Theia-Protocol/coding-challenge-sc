// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { Address } from "cluster";
import { ethers, upgrades } from "hardhat";

async function main() {
  const AvgPriceV2 = await ethers.getContractFactory('AvgPriceV2');
  console.log('Upgrading AvgPrice to Version2...');
  const avgPrice = await upgrades.upgradeProxy(
    '0x57c1593B240E1e2a43c7BF3e8f9d3Cc79C2d4C89',
    AvgPriceV2
  );
  await avgPrice.deployed();
  console.log('AvgPrice upgraded to Version2.0');  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
