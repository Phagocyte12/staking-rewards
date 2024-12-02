const hre = require('hardhat');

async function main() {
  const testTime = await hre.ethers.getContractFactory('testTime');
  const st = await testTime.deploy();
  const timestamp = await st.lastTimeRewardApplicable();

  console.log('从合约获取的当前区块时间戳:', timestamp);

  // const futureTimestamp = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
  // await network.provider.send('evm_setNextBlockTimestamp', [futureTimestamp]);
  // await network.provider.send('evm_mine'); // mine a new block with the specified timestamp

  // getting timestamp
  // const blockNumBefore = await ethers.provider.getBlockNumber();
  // const blockBefore = await ethers.provider.getBlock(blockNumBefore);
  // const timestampBefore = blockBefore.timestamp;

  // console.log('blockNumBefore:', blockNumBefore);
  // console.log('blockBefore:', blockBefore);
  // console.log('timestampBefore:', timestampBefore);

  // for (let index = 0; index < 100; index++) {
  //   const timestamp1 = await st.lastTimeRewardApplicable();

  //   console.log('从合约获取的当前区块时间戳1aaaaa:', timestamp1);
  // }

  // 获取当前区块的时间戳
  const currentTimestamp = (await hre.ethers.provider.getBlock('latest')).timestamp;
  console.log('当前时间戳:', currentTimestamp);

  // 设置下一个区块的时间戳为当前时间戳 + 1 天（86400秒）
  await hre.ethers.provider.send('evm_setNextBlockTimestamp', [currentTimestamp + 86400]);

  // 挖矿一个新区块，更新区块链状态
  await hre.ethers.provider.send('evm_mine', []);

  // 获取新区块的时间戳
  const newTimestamp = (await hre.ethers.provider.getBlock('latest')).timestamp;
  console.log('新的时间戳:', newTimestamp);

  // 继续测试与时间戳相关的合约逻辑
  const result = await st.lastTimeRewardApplicable();
  console.log('合约调用结果:', result);
}

main();
