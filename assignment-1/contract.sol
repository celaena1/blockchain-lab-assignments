// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

/**
 * @title Storage
 * @dev Stores and retrieves a single unsigned integer.
 */
contract Storage {
    uint256 private number;

    /**
     * @dev Stores a new value in the contract state.
     * @param num Value to store.
     */
    function store(uint256 num) public {
        number = num;
    }

    /**
     * @dev Returns the currently stored value.
     */
    function retrieve() public view returns (uint256) {
        return number;
    }
}
