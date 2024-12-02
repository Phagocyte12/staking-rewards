import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { Contract } from '@ethersproject/contracts';
import { useState } from 'react';

import ABI from '../../../artifacts/contracts/COIN.sol/COIN.json';
const stakingTokenAddr = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

export function coinContract() {
  const { provider, connector, account } = useWeb3React();
  const [balance, setBalance] = useState(0);

  const approve = async (contractAddress, amount) => {
    const signer = provider.getSigner();
    if (!provider) {
      return;
    }
    // etherValue 转换
    const weiValue = ethers.parseEther(amount);
    console.log('approve', weiValue);

    const contract = new Contract(stakingTokenAddr, ABI.abi, signer);
    await contract.approve(contractAddress, weiValue);
  };

  const balanceOf = async (contractAddress) => {
    const signer = provider.getSigner();
    if (!provider) {
      return;
    }

    const contract = new Contract(stakingTokenAddr, ABI.abi, signer);
    const balance = await contract.balanceOf(account);
    // 1 ether = 10^18 wei
    // weiValue 值转换
    const etherValue = ethers.formatEther(balance.toString());
    console.log('balanceOf', etherValue);

    setBalance(etherValue);
  };

  return {
    approve,
    balanceOf,
    balance
  };
}
