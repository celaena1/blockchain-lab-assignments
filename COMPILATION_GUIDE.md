# Compilation & Execution Guide for Blockchain Lab Assignments

## Prerequisites Installation

### 1. Node.js and npm
Download from: https://nodejs.org/ (v16 or higher recommended)

**Verify installation:**
```bash
node --version
npm --version
```

### 2. MetaMask Browser Extension
- Chrome: https://chrome.google.com/webstore
- Firefox: https://addons.mozilla.org/en-US/firefox/
- Search for "MetaMask" and install

---

## Project Setup

### Initial Setup (Do this once)

1. Navigate to the project directory:
```bash
cd c:\Users\SONPARI\Desktop\blockchain-lab-assignments
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from the `.env.example` template:
```bash
copy .env.example .env
```

**Edit the `.env` file with your credentials** (see credentials section below).

---

## Assignment-Specific Compilation & Execution Steps

### **Assignment 1: Smart Contract Development (Remix IDE)**

**Objective:** Compile and test a basic Storage contract

**Steps:**

1. Open Remix IDE: https://remix.ethereum.org/

2. Create a new file named `Storage.sol`

3. Copy the contract from [assignment-1/contract.sol](assignment-1/contract.sol) into Remix

4. **Compile:**
   - Click on the **Solidity Compiler** icon (left sidebar)
   - Select compiler version: `0.8.20` or compatible
   - Click **Compile Storage.sol**
   - Verify no errors appear ✓

5. **Deploy & Test:**
   - Click on the **Deploy & Run Transactions** icon
   - Environment: Select `JavaScript VM (Berlin)` or `Injected Provider (MetaMask)`
   - Click **Deploy**
   - In the deployed contract section:
     - Call `store(42)` - stores the number 42
     - Call `retrieve()` - should return 42 ✓

6. **Take screenshots:**
   - Successful compilation screenshot
   - Contract deployment screenshot
   - Save to `assignment-1/screenshots/`

---

### **Assignment 2: Polygon Deployment (Hardhat)**

**Objective:** Deploy Storage contract to Polygon Amoy testnet

**Prerequisites:**
- Polygon wallet with testnet POL tokens
- Private key from wallet

**Steps:**

1. **Setup wallet and get testnet funds:**
   - Create/import wallet in MetaMask
   - Switch to **Polygon Amoy** network:
     - RPC URL: `https://rpc-amoy.polygon.technology`
     - Chain ID: `80002`
     - Currency: `POL`
   - Get testnet POL from faucet: https://faucet.polygon.technology/

2. **Configure environment:**
   - Edit `.env` file:
     ```
     PRIVATE_KEY=your_wallet_private_key_without_0x
     AMOY_RPC_URL=https://rpc-amoy.polygon.technology
     ```

3. **Compile contracts:**
   ```bash
   npm run compile
   ```
   - Check `artifacts/` folder is created with compiled contracts

4. **Deploy to Amoy testnet:**
   ```bash
   npm run deploy:amoy
   ```
   - Success output:
     ```
     ✅ Storage contract deployed successfully!
     Contract Address: 0x...
     Explorer Link: https://amoy.polygonscan.com/address/0x...
     ```

5. **Verify on Explorer:**
   - Copy the contract address
   - Visit: https://amoy.polygonscan.com/address/{contract-address}
   - Verify the contract is displayed
   - Take a screenshot

6. **Update README:**
   - Edit [assignment-2/README.md](assignment-2/README.md)
   - Paste the contract address in the designated section
   - Paste the explorer link

---

### **Assignment 3: Web Interface + MetaMask**

**Objective:** Build a frontend that connects to MetaMask

**Setup:**

1. Start a local server:
   - **Option A (Python 3):**
     ```bash
     cd assignment-3
     python -m http.server 8000
     ```
   - **Option B (Node.js):**
     ```bash
     cd assignment-3
     npx http-server
     ```

2. **Test the interface:**
   - Open: http://localhost:8000
   - Click **Connect MetaMask**
   - Approve connection in MetaMask popup
   - Verify wallet address is displayed ✓

3. **Fill and submit form:**
   - Enter product details (Name, ID, Quantity, Price, etc.)
   - Click **Sign Purchase Intent**
   - Approve signing in MetaMask
   - Click **Send Transaction**
   - Approve transaction in MetaMask
   - Wait for confirmation

