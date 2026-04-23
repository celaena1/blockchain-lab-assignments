## Project Setup Instructions

Run the following commands in the project root directory:

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Environment File
```bash
cp .env.example .env
```

Then edit `.env` and fill in:
- `PRIVATE_KEY`: Your testnet wallet private key
- `PINATA_JWT`: Your Pinata API JWT token
- `AMOY_RPC_URL`: (Optional, defaults provided)
- `SEPOLIA_RPC_URL`: (Optional, for Ethereum testnet)

### 3. Compile All Contracts
```bash
npm run compile
```

Compiled contracts will be in the `artifacts/` folder.

---

## Individual Assignment Setup

See [COMPILATION_GUIDE.md](COMPILATION_GUIDE.md) for:
- ✅ Step-by-step compilation instructions for each assignment
- ✅ Where to get credentials
- ✅ How to deploy to testnets
- ✅ Testing procedures
- ✅ Troubleshooting tips
