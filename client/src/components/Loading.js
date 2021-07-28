import React from 'react';
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: '40px' }} spin />;

const Loading = () => {
  return <Spin indicator={antIcon} style={{ marginTop: '5rem' }} />;
};

export default Loading;
