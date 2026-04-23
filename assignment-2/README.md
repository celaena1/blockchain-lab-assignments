# Assignment 2: Polygon Deployment

## Objective

Deploy the `Storage` smart contract to Polygon testnet using a deployment script.

## Required Files

- `contract.sol`: Smart contract source
- `deploy.js`: Deployment script
- `README.md`: This documentation file
- `screenshots/`: Deployment and explorer screenshots

## Deployment Steps

1. Save the `Storage` contract in the project contracts folder.
2. Configure the Polygon testnet network in Hardhat using an RPC URL and private key.
3. Add testnet funds to the deployment wallet.
4. Run the deployment script with:

```bash
npx hardhat run assignment-2/deploy.js --network amoy
```

5. Copy the deployed contract address and save the explorer link.

## Network Details Used

- Network Name: `Polygon Amoy Testnet`
- RPC URL: `[Add the RPC URL you used]`
- Chain ID: `80002`
- Currency Symbol: `POL`
- Explorer URL: `https://amoy.polygonscan.com`

## Contract Address

`[Paste your deployed contract address here]`

## Screenshots Required

- Deployment success
- Transaction or contract page on explorer

Place the images in the `screenshots/` folder.
