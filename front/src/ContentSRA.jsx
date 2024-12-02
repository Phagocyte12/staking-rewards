import React from 'react';
import { Layout, Col, Row, Divider } from 'antd';
import { Button, Form, InputNumber } from 'antd';
import { SRContract } from './contracts/SRContract';
import { useState } from 'react';

const { Content } = Layout;

function ContentSRA() {
  const [contractAddress, setContractAddress] = useState('0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0');
  const { stakeReward, withdraw, earnedReward, getReward, earnedBalances } = SRContract();

  const handleStake = async (val) => {
    let stake = Number(val.stake);
    if (!stake > 0) {
      alert('质押TOM币不对!');
      return;
    }
    await stakeReward(contractAddress, val.stake);
  };

  const handleWithdraw = async (val) => {
    let amount = Number(val.amount);

    if (!amount > 0) {
      alert('提取质押币数额不对!');
      return;
    }
    await withdraw(contractAddress, val.amount);
  };

  const handleEarned = async () => {
    await earnedReward(contractAddress);
  };

  const handleGetReward = async () => {
    await getReward(contractAddress);
  };

  return (
    <>
      <Content style={{ padding: '0 48px' }}>
        <Divider variant="dashed" style={{ borderColor: '#CFCFCF' }}>
          用户质押TOM币
        </Divider>
        <Form onFinish={handleStake}>
          <Form.Item name="stake">
            <Row>
              <Col span={12}>
                <Button color="primary" variant="outlined" htmlType="submit">
                  质押TOM币
                </Button>
              </Col>
              <Col span={12} pull={2}>
                <InputNumber placeholder="请输入需要质押TOM币" prefix="￥" suffix="TOM" style={{ width: '100%' }} />
              </Col>
            </Row>
          </Form.Item>
        </Form>
        <Form onFinish={handleWithdraw}>
          <Form.Item name="amount">
            <Row>
              <Col span={12}>
                <Button color="primary" variant="outlined" htmlType="submit">
                  提质押TOM币
                </Button>
              </Col>
              <Col span={12} pull={2}>
                <InputNumber placeholder="请输入需要提取TOM币" prefix="￥" suffix="TOM" style={{ width: '100%' }} />
              </Col>
            </Row>
          </Form.Item>
        </Form>
        <Form onFinish={handleEarned}>
          <Form.Item name="earned">
            <Row>
              <Col span={12}>
                <Button color="danger" variant="outlined" htmlType="submit">
                  查询奖励币
                </Button>
              </Col>
              <Col span={12} pull={2}>
                {earnedBalances} JERRY
              </Col>
            </Row>
          </Form.Item>
        </Form>
        <Form onFinish={handleGetReward}>
          <Form.Item>
            <Row>
              <Col span={12}>
                <Button color="danger" variant="solid" htmlType="submit">
                  提取JERRY奖励币
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Content>
    </>
  );
}

export default ContentSRA;
