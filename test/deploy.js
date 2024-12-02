const hre = require('hardhat');
//质押
let stakingTokenAddr = '';
//奖励
let rewardsTokenAddr = '';
// hardhat 默认1部署合约地址 '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
// hardhat 默认2质押用户地址 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
const stakingTokenAccount = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';

async function Deploy() {
  const COIN = await hre.ethers.getContractFactory('COIN');
  //初始账户代币
  const coinTom = await COIN.deploy('TOM', 'TOM');
  const coinJerry = await COIN.deploy('JERRY', 'JERRY');

  stakingTokenAddr = coinTom.target;
  rewardsTokenAddr = coinJerry.target;

  //部署质押合约
  const SR = await hre.ethers.getContractFactory('StakingRewards');

  console.log(`stakingTokenAddr to: ${stakingTokenAddr}`);
  console.log(`rewardsTokenAddr to: ${rewardsTokenAddr}`);
  //部署合约
  const sr = await SR.deploy(stakingTokenAddr, rewardsTokenAddr);
  console.log(`Deployed contract StakingRewards to: ${sr.target}`);
  //初始代币 10
  const initialSupply = hre.ethers.parseUnits('10', 18);
  console.log('initialSupply', initialSupply);

  //给质押用户初始代币
  await coinTom.mint(stakingTokenAccount, initialSupply);
  //给奖励地址初始代币
  await coinJerry.mint(sr.target, initialSupply);

  //查看账户余额
  const balancea = await coinTom.balanceOf(stakingTokenAccount);
  const balanceb = await coinJerry.balanceOf(sr.target);
  console.log('stakingTokenAddr balance', balancea.toString());
  console.log('rewardsTokenAddr balance', balanceb.toString());
}

async function main() {
  await Deploy();
}

main();
