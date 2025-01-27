// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const _tokenAddress = '0xFE4fEE4298E67536bE875585CA0b031Aad078782';
// const _tokenAddress = '0x71f0F6182F9dDc39BC20C073C8687C48B108BB43';

const GuessingGameModule = buildModule("GuessingGameModule", (m) => {
  const rewardToken = m.getParameter("rewardToken", _tokenAddress);

  const game = m.contract("GuessingGame", [rewardToken]);

  return { game };
});

export default GuessingGameModule;
