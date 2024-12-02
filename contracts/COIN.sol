// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";


contract COIN is ERC20 {
   
    constructor(string memory name, string memory symbol) ERC20(name, symbol)  {
        console.log("Deloying COIN", msg.sender);
    }

    function approve(address spender, uint256 amount) public override returns (bool) {
        console.log("Approve" , msg.sender, spender, amount);
        return super.approve(spender, amount);
    }

    function transferFrom(address sender, address recipient, uint256 amount) public override returns (bool) {
        console.log("TransferFrom" ,sender, recipient, amount);
        return super.transferFrom(sender, recipient, amount);
    }

    function mint(address to, uint256 initial) public {
        console.log("mint", to, initial);
        _mint(to,initial);
    }
 
}
