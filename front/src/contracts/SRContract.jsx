import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { Contract } from '@ethersproject/contracts';
import { useState } from 'react';

import ABI from '../../../artifacts/contracts/StakingRewards.sol/StakingRewards.json';

export function SRContract() {
  const { provider, account } = useWeb3React();
  const [earnedBalances, setRewardBalance] = useState(0);
  const [finishTime, setFinishTime] = useState(0);

  //奖励时间
  const setRewardDuration = async (contractAddress, duration) => {
    const signer = provider.getSigner();
    if (!provider) {
      return;
    }
    const contract = new Contract(contractAddress, ABI.abi, signer);
    await contract.setRewardsDuration(duration);
  };

  //奖励速率
  const notifyRewardAmount = async (contractAddress, amount) => {
    const signer = provider.getSigner();
    if (!provider) {
      return;
    }

    // etherValue 转换
    const weiValue = ethers.parseEther(amount);
    const contract = new Contract(contractAddress, ABI.abi, signer);

    console.log('notifyRewardAmount', weiValue);
    await contract.notifyRewardAmount(weiValue);
  };

  //质押
  const stakeReward = async (contractAddress, amount) => {
    const signer = provider.getSigner();
    if (!provider) {
      return;
    }

    // etherValue 转换
    const weiValue = ethers.parseEther(amount);
    const contract = new Contract(contractAddress, ABI.abi, signer);

    console.log('stake', weiValue);
    await contract.stake(weiValue);
  };

  //挣的奖励
  const earnedReward = async (contractAddress) => {
    const signer = provider.getSigner();
    if (!provider) {
      return;
    }

    const contract = new Contract(contractAddress, ABI.abi, signer);
    const earnedBalances = await contract.earned(account);

    // weiValue 值转换
    const etherValue = ethers.formatEther(earnedBalances.toString());

    console.log('earnedReward', etherValue);
    setRewardBalance(etherValue);
  };

  //提取质押币
  const withdraw = async (contractAddress, amount) => {
    const signer = provider.getSigner();
    if (!provider) {
      return;
    }

    // etherValue 转换
    const weiValue = ethers.parseEther(amount);
    const contract = new Contract(contractAddress, ABI.abi, signer);

    console.log('withdraw', weiValue);
    await contract.withdraw(weiValue);
  };

  //提取质押奖励币
  const getReward = async (contractAddress) => {
    const signer = provider.getSigner();
    if (!provider) {
      return;
    }
    const contract = new Contract(contractAddress, ABI.abi, signer);
    await contract.getReward();
    console.log('getReward');
  };

  //hardhat测试数据块时间
  const setCurrentTimestamp = async (contractAddress, currentTimestamp) => {
    const signer = provider.getSigner();
    if (!provider) {
      return;
    }
    console.log('setCurrentTimestamp', currentTimestamp);
    const contract = new Contract(contractAddress, ABI.abi, signer);
    await contract.setCurrentTimestamp(currentTimestamp);
  };

  // 查询完成时间
  const finishAt = async (contractAddress) => {
    const signer = provider.getSigner();
    if (!provider) {
      return;
    }
    const contract = new Contract(contractAddress, ABI.abi, signer);
    const finishTime = await contract.finishAt();
    setFinishTime(finishTime.toString());
    console.log('finishTime', finishTime.toString());
  };

  return {
    setRewardDuration,
    notifyRewardAmount,
    stakeReward,
    earnedReward,
    withdraw,
    getReward,
    setCurrentTimestamp,
    finishAt,
    finishTime,
    earnedBalances
  };
}
