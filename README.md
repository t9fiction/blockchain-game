
# Blockchain Guessing Game

Link: [Play the Game](https://blockchain-game-3qn6.vercel.app/)

## Overview
The Blockchain Guessing Game is a decentralized number-guessing game where players can win ERC20 tokens by participating. The game is now a **multichain dApp** deployed on both the **Sepolia testnet** and the **Arbitrum Sepolia testnet**.

The objective of the game is to guess a secret number between 1 and 10, with rewards based on the accuracy of the player's guess. It offers a fun, interactive way to showcase blockchain-based gaming and token rewards.

## Repository Structure
```
.
├── backend
│   ├── GuessingGame.sol          # Smart contract for the guessing game
│   ├── hardhat.config.js         # Hardhat configuration file
│   ├── scripts                    # Scripts for deploying contracts
│   └── tests                      # Tests for the GuessingGame contract
│
└── frontend
    ├── package.json               # Frontend dependencies and scripts
    ├── next.config.js             # Next.js configuration file
    ├── components                  # React components for the application
    ├── pages                       # Next.js pages
    └── public                      # Static assets
```

## Task Achievements
- [x] ERC20 Token Contract Creation and deployment on Sepolia. 
- [x] ERC20 Token Contract Creation and deployment on Arbitrum Sepolia. 
- [x] Custom contract “GuessingGame” deployment and working on Sepolia. 
- [x] Custom contract “GuessingGame” deployment and working on Arbitrum Sepolia. 
- [x] Rewards distribution working on both chains. 
- [x] Frontend with Next.js and TypeScript created. 
- [x] Multichain Web3 integration done for Sepolia and Arbitrum Sepolia on the frontend.  

## Technologies Used
- **Solidity**
- **Foundry**
- **Hardhat**
- **Next.js**
- **TypeScript**
- **Recoil**
- **Wagmi**
- **Viem**
- **Various utilities**

## Contracts Links
- **ERC20 Reward Token**
  - Sepolia Address: `0x71f0F6182F9dDc39BC20C073C8687C48B108BB43`
  - Arbitrum Sepolia Address: `0xFE4fEE4298E67536bE875585CA0b031Aad078782`
  - Deployment Method: Foundry
  - Token Standard: ERC20
  - Git Repo: [ERC20 Token Repo](https://github.com/t9fiction/lmng-token)

- **Guessing Game Contract**
  - Sepolia Address: `0xe044D36FeefE7C360A0Ea84550261234fBCdaeB4`
  - Arbitrum Sepolia Address: `0x64100ce6B59D3211E54Bdb36c09962E94bec1538`
  - Deployment Method: Hardhat
  - Git Repo: [Guessing Game Repo](https://github.com/t9fiction/blockchain-game)

## Game Mechanics

### Gameplay Rules
1. Players connect their wallet to the game interface.
2. Players submit a guess between 1 and 10.
3. The contract compares the guess with the secret number, which is regenerated after every guess.
4. Rewards are distributed based on the accuracy of the guess:
   - **Exact Match**: The player wins 1000 tokens.
   - **Close Match (±1)**: The player wins 500 tokens.
   - **Incorrect Guess**: No tokens are awarded.

### Reward Structure
- **Exact Match**: 1000 tokens (scaled by 10^18 to match ERC20 decimals).
- **Close Match**: 500 tokens (scaled by 10^18 to match ERC20 decimals).

## How It Works
1. **Connect Wallet**: Players connect their Ethereum-compatible wallet to the dApp using WalletConnect.
2. **Submit Guess**: Players enter a number between 1 and 10 and submit their guess.
3. **On-Chain Validation**: The GuessingGame contract compares the submitted guess to a secret number (stored on-chain).
4. **Reward Distribution**: Rewards are sent directly to the player's wallet, and the secret number is regenerated for fairness.
5. **Event Listening**: The frontend listens for GameResult events emitted by the contract to update the UI with the outcome.

## Security Considerations
- **Owner Privileges**: Only the contract owner can deposit or withdraw tokens.
- **Input Validation**: All guesses are validated to ensure they fall within the allowed range (1-10).
- **Token Transfer Safety**: Includes checks to verify that the GuessingGame contract holds sufficient tokens before distributing rewards.
- **Event Logging**: Game events are logged to ensure transparency and enable real-time updates in the UI.
- **Error Handling**: Transactions are wrapped in try-catch blocks to prevent failures from crashing the application.

## Future Improvements
- **Leaderboards**: Add a leaderboard to display top players and their token earnings.
- **UI Enhancements**: Introduce animations and visuals to enhance user engagement.
- **Mainnet Deployment**: Prepare contracts and UI for deployment to Ethereum mainnet or other EVM-compatible mainnets.
- **Solana Deployment**: Explore deployment on the Solana chain.

---

For any inquiries or issues, please feel free to reach out.

