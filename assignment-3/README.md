# Assignment 3: Web Interface + MetaMask

## Objective

Build a frontend interface that connects to MetaMask, signs a purchase message, and submits a blockchain transaction.

## Required Files

- Frontend source code
- Blockchain interaction logic
- `README.md`: This documentation file
- `screenshots/`: Wallet connection and transaction screenshots

## How The Frontend Connects To The Blockchain

The frontend uses `window.ethereum` as the injected provider from MetaMask. It communicates with the wallet using:

- `eth_requestAccounts` to connect the wallet
- `eth_accounts` and `eth_chainId` to read wallet state
- `personal_sign` to sign a purchase intent message
- `eth_sendTransaction` to send a transaction with encoded product metadata

## How MetaMask Is Used

MetaMask is used to:

- request wallet access from the browser
- show the active account and network
- ask the user to sign an off-chain purchase intent
- confirm and broadcast the final payment transaction

## Run Steps

1. Open the `assignment-3` folder.
2. Start a local static server or open `index.html` directly in a browser.
3. Make sure MetaMask is installed in the browser.
4. Connect the wallet using the `Connect MetaMask` button.
5. Fill in the form, sign the purchase intent, and send the transaction.

## Screenshots Required

- Wallet connection
- Transaction execution

Place the images in the `screenshots/` folder.
