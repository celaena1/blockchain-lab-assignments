# Assignment 4: IPFS Integration

## Objective

Upload files to IPFS, store the returned CID on-chain, and retrieve the file later using the CID.

## Required Files

- `contract.sol`: Stores the IPFS CID on-chain
- IPFS upload/retrieval code
- IPFS hash examples
- `README.md`: This documentation file
- `screenshots/`: Upload success and event/transaction screenshots

## IPFS Service/Library Used

This example uses:

- Pinata API for file pinning
- IPFS gateway access for retrieval
- Solidity contract storage for saving the CID on-chain

## How Files Are Stored And Retrieved

Explain:

- A file is read locally and uploaded to Pinata using the `pinFileToIPFS` API.
- Pinata returns an `IpfsHash`, which becomes the file CID.
- The CID can be saved in the `IPFSStorage` contract using `storeCID`.
- The file can later be accessed with an IPFS gateway URL using the same CID.

## IPFS Hash Examples

- CID 1: `[Add your uploaded CID here]`
- CID 2: `[Add another CID if available]`

## Screenshots Required

- File upload success with CID link
- Transaction link or event page reference

Place the images in the `screenshots/` folder.
