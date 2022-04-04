//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

contract Whitelist {
    uint8 public maxWhitelistedAddresses;

    mapping(address => bool) public whitelistedAddresses;
    uint8 public numAddressesWhitelisted;
    address[] public allAddresses;

    constructor(uint8 _maxWhitelistedAddresses) {
        maxWhitelistedAddresses = _maxWhitelistedAddresses;
    }

    function addAddressToWhitelist() public {
        require(
            !whitelistedAddresses[msg.sender],
            "Sender already whitelisted"
        );
        require(
            numAddressesWhitelisted <= maxWhitelistedAddresses,
            "Limit reached. More addresses cannot be whitelisted"
        );
        whitelistedAddresses[msg.sender] = true;
        allAddresses.push(msg.sender);
        numAddressesWhitelisted += 1;
    }

    function getCurrentUserAddress() public view returns (address) {
        return msg.sender;
    }

    function getAllAddresses() public returns (uint256[] memory) {
        return allAddresses;
    }
}
