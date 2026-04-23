# Assignment 1: Smart Contract Development

## Objective

Develop and test a basic Solidity smart contract that stores and retrieves data on-chain.

## Required Files

- `contract.sol`: Main smart contract file
- `README.md`: This documentation file
- `screenshots/`: Compilation and deployment screenshots

## Contract Purpose

This assignment uses a simple `Storage` contract. It demonstrates how to:

- declare a state variable
- update the state using a public function
- read the stored value using a view function

## Functions and Logic

- `store(uint256 num)`: saves the given number in the contract state
- `retrieve()`: returns the number currently stored in the contract

## Compilation and Deployment Steps

1. Open `contract.sol` in Remix IDE.
2. Compile the contract using Solidity compiler version `0.8.x`.
3. Deploy the contract using the JavaScript VM or an injected provider.
4. Test the `store()` function with a sample number.
5. Call `retrieve()` to verify that the value is stored correctly.

## Screenshots Required

- Successful compilation
- Contract deployment

Place the images in the `screenshots/` folder.
