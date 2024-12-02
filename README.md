## 简单质押奖励项目简介

功能简介
用户持有 TOM 币，在 staking-rewards 项目上质押来挣取 JERRY 奖励币

合约 ERC20 代币提供的功能包括

1. 初始代币
2. 允许其他人代表代币持有者转移代币

合约 StakingRewards 提供的功能包括

1. 管理员功能 奖励持续时间、奖励 JERRY 币数量等
2. 用户功能 授权、质押 TOM 币、提取质押 TOM 币、查询奖励币、提取奖励币等

连接 MetaMask 钱包

#### 实现 ERC20 合约

approve
transferForm

1. 编写合约 COIN.sol 、StakingRewards.sol 并编译 `npx hardhat compile`
2. 启动本地链确认 A、B 用户的地址 `npx hardhat node`

#### 部署合约 deploy.js

-部署合约本地链上
`npx hardhat run test/deploy.js --network localhost`

初始化合约，给 A、B 两个账号

1. A 账户部署合约-管理员
2. B 账户-用户，初始 10 个 TOM 代币
3. 初始 10 个 JERRY 币给 StakingRewards 合约作为奖励币

#### 前台合约交互

1. 切换到 B 账户用户授权。从 B 账户授权 1 个 TOM 代币到质押合约使用。
2. 切换到 A 账户管理员。分别设置奖励持续时间、奖励 JERRY 币数量等。
3. 切换到 B 账户用户。分别操作质押 1 个 TOM 币 -> 查询奖励币->提取 JERRY 奖励币->提取质押 1 个 TOM 币

#### 添加 vite+react front-前端和合约交互

1. `npx create-vite@latest front`
2. `npm install`

#### 启动项目 vite+react

`npm run dev`

#### 相关依赖包

1. `npm install @web3-react/core`
2. `npm install @web3-react/metamask`
3. `npm install eventemitter3`
4. `npm install @ethersproject/contracts`
5. `npm install ethers`
6. `npm install antd --save`

# 测试注意事项

1. MetaMask 钱包 需要”添加网络“ hardhat 测试链信息
   配置 Hardhat 测试链信息
   网络名称：可以自定义，比如 “Hardhat Local Network”。
   新的 RPC URL：输入http://127.0.0.1:8545 （这是 Hardhat 本地链的默认 RPC 地址）。
   链 ID：Hardhat 默认的链 ID 是 31337，可以填入 31337。
   区块浏览器 URL：由于是本地测试链，一般没有对应的区块浏览器，可留空。

2. MetaMask 钱包 用户可以导入, hardhat 测试链用户
3. MetaMask 钱包 代币显示, 添加代币=>把部署的在本地链，合约地址复制即可
4. 项目中的账户、合约地址都是 hardhat 本地链上的信息，可自行修改
5. 项目中只需要 关注如下文件 COIN.sol、StakingRewards.sol、deploy.js、App.jsx、Contract.jsx、Contract.jsx、ContractSR.jsx、ContractSRA.jsx
