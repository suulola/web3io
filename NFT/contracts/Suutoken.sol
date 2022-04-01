//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

interface MinimalERC20 {
    function balanceOf(address account) external view returns (uint256);
}

contract Suutoken is ERC20 {
    MinimalERC20 suutoken;

    constructor(uint256 initialSupply) ERC20("Suutoken", "SUU") {
        suutoken = _mint(msg.sender, initialSupply);
    }

    function getBalance() public view returns (unint256) {
        return suutoken.balanceOf(msg.sender);
    }
}
