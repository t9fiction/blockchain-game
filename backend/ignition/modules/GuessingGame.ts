// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const _tokenAddress = '0xFE4fEE4298E67536bE875585CA0b031Aad078782';

const GuessingGameModule = buildModule("GuessingGameModule", (m) => {
  const rewardToken = m.getParameter("rewardToken", _tokenAddress);

  const game = m.contract("GuessingGame", [rewardToken]);

  return { game };
});

export default GuessingGameModule;
