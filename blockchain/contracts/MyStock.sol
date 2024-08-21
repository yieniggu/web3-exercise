// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyStock is ERC20, ERC20Permit, Ownable {
    constructor(address initialOwner, address seller)
        ERC20("MyStock", "MSTK")
        ERC20Permit("MyStock")
        Ownable(initialOwner)
    {
        _mint(seller, 5000 * 10 ** decimals());
    }
}