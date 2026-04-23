// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title IPFSStorage
 * @dev Stores the latest IPFS CID on-chain.
 */
contract IPFSStorage {
    string public cid;
    address public owner;

    event CIDStored(string indexed _cid);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function storeCID(string memory _cid) public onlyOwner {
        require(bytes(_cid).length > 0, "CID cannot be empty");
        cid = _cid;
        emit CIDStored(_cid);
    }

    function getCID() public view returns (string memory) {
        return cid;
    }
}
