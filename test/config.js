const { ethers } = require('hardhat');

describe('COIN', function () {
  let token;
  let deployer;

  beforeEach(async function () {
    [deployer] = await ethers.getSigners();
    const Token = await ethers.getContractFactory('COIN');
    token = await Token.deploy();
  });

  it('should mint 10^18 tokens', async function () {
    // 使用 ethers.utils.parseUnits 来处理 10^18 代币 注意版本问题
    const amount = ethers.parseUnits('1', 18); // 1 代币，18 小数位

    console.log('Minting amount:', amount.toString()); // 打印出 mint 数量
    await token.mint(deployer.address, amount);

    // 检查铸造后代币余额
    const balance = await token.balanceOf(deployer.address);
    console.log('New balance:', balance.toString());

    // 验证余额是否正确
    assert.equal(balance.toString(), amount.toString());
  });
});
