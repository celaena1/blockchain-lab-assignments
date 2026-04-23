// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title IPFSStorage
 * @dev Stores the latest IPFS CID on-chain.
 */
contract IPFSStorage {
    string public cid;

    function storeCID(string memory _cid) public {
        cid = _cid;
    }
}
