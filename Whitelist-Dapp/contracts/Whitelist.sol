//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

contract Whitelist {
    uint8 public maxWhitelistedAddresses;

    mapping(address => bool) public whitelistedAddresses;
    uint8 public numOfWhitelistedAddresses;

    constructor(uint8 _maxWhitelistedAddresses) {
        maxWhitelistedAddresses = _maxWhitelistedAddresses;
    }

    function addAddressToWhitelist() public {
        require(
            !whitelistedAddresses[msg.sender],
            "Sender already whitelisted"
        );
        require(
            numOfWhitelistedAddresses <= maxWhitelistedAddresses,
            "Limit reached. More addresses cannot be whitelisted"
        );
        whitelistedAddresses[msg.sender] = true;
        numOfWhitelistedAddresses += 1;
    }
}
