// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "hardhat/console.sol";


contract StakingRewards {

    IERC20 public immutable stakingToken;
    IERC20 public immutable rewardsToken;

    address public owner;
    // 奖励持续时间
    uint256 public duration;
    // 奖励最终结束时间
    uint256 public finishAt;
    // 上一次计算奖励的时间戳
    uint256 public updatedAt;
    // 奖励率
    uint256 public rewardRate; 
    // 全局奖励记录 是基于这个时间戳和 rewardRate 计算的
    uint256 public rewardPerTokenStored;
    // 每个用户的全局奖励记录
    mapping(address => uint256) public userRewardPerTokenPaid;
    // 每个用户 奖励
    mapping(address => uint256) public rewards;

    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    // 用于测试链设置流逝时间
    uint256 private _currentTimestamp;  

    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);
    event RewardDurationUpdated(uint256 newDuration);
    event RewardAmountNotified(uint256 newRewardRate);

    constructor(address _stakingToken, address _rewardToken) {
        owner = msg.sender;
        stakingToken = IERC20(_stakingToken);
        rewardsToken = IERC20(_rewardToken);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "not authorized");
        _;
    }
    // 更新奖励变化
    modifier updateReward(address _account) {
        rewardPerTokenStored = rewardPerToken(); 
        updatedAt = lastTimeRewardApplicable();

        if (_account != address(0)) {
            rewards[_account] = earned(_account);
            userRewardPerTokenPaid[_account] = rewardPerTokenStored;
        }

        _;
    }
    //测试hardhat时间流逝变化
    function setCurrentTimestamp(uint256 _timestamp) external onlyOwner {
        _currentTimestamp = _timestamp;  // Used for testing purposes to simulate time
    }

    function lastTimeRewardApplicable() public view returns (uint256) {
        return _min(finishAt, _currentTimestamp == 0 ? block.timestamp : _currentTimestamp);
    }
    // 全局RPT记录值
    function rewardPerToken() public view returns (uint256) {
        if (totalSupply == 0) {
            return rewardPerTokenStored;
        }

        return rewardPerTokenStored
            + (rewardRate * (lastTimeRewardApplicable() - updatedAt) * 1e18) / totalSupply;
    }
    // 质押
    function stake(uint256 _amount) external updateReward(msg.sender) {
        require(_amount > 0, "amount = 0");
        stakingToken.transferFrom(msg.sender, address(this), _amount);
        balanceOf[msg.sender] += _amount;
        totalSupply += _amount;

        emit Staked(msg.sender, _amount);
    }
    // 提取质押
    function withdraw(uint256 _amount) external updateReward(msg.sender) {
        require(_amount > 0, "amount = 0");
        balanceOf[msg.sender] -= _amount;
        totalSupply -= _amount;
        stakingToken.transfer(msg.sender, _amount);

        emit Withdrawn(msg.sender, _amount);
    }
    // 奖励
    function earned(address _account) public view returns (uint256) {
        return (balanceOf[_account] * (rewardPerToken() - userRewardPerTokenPaid[_account])) / 1e18 + rewards[_account];
    }
    // 提取奖励
    function getReward() external updateReward(msg.sender) {
        uint256 reward = rewards[msg.sender];
        if (reward > 0) {
            rewards[msg.sender] = 0;
            rewardsToken.transfer(msg.sender, reward);

            emit RewardPaid(msg.sender, reward);
        }
    }
    // 设置奖励完成时间
    function setRewardsDuration(uint256 _duration) external onlyOwner {
        require(finishAt < block.timestamp, "reward duration not finished");
        duration = _duration;

        emit RewardDurationUpdated(_duration);
    }

    // 奖励速率
    function notifyRewardAmount(uint256 _amount) external onlyOwner updateReward(address(0)) {
        if (_currentTimestamp == 0 || block.timestamp >= finishAt) {
            rewardRate = _amount / duration;
        } else {
            uint256 remainingRewards = (finishAt - _currentTimestamp) * rewardRate;
            rewardRate = (_amount + remainingRewards) / duration;
        }

        require(rewardRate > 0, "reward rate = 0");
        require(rewardRate * duration <= rewardsToken.balanceOf(address(this)), "reward amount > balance");

        finishAt = _currentTimestamp == 0 ? block.timestamp + duration : _currentTimestamp + duration;
        updatedAt = _currentTimestamp == 0 ? block.timestamp : _currentTimestamp;

        emit RewardAmountNotified(rewardRate);
    }

    function _min(uint256 x, uint256 y) private pure returns (uint256) {
        console.log("x", x);
        console.log("y", y);
        return x <= y ? x : y;
    }

}