// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "./PresentToken.sol";
import "hardhat/console.sol";

// MasterChef is the master of HW. He can make Presents and he is a fair guy.
//
// Note that it's ownable and the owner wields tremendous power. The ownership
// will be transferred to a governance smart contract once HW is sufficiently
// distributed and the community can show to govern itself.
//
// Have fun reading it. Hopefully it's bug-free. God bless.
contract MasterChef is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // Info of each user.
    struct UserInfo {
        uint256 amount; // How many LP tokens the user has provided.
        uint256 rewardDebt; // Reward debt. See explanation below.
        //
        // We do some fancy math here. Basically, any point in time, the amount of Presents
        // entitled to a user but is pending to be distributed is:
        //
        //   pending reward = (user.amount * pool.accPRPerShare) - user.rewardDebt
        //
        // Whenever a user deposits or withdraws LP tokens to a pool. Here's what happens:
        //   1. The pool's `accPRPerShare` (and `lastRewardTime`) gets updated.
        //   2. User receives the pending reward sent to his/her address.
        //   3. User's `amount` gets updated.
        //   4. User's `rewardDebt` gets updated.
    }

    // Info of each pool.
    struct PoolInfo {
        IERC20 lpToken; // Address of LP token contract.
        uint256 allocPoint; // How many allocation points assigned to this pool. Presents to distribute per second.
        uint256 lastRewardTime; // Last time stamp that HW distribution occurs.
        uint256 accPRPerShare; // Accumulated Presents per share, times 1e18. See below.
        uint16 depositFeeBP; // Deposit fee in basis points
        uint256 lpSupply; // Total Deposits in each pool
    }

    // The VAULT
    address public vaultAddress;

    // The Presents TOKEN!
    PresentToken public immutable presentToken;
    address public devaddress;
    address public feeAddress;

    // Presents tokens created per second.
    uint256 public rwPerSecond = 0.05 ether;

    // Info of each pool.
    PoolInfo[] public poolInfo;

    // Whether a pool exists or not
    mapping(IERC20 => bool) public poolExistence;

    // Info of each user that stakes LP tokens.
    mapping(uint256 => mapping(address => UserInfo)) public userInfo;

    // Total allocation points. Must be the sum of all allocation points in all pools.
    uint256 public totalAllocPoint = 0;

    // The time when reward mining starts.
    uint256 public startTime;

    // Max supply
    uint256 constant MAX_REWARD_SUPPLY = 100000 ether;

    // Maximum Emission Rate
    uint256 public constant MAX_EMISSION_RATE = 100 ether;

    // Max deposit fee
    uint public constant MAX_DEPOSIT_FEE_BPS = 0;

    event addPool(
        uint256 indexed pid,
        address lpToken,
        uint256 allocPoint,
        uint256 depositFeeBP
    );
    event setPool(
        uint256 indexed pid,
        address lpToken,
        uint256 allocPoint,
        uint256 depositFeeBP
    );
    event Deposit(address indexed user, uint256 indexed pid, uint256 amount);
    event Withdraw(address indexed user, uint256 indexed pid, uint256 amount);
    event ClaimReward(address indexed user, uint256 indexed pid, uint256 amount);
    event EmergencyWithdraw(
        address indexed user,
        uint256 indexed pid,
        uint256 amount
    );
    event SetFeeAddress(address indexed user, address indexed newAddress);
    event SetDevAddress(address indexed user, address indexed newAddress);
    event UpdateEmissionRate(address indexed user, uint256 rwPerSecond);
    event UpdateStartTime(uint256 startTimestamp);
    event UpdatePool(
        uint256 _poolId,
        uint256 lastRewardTime,
        uint256 accPRPerShare,
        uint256 lpSupply
    );

    // Errors
    error DuplicatePool(IERC20 lpToken);
    error VaultUnauthorizedAccount(address account);
    error ZeroAddress();
    error MaxDepositFee(uint256 depositFeeBPS);

    constructor(
        PresentToken _presentToken, // reward token
        address _devaddress,
        uint256 _startTime
    ) Ownable(msg.sender) {
        presentToken = _presentToken;
        startTime = _startTime;
        devaddress = _devaddress;
        feeAddress = msg.sender;
        vaultAddress = msg.sender;
    }

    function poolLength() external view returns (uint256) {
        return poolInfo.length;
    }

    modifier noDuplicatePools(IERC20 _lpToken) {
        if (poolExistence[_lpToken] == true) {
            revert DuplicatePool(_lpToken);
        }
        _;
    }

    modifier onlyVault() {
        if (msg.sender != vaultAddress) {
            revert VaultUnauthorizedAccount(msg.sender);
        }
        _;
    }

    modifier nonZeroAddress() {
        if (msg.sender == address(0)) {
            revert ZeroAddress();
        }
        _;
    }

    modifier enforceMaxDepositFee(uint256 _depositFeeBPS) {
        if (_depositFeeBPS > MAX_DEPOSIT_FEE_BPS) {
            revert MaxDepositFee(_depositFeeBPS);
        }
        _;
    }

    // Add a new lp to the pool. Can only be called by the owner.
    function add(
        uint256 _allocPoint,
        IERC20 _lpToken,
        uint16 _depositFeeBP,
        bool _withUpdate
    )
        external
        onlyOwner
        noDuplicatePools(_lpToken)
        enforceMaxDepositFee(_depositFeeBP)
    {
        if (_withUpdate) {
            massUpdatePools();
        }
        _lpToken.balanceOf(address(this));
        uint256 lastRewardTime = block.timestamp > startTime
            ? block.timestamp
            : startTime;
        totalAllocPoint = totalAllocPoint + _allocPoint;

        poolExistence[_lpToken] = true;
        poolInfo.push(
            PoolInfo({
                lpToken: _lpToken,
                allocPoint: _allocPoint,
                lastRewardTime: lastRewardTime,
                accPRPerShare: 0,
                depositFeeBP: _depositFeeBP,
                lpSupply: 0
            })
        );
        emit addPool(
            poolInfo.length - 1,
            address(_lpToken),
            _allocPoint,
            _depositFeeBP
        );
    }

    // Update the given pool's Presents allocation point and deposit fee. Can only be called by the owner.
    function set(
        uint256 _pid,
        uint256 _allocPoint,
        uint16 _depositFeeBP,
        bool _withUpdate
    ) external onlyOwner {
        require(_depositFeeBP <= 500, "set: invalid deposit fee basis points");
        if (_withUpdate) {
            massUpdatePools();
        }
        totalAllocPoint =
            totalAllocPoint -
            poolInfo[_pid].allocPoint +
            (_allocPoint);
        poolInfo[_pid].allocPoint = _allocPoint;
        poolInfo[_pid].depositFeeBP = _depositFeeBP;

        emit setPool(
            _pid,
            address(poolInfo[_pid].lpToken),
            _allocPoint,
            _depositFeeBP
        );
    }

    // Return reward multiplier over the given _from to _to time.
    function getMultiplier(
        uint256 _from,
        uint256 _to
    ) public pure returns (uint256) {
        return _to - _from;
    }

    // View function to see pending HW on frontend.
    function pendingHW(
        uint256 _pid,
        address _user
    ) external view returns (uint256) {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][_user];
        uint256 accPRPerShare = pool.accPRPerShare;
        if (
            block.timestamp > pool.lastRewardTime &&
            pool.lpSupply != 0 &&
            totalAllocPoint > 0
        ) {
            uint256 multiplier = getMultiplier(
                pool.lastRewardTime,
                block.timestamp
            );
            uint256 hwReward = (multiplier * rwPerSecond * pool.allocPoint) /
                totalAllocPoint;
            uint256 devReward = hwReward / 10;

            uint256 totalRewards = presentToken.totalSupply() + devReward + hwReward;
            if (totalRewards > MAX_REWARD_SUPPLY) {
                hwReward = MAX_REWARD_SUPPLY - presentToken.totalSupply();
            }
            accPRPerShare = accPRPerShare + (hwReward * 1e18) / pool.lpSupply;
        }
        return ((user.amount * accPRPerShare) / 1e18) - user.rewardDebt;
    }

    // Update reward variables for all pools. Be careful of gas spending!
    function massUpdatePools() public {
        uint256 length = poolInfo.length;
        for (uint256 pid = 0; pid < length; ++pid) {
            updatePool(pid);
        }
    }

    // Update reward variables of the given pool to be up-to-date.
    function updatePool(uint256 _pid) public {
        PoolInfo storage pool = poolInfo[_pid];

        // If current time is before the last reward time, no update is needed
        if (block.timestamp <= pool.lastRewardTime) {
            console.log(
                "no update is needed, current time is before the last reward time"
            );
            return;
        }

        // If pool has no LP supply or allocation points, only update last reward time
        if (pool.lpSupply == 0 || pool.allocPoint == 0) {
            pool.lastRewardTime = block.timestamp;
            emit UpdatePool(
                _pid,
                pool.lastRewardTime,
                pool.accPRPerShare,
                pool.lpSupply
            );
            return;
        }

        // Calculate the rewards multiplier
        uint256 multiplier = getMultiplier(
            pool.lastRewardTime,
            block.timestamp
        );

        // Calculate the reward
        uint256 hwReward = (multiplier * (rwPerSecond) * (pool.allocPoint)) /
            (totalAllocPoint);

        // Calculate the developer's reward
        uint256 devReward = hwReward / 10;

        // Calculate total rewards and check against max supply
        uint256 totalRewards = presentToken.totalSupply() + (devReward) + (hwReward);

        // Accounts for Total Supply together with rewards
        if (totalRewards <= MAX_REWARD_SUPPLY) {
            // mint as normal as not at maxSupply
            presentToken.mint(devaddress, hwReward / 10);
            presentToken.mint(address(this), hwReward);
        } else {
            // mint the difference only to MC, update hwReward
            hwReward = MAX_REWARD_SUPPLY / presentToken.totalSupply();

            presentToken.mint(address(this), hwReward);
        }

        if (hwReward != 0) {
            // only calculate and update if hwReward is non 0
            pool.accPRPerShare =
                pool.accPRPerShare +
                ((hwReward * 1e18) / pool.lpSupply);
        }
        pool.lastRewardTime = block.timestamp;
        emit UpdatePool(
            _pid,
            pool.lastRewardTime,
            pool.accPRPerShare,
            pool.lpSupply
        );
    }

    // Deposit LP tokens to MasterChef for Presents allocation.
    function deposit(uint256 _pid, uint256 _amount) external nonReentrant {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        updatePool(_pid);

        if (user.amount > 0) {
            uint256 pending = ((user.amount * pool.accPRPerShare) / 1e18) -
                user.rewardDebt;
            if (pending > 0) {
                safeHWTransfer(msg.sender, pending);
            }
        }

        if (_amount > 0) {
            uint256 balanceBefore = pool.lpToken.balanceOf(address(this));
            pool.lpToken.safeTransferFrom(msg.sender, address(this), _amount);
            _amount = pool.lpToken.balanceOf(address(this)) - (balanceBefore);

            pool.lpSupply = pool.lpSupply + (_amount);
            user.amount = user.amount + (_amount);
        }
        user.rewardDebt = (user.amount * (pool.accPRPerShare)) / (1e18);
        emit Deposit(msg.sender, _pid, _amount);
    }

    // Withdraw LP tokens from MasterChef.
    function withdraw(uint256 _pid, uint256 _amount) external nonReentrant {
        _withdraw(_pid, msg.sender, _amount);
    }

    function _withdraw(uint256 _pid, address _user, uint256 _amount) internal {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][_user];

        require(user.amount >= _amount, "withdraw: not good");
        updatePool(_pid);
        uint256 pending = (user.amount * (pool.accPRPerShare)) /
            (1e18) -
            (user.rewardDebt);
        if (pending > 0) {
            safeHWTransfer(_user, pending);
        }
        if (_amount > 0) {
            user.amount = user.amount - (_amount);
            pool.lpToken.safeTransfer(_user, _amount);
            pool.lpSupply = pool.lpSupply - (_amount);
        }
        user.rewardDebt = (user.amount * (pool.accPRPerShare)) / (1e18);
        emit Withdraw(_user, _pid, _amount);
    }

    // Withdraw without caring about rewards. EMERGENCY ONLY.
    function emergencyWithdraw(uint256 _pid) public nonReentrant {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        uint256 amount = user.amount;
        user.amount = 0;
        user.rewardDebt = 0;
        pool.lpToken.safeTransfer(address(msg.sender), amount);

        if (pool.lpSupply >= amount) {
            pool.lpSupply = pool.lpSupply - (amount);
        } else {
            pool.lpSupply = 0;
        }
        emit EmergencyWithdraw(msg.sender, _pid, amount);
    }

    // Safe presentToken transfer function, just in case if rounding error causes pool to not have enough Presents.
    function safeHWTransfer(address _to, uint256 _amount) internal {
        uint256 hwBal = presentToken.balanceOf(address(this));
        bool transferSuccess = false;
        if (_amount > hwBal) {
            transferSuccess = presentToken.transfer(_to, hwBal);
        } else {
            transferSuccess = presentToken.transfer(_to, _amount);
        }
        require(transferSuccess, "safeHWTransfer: Transfer failed");
    }

    // Update vault address by the previous vault
    function setVaultAddress(address _vaultAddress) external onlyVault {
        vaultAddress = _vaultAddress;
    }

    // Update dev address by the previous dev.
    function setDevAddress(
        address _devaddress
    ) external onlyOwner nonZeroAddress {
        devaddress = _devaddress;
        emit SetDevAddress(msg.sender, _devaddress);
    }

    function setFeeAddress(
        address _feeAddress
    ) external onlyOwner nonZeroAddress {
        feeAddress = _feeAddress;
        emit SetFeeAddress(msg.sender, _feeAddress);
    }

    function updateEmissionRate(uint256 _rwPerSecond) external onlyOwner {
        require(_rwPerSecond <= MAX_EMISSION_RATE, "Too high");
        massUpdatePools();
        rwPerSecond = _rwPerSecond;
        emit UpdateEmissionRate(msg.sender, _rwPerSecond);
    }

    // Only update before start of farm
    function updateStartTime(uint256 _startTimestamp) external onlyOwner {
        require(startTime > block.timestamp, "Farm already started");
        require(
            block.timestamp < _startTimestamp,
            "cannot set start time in the past"
        );

        for (uint256 i = 0; i < poolInfo.length; i++) {
            poolInfo[i].lastRewardTime = _startTimestamp;
        }

        startTime = _startTimestamp;

        emit UpdateStartTime(startTime);
    }

    // Switches active pool
    function switchActivePool(
        uint16[] calldata _activePids,
        uint16[] calldata _newPids,
        uint256[] calldata _newAllocPoints
    ) external onlyOwner {
        for (uint256 i = 0; i < _activePids.length; i++) {
            updatePool(_activePids[i]);
            PoolInfo storage activePool = poolInfo[_activePids[i]];
            activePool.allocPoint = 0;
        }

        for (uint256 i = 0; i < _newPids.length; i++) {
            PoolInfo storage newPool = poolInfo[_newPids[i]];
            newPool.allocPoint = _newAllocPoints[i];
        }
    }   

    // Forces user to withdraw when allocpoint is set to 0
    function forceWithdraw(
        uint16 _pid,
        address[] memory _userAddresses
    ) external onlyOwner {
        require(poolInfo[_pid].allocPoint == 0, "Alloc point is not 0");

        for (uint256 i = 0; i < _userAddresses.length; i++) {
            _withdraw(
                _pid,
                _userAddresses[i],
                userInfo[_pid][_userAddresses[i]].amount
            );
        }
    }
}
