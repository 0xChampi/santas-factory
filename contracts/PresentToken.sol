// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract PresentToken is ERC20 {
    address masterChef;

    // Errors
    error TokenUnauthorizedAccount(address account);

    // Initialize the token
    constructor() ERC20("PRESENTS", "PRESENTS") {
        // Master chef is set to deployer on deployment
        masterChef = msg.sender;
    }

    modifier onlyMasterChef() {
        if (msg.sender != masterChef) {
            revert TokenUnauthorizedAccount(msg.sender);
        }
        _;
    }

    function mint(address _to, uint256 _amount) public onlyMasterChef {
        _mint(_to, _amount);
    }

    // Changes MasterChef. Can only be called by current MasterChef
    function setMasterChef(address _masterChef) public onlyMasterChef {
        masterChef = _masterChef;
    }

    function getMasterChef() public view returns (address) {
        return masterChef;
    }
}
