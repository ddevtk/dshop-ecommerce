import React from 'react';
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: '60px' }} spin />;

const Loading = () => {
  return <Spin indicator={antIcon} style={{ marginTop: '5rem' }} />;
};

export default Loading;