4. **Take screenshots:**
   - MetaMask connected state
   - Transaction confirmation
   - Save to `assignment-3/screenshots/`

---

### **Assignment 4: IPFS Integration**

**Objective:** Upload files to IPFS and store CID on-chain

**Prerequisites:**
- Pinata account: https://www.pinata.cloud/
- Pinata API JWT token

**Getting Pinata Credentials:**

1. Sign up at https://www.pinata.cloud/
2. Go to **API Keys** section
3. Create a new API key
4. Copy the **JWT token**
5. Add to `.env`:
   ```
   PINATA_JWT=your_pinata_jwt_token
   ```

**Steps:**

1. **Compile IPFS contract:**
   ```bash
   npm run compile
   ```

2. **Upload a file to IPFS:**
   ```bash
   npm run ipfs:upload assignment-4/sample.txt
   ```
   - Output example:
     ```
     Upload successful.
     CID: QmXxxx...
     Gateway URL: https://gateway.pinata.cloud/ipfs/QmXxxx...
     ```

3. **Store CID on-chain:**
   - Use Remix IDE or Hardhat script
   - Call `storeCID("QmXxxx...")` in IPFSStorage contract
   - Take screenshot of transaction link

4. **Verify file retrieval:**
   - Open gateway URL in browser
   - Confirm file is accessible

5. **Document in README:**
   - Edit [assignment-4/README.md](assignment-4/README.md)
   - Add your CIDs and gateway links

---

### **Assignment 5: DAO Smart Contract**

**Objective:** Deploy and test DAO contract

**Steps:**

1. **Compile DAO contract:**
   ```bash
   npm run compile
   ```
   - Verify no errors ✓

2. **Deploy to testnet:**
   - Option A (Hardhat):
     ```bash
     npx hardhat run scripts/deploy-dao.js --network amoy
     ```
   - Option B (Remix IDE):
     - Copy [assignment-5/dao.sol](assignment-5/dao.sol) to Remix
     - Deploy to Amoy network via Injected Provider

3. **Test DAO functions:**
   - **Add members:**
     ```solidity
     addMember(0x...)
     ```
   
   - **Create proposal:**
     ```solidity
     createProposal("Proposal Description", 3600)
     // Duration: 3600 seconds (1 hour)
     ```
   
   - **Vote on proposal:**
     ```solidity
     vote(1)  // proposalId = 1
     ```
   
   - **Execute proposal:**
     ```solidity
     executeProposal(1)  // After deadline
     ```

4. **Take screenshots:**
   - Proposal creation transaction
   - Voting transaction
   - Execution transaction
   - Save to `assignment-5/screenshots/`

---

## Credentials Reference Table

| Assignment | Service | Credential | Get From | Where to Add |
|-----------|---------|-----------|----------|--------------|
| 1 | Remix IDE | None | - | N/A |
| 2 | Polygon | Private Key | MetaMask | `.env` PRIVATE_KEY |
| 3 | MetaMask | None | Install Extension | Browser |
| 4 | Pinata | JWT Token | https://pinata.cloud/apikeys | `.env` PINATA_JWT |
| 5 | Polygon | Private Key | MetaMask | `.env` PRIVATE_KEY |

---

## Troubleshooting

### Compilation Errors
- Check Solidity version in `hardhat.config.js`
- Ensure all imports are correct
- Clean and rebuild: `npm run compile`

### Deployment Fails
- Verify `.env` file has correct PRIVATE_KEY
- Check testnet has enough POL for gas fees
- Verify RPC URL is accessible

### MetaMask Issues
- Clear browser cache
- Reinstall MetaMask extension
- Ensure correct network is selected (Amoy for testnet)

### IPFS Upload Fails
- Verify PINATA_JWT token is valid
- Check token has upload permissions
- Ensure file path is correct

---

## Quick Command Reference

```bash
# Installation
npm install

# Compilation
npm run compile

# Deployment
npm run deploy:amoy

# IPFS Upload
npm run ipfs:upload <file-path>

# Testing
npm test
```

---

## Important Security Notes

⚠️ **NEVER:**
- Commit `.env` file with real private keys
- Share your private keys
- Use mainnet wallets for testing
- Post API tokens in public repositories

✅ **ALWAYS:**
- Use testnet wallets only
- Keep `.env` in `.gitignore`
- Use environment variables for sensitive data
- Test on testnet before mainnet
