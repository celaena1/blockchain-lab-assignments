const hre = require("hardhat");

async function main() {
  console.log("Starting DAO deployment...");

  // Get the contract factory
  const SimpleDAO = await hre.ethers.getContractFactory("SimpleDAO");
  
  // Deploy the contract
  console.log("Deploying SimpleDAO contract to Polygon Amoy...");
  const dao = await SimpleDAO.deploy();

  // Wait for deployment to finish
  await dao.waitForDeployment();

  const deployedAddress = await dao.getAddress();
  console.log("\n✅ SimpleDAO contract deployed successfully!");
  console.log(`Contract Address: ${deployedAddress}`);
  console.log(`Explorer Link: https://amoy.polygonscan.com/address/${deployedAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
