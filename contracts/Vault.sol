// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol"; // Add this line
import {ERC4626} from "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";

import "./MasterChef.sol";
import "./YieldStrategy.sol";

/// @dev ERC4626 vault with entry/exit fees expressed in https://en.wikipedia.org/wiki/Basis_point[basis point (bp)].
contract Vault is ERC4626, Ownable {
    using Math for uint256;

    MasterChef masterChef;
    YieldStrategy strategy;

    // Strategy timelock
    address public newStrategy;
    uint256 public strategyChangeInitiated;
    uint256 public constant STRATEGY_CHANGE_DELAY = 1 days;

    event StrategyChangeInitiated(address indexed newStrategy, uint256 at);
    event StrategyChanged(address indexed newStrategy);

    // Constructor
    constructor(
        IERC20 asset,
        MasterChef _masterChef,
        YieldStrategy _strategy
    ) ERC20("COOKIES", "COOKIES") ERC4626(asset) Ownable(msg.sender) {
        masterChef = _masterChef;
        strategy = _strategy;
    }

    // Public functions
    function depositAssets(address receiver, uint256 assets) public {
        uint256 shares = previewDeposit(assets);
        _deposit(msg.sender, receiver, assets, shares);
        
        // TODO: ... strategy deposit
        strategy.deposit();
    }

    function withdrawAssets(address receiver, uint256 assets) public {
        uint256 shares = previewWithdraw(assets);
        _withdraw(msg.sender, receiver, msg.sender, assets, shares);

        // Deposit into strategy
        strategy.withdraw();
    }

    // Strategy change with time lock
    function proposeStrategy(address _newStrategy) public onlyOwner {
        require(_newStrategy != address(0), "Invalid strategy address");
        newStrategy = _newStrategy;
        strategyChangeInitiated = block.timestamp;

        emit StrategyChangeInitiated(newStrategy, strategyChangeInitiated);
    }

    function executeStrategyChange() public onlyOwner {
        require(newStrategy != address(0), "No strategy change initiated");
        require(block.timestamp >= strategyChangeInitiated + STRATEGY_CHANGE_DELAY, "Strategy change delay has not passed");

        // Change strategy
        strategy = YieldStrategy(newStrategy);
        // Change 
        newStrategy = address(0);

        emit StrategyChanged(address(strategy));
    }
}
