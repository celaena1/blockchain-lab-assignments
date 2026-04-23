# Blockchain Lab Assignments

This repository is structured according to the blockchain lab submission guidelines and contains separate folders for each blockchain lab assignment.

## Student Details

- Student Name: `[Your Name]`
- Roll Number: `[Your Roll Number]`
- Course Name: `Blockchain Lab`

## Repository Structure

```text
blockchain-lab-assignments/
|-- README.md
|-- assignment-1/
|-- assignment-2/
|-- assignment-3/
|-- assignment-4/
`-- assignment-5/
```

## Assignment Overview

### Assignment 1: Smart Contract Development
- Solidity `Storage` contract for storing and retrieving a number
- Contract explanation and deployment steps
- Compilation and deployment screenshots

### Assignment 2: Polygon Deployment
- `Storage` contract prepared for Polygon deployment
- Hardhat deployment script
- Polygon Amoy deployment steps, network details, and contract address section
- Deployment and explorer screenshots

### Assignment 3: Web Interface + MetaMask
- Frontend code for MetaMask wallet connection
- Purchase intent signing and transaction submission flow
- Screenshots showing MetaMask connection and transaction execution

### Assignment 4: IPFS Integration
- IPFS upload script using Pinata API
- Smart contract for storing the latest CID
- CID examples and usage notes
- Screenshots for upload success and event/transaction reference

### Assignment 5: DAO Smart Contract
- Simple DAO smart contract
- Proposal creation, voting, and execution workflow
- Screenshots for proposal creation, voting, and execution

## Tech Stack

- Solidity
- Hardhat
- MetaMask
- Polygon Amoy testnet
- Ethers.js
- Pinata API and IPFS gateway
- HTML, CSS, and JavaScript

## How To Run

### Assignment 1
1. Open the `assignment-1` folder.
2. Compile `contract.sol` using Remix IDE or Hardhat.
3. Deploy locally or on a test network.
4. Save screenshots in `assignment-1/screenshots/`.

### Assignment 2
1. Open the `assignment-2` folder.
2. Configure Polygon Amoy testnet details in Hardhat.
3. Run `npx hardhat run assignment-2/deploy.js --network amoy`.
4. Save the deployment transaction and explorer screenshots in `assignment-2/screenshots/`.

### Assignment 3
1. Open the `assignment-3` folder.
2. Open `index.html` in a browser or serve the folder locally.
3. Connect MetaMask.
4. Connect MetaMask and test a transaction.
5. Save screenshots in `assignment-3/screenshots/`.

### Assignment 4
1. Open the `assignment-4` folder.
2. Set the `PINATA_JWT` environment variable.
3. Run `node ipfs-example.js <file-path>`.
4. Save screenshots in `assignment-4/screenshots/`.

### Assignment 5
1. Open the `assignment-5` folder.
2. Compile and deploy the DAO contract.
3. Create a proposal, vote, and execute the result.
4. Save screenshots in `assignment-5/screenshots/`.

## Submission Checklist

- [ ] Student name and roll number updated
- [ ] Course name updated if needed
- [ ] Each assignment folder contains the final code files
- [ ] Each assignment README reflects the actual implementation
- [ ] All required screenshots are added and readable
- [ ] Contract address added in Assignment 2
- [ ] CID examples added in Assignment 4
- [ ] Repository is public before submission
- [ ] Commit messages are meaningful
