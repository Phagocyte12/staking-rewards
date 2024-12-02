import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { Divider, Layout, ConfigProvider, Space, Button } from 'antd';
import { Tabs } from 'antd';

import { AntDesignOutlined } from '@ant-design/icons';
import { createStyles } from 'antd-style';
import { useState, useEffect } from 'react';

import Coin from './Content.jsx';
import ContentSR from './ContentSR.jsx';
import ContentSRA from './ContentSRA.jsx';

const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: '1',
    label: '用户信息',
    children: <Coin />
  },
  {
    key: '2',
    label: '质押合约',
    children: <ContentSRA />
  },
  {
    key: '3',
    label: '质押初始设置',
    children: <ContentSR />
  }
];

const { Header, Content, Footer } = Layout;

const layoutStyle = {
  overflow: 'hidden',
  width: 'calc(100% - 8px)',
  maxWidth: 'calc(100% - 8px)',
  minHeight: '100vh'
};

const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      border-width: 0;

      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: 0;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `
}));

function App() {
  const { styles } = useStyle();

  const { isActive, account, connector, provider } = useWeb3React();
  const [contractAddress, setContractAddress] = useState('0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0');

  useEffect(() => {
    setTimeout(() => {
      const active = connector.activate();
      active.then((r) => {
        console.log('active', r);
      });
    }, 1000);
  }, [provider, connector, account]);

  return (
    <>
      <Layout style={layoutStyle}>
        <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100vw', display: 'flex', alignItems: 'center' }}></Header>
        <Content style={{ padding: '0 48px' }}>
          <h2>简单TOM币质押</h2>
          <Divider
            style={{
              borderColor: '#7cb305'
            }}
          >
            质押合约地址:{contractAddress}
          </Divider>
          <ConfigProvider button={{ className: styles.linearGradientButton }}>
            <Space>
              <h3>{isActive ? '已连接:' : '未连接:'}</h3>
              <Button
                type="primary"
                size="large"
                icon={<AntDesignOutlined />}
                onClick={async () => {
                  await connector.activate();
                  console.log('active', provider);
                }}
              >
                MetaMask
              </Button>
            </Space>
          </ConfigProvider>
          <Tabs type="card" defaultActiveKey="1" items={items} onChange={onChange} />
        </Content>
        <Footer style={{ textAlign: 'center' }}>PKing Design ©{new Date().getFullYear()} StakingRewards small project</Footer>
      </Layout>
    </>
  );
}

export default App;
