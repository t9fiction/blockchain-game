// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract GuessingGame {
    uint256 private secretNumber;
    address public owner;
    IERC20 public rewardToken;

    uint256 public constant EXACT_GUESS_REWARD = 1000 * 10**18; 
    uint256 public constant CLOSE_GUESS_REWARD = 500 * 10**18; 

    // Enhanced event with a specific win type
    event GameResult(
        address player,
        uint256 guess,
        uint256 reward,
        string winType  // "EXACT", "CLOSE", or "NONE"
    );
    event SecretNumberGenerated(uint256 newSecretNumber);

    error GuessingGame__InvalidTokenAddress();
    error GuessingGame__InvalidGuessRange();
    error GuessingGame__InsufficientRewardTokens();
    error GuessingGame__TokenTransferFailed();

    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert();
        }
        _;
    }

    constructor(address _tokenAddress) {
        if (_tokenAddress == address(0)) {
            revert GuessingGame__InvalidTokenAddress();
        }
        rewardToken = IERC20(_tokenAddress);
        owner = msg.sender;
        _generateNewSecretNumber();
    }
     
    function _generateNewSecretNumber() private {
        secretNumber = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, msg.sender))) % 10 + 1;
        emit SecretNumberGenerated(secretNumber);
    }

    function guessNumber(uint256 _guess) public {
        if (_guess < 1 || _guess > 10) {
            revert GuessingGame__InvalidGuessRange();
        }

        uint256 reward = 0;
        string memory winType = "NONE";

        if (_guess == secretNumber) {
            reward = EXACT_GUESS_REWARD;
            winType = "EXACT";
        } else if (_guess == secretNumber - 1 || _guess == secretNumber + 1) {
            reward = CLOSE_GUESS_REWARD;
            winType = "CLOSE";
        }

        if (reward > 0) {
            if (rewardToken.balanceOf(address(this)) < reward) {
                revert GuessingGame__InsufficientRewardTokens();
            }
            if (!rewardToken.transfer(msg.sender, reward)) {
                revert GuessingGame__TokenTransferFailed();
            }
        }

        emit GameResult(msg.sender, _guess, reward, winType);
        
        _generateNewSecretNumber();
    }

    function depositTokens(uint256 _amount) public onlyOwner {
        if (!rewardToken.transferFrom(msg.sender, address(this), _amount)) {
            revert GuessingGame__TokenTransferFailed();
        }
    }

    function withdrawTokens(uint256 _amount) public onlyOwner {
        if (rewardToken.balanceOf(address(this)) < _amount) {
            revert GuessingGame__InsufficientRewardTokens();
        }
        if (!rewardToken.transfer(msg.sender, _amount)) {
            revert GuessingGame__TokenTransferFailed();
        }
    }

    function getRewardPool() public view returns (uint256) {
        return rewardToken.balanceOf(address(this));
    }

    function getCurrentSecretNumber() public view onlyOwner returns (uint256) {
        return secretNumber;
    }
}