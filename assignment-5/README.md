# Assignment 5: DAO Smart Contract

## Objective

Implement a simple DAO smart contract where members can create proposals, vote on them, and the admin can execute the result after the deadline.

## Required Files

- DAO smart contract source
- `README.md`: This documentation file
- `screenshots/`: Proposal creation, voting, and execution screenshots

## Voting Mechanism

Only registered DAO members can vote. Each member can vote once per proposal. Every valid vote increments the proposal's `voteCount` by one.

## Proposal Creation

Any registered member can create a proposal by providing:

- a text description
- a voting duration in seconds

Each proposal stores an id, description, vote count, deadline, and execution status.

## Workflow Of DAO

1. Deployment
2. Admin adds members to the DAO
3. A member creates a proposal
4. DAO members vote before the deadline
5. Admin executes the proposal after voting ends

## Screenshots Required

- Proposal creation
- Voting process
- Execution result

Place the images in the `screenshots/` folder.
