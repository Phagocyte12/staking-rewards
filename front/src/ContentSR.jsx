import React from 'react';
import { Layout, Col, Row, Divider } from 'antd';
import { Button, Form, InputNumber, Alert } from 'antd';
import { SRContract } from './contracts/SRContract';
import { useState } from 'react';

const { Content } = Layout;

function ContentSR() {
  const [contractAddress, setContractAddress] = useState('0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0');
  const { setRewardDuration, notifyRewardAmount, setCurrentTimestamp, finishAt, finishTime } = SRContract();

  const handleRewardDuration = async (val) => {
    let duration = Number(val.duration);
    if (!duration > 0) {
      alert('设置奖励持续时间不对!');
      return;
    }
    await setRewardDuration(contractAddress, duration);
  };

  const handleRewardAmount = async (val) => {
    let rewardAmount = Number(val.rewardAmount);
    if (!rewardAmount > 0) {
      alert('设置奖励JERRY币数量不对!');
      return;
    }
    await notifyRewardAmount(contractAddress, val.rewardAmount);
  };

  const handleCurrentTimestamp = async (val) => {
    let currentTimestamp = Number(val.currentTimestamp);

    if (!currentTimestamp > 0) {
      alert('时间不对!');
      return;
    }
    await setCurrentTimestamp(contractAddress, currentTimestamp);
  };

  const handleFinishAt = async () => {
    await finishAt(contractAddress);
  };

  const onClose = (e) => {
    console.log(e, 'I was closed.');
  };

  return (
    <>
      <Content style={{ padding: '0 48px' }}>
        <Divider variant="dashed" style={{ borderColor: '#CFCFCF' }}>
          质押初始值设置只能‘合约发布者’设置
        </Divider>
        <Row>
          <Col span={24}>
            <Alert message="JERRY币初始已存在10个,请输入需要奖励JERRY币控制在10个以内" type="warning" closable onClose={onClose} />
          </Col>
        </Row>
        <br />
        <Form onFinish={handleRewardDuration}>
          <Form.Item name="duration">
            <Row>
              <Col span={12}>
                <Button color="primary" variant="outlined" htmlType="submit">
                  设置奖励持续时间
                </Button>
              </Col>
              <Col span={12} pull={2}>
                <InputNumber placeholder="例如:1000s结束" prefix="Time" suffix="s" style={{ width: '100%' }} />
              </Col>
            </Row>
          </Form.Item>
        </Form>
        <Form onFinish={handleRewardAmount}>
          <Form.Item name="rewardAmount">
            <Row>
              <Col span={12}>
                <Button color="primary" variant="outlined" htmlType="submit">
                  设置奖励JERRY币数量
                </Button>
              </Col>
              <Col span={12} pull={2}>
                <InputNumber placeholder="请输入需要奖励JERRY币" prefix="￥" suffix="JERRY" style={{ width: '100%' }} />
              </Col>
            </Row>
          </Form.Item>
        </Form>
        <Form onFinish={handleCurrentTimestamp}>
          <Form.Item name="currentTimestamp">
            <Row>
              <Col span={12}>
                <Button color="danger" variant="dashed" htmlType="submit">
                  设置流逝时间
                </Button>
              </Col>
              <Col span={12} pull={2}>
                <InputNumber placeholder="例如1733038796" prefix="Time" suffix="s" style={{ width: '100%' }} />
              </Col>
            </Row>
          </Form.Item>
        </Form>
        <Form onFinish={handleFinishAt}>
          <Form.Item>
            <Row>
              <Col span={12}>
                <Button color="danger" variant="outlined" htmlType="submit">
                  质押完成时间
                </Button>
              </Col>
              <Col span={12} pull={2}>
                {finishTime} s
              </Col>
            </Row>
          </Form.Item>
        </Form>
        <br />
        <Alert message="注意事项" description="设置流逝时间,仅针对hardhat测试链,因block.timestamp在hardhat区块时间戳是固定的,导致无法计算出奖励." type="info" />
      </Content>
    </>
  );
}

export default ContentSR;
