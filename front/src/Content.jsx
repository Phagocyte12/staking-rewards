import React from 'react';
import { Layout, Col, Row } from 'antd';
import { Button, Form, InputNumber } from 'antd';
import { coinContract } from './contracts/CoinContract';
import { useState } from 'react';

const { Content } = Layout;

function Coin() {
  const [contractAddress, setContractAddress] = useState('0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0');
  const { approve, balanceOf, balance } = coinContract();

  const handleSubmit = async (val) => {
    let amount = Number(val.amount);

    if (!(amount > 0 && amount <= balance)) {
      alert('TOM币输入不对!');
      return;
    }

    await approve(contractAddress, val.amount);
  };

  return (
    <>
      <Content style={{ padding: '0 48px' }}>
        <Row>
          <Col span={12}>
            <Button
              color="primary"
              variant="outlined"
              onClick={async () => {
                await balanceOf(contractAddress);
              }}
            >
              TOM币余额
            </Button>
          </Col>
          <Col span={12} pull={1}>
            <h3>{balance} &nbsp;TOM</h3>
          </Col>
        </Row>
        <Form onFinish={handleSubmit}>
          <Form.Item name="amount">
            <Row>
              <Col span={12}>
                <Button color="primary" variant="outlined" htmlType="submit">
                  授权合约TOM币
                </Button>
              </Col>
              <Col span={12} pull={2}>
                <InputNumber placeholder="请输入需要授权TOM币" prefix="￥" suffix="TOM" style={{ width: '100%' }} />
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Content>
    </>
  );
}

export default Coin;
