const hre = require("hardhat");

async function main() {
  console.log("Starting deployment...");

  // Get the contract factory
  const Storage = await hre.ethers.getContractFactory("Storage");
  
  // Deploy the contract
  console.log("Deploying Storage contract to Polygon Amoy...");
  const storage = await Storage.deploy();

  // Wait for deployment to finish
  await storage.waitForDeployment();

  const deployedAddress = await storage.getAddress();
  console.log("\n✅ Storage contract deployed successfully!");
  console.log(`Contract Address: ${deployedAddress}`);
  console.log(`Explorer Link: https://amoy.polygonscan.com/address/${deployedAddress}`);
  
  // Test the contract
  console.log("\n📝 Testing contract functions...");
  
  // Store a value
  const tx = await storage.store(42);
  await tx.wait();
  console.log("✓ Stored value: 42");
  
  // Retrieve the value
  const value = await storage.retrieve();
  console.log(`✓ Retrieved value: ${value.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
