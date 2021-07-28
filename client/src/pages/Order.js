import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderByUid } from '../redux/order/order.action';
import { Table } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { formatPrice } from '../utils/formatPrice';
import { Link } from 'react-router-dom';

const Order = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.login);
  const { order, isLoading } = useSelector(state => state.order);
  useEffect(() => {
    if (user) {
      dispatch(getOrderByUid(user._id));
    } else {
      window.location.href = '/';
    }
  }, []);

  const columns = [
    {
      title: 'Order ID',
      dataIndex: '_id',
      width: '18%',
    },
    {
      title: 'Amount',
      dataIndex: 'totalPrice',
      width: '18%',
      render: totalPrice => {
        return formatPrice(totalPrice);
      },
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      width: '18%',
      render: createdAt => {
        return createdAt.substring(0, 10);
      },
    },
    {
      title: 'Transaction ID',
      dataIndex: 'transactionId',
      width: '18%',
    },
    {
      title: 'Status',
      dataIndex: 'isDelivered',
      width: '18%',
      render: isDelivered => {
        return isDelivered ? 'Delivered' : 'Order Placed';
      },
    },
    {
      width: '10%',
      render: record => {
        const { _id } = record;
        return (
          <Link to={`order-info/${_id}`}>
            <InfoCircleOutlined />
          </Link>
        );
      },
    },
  ];

  return (
    <div className='row justify-content-center mt-5'>
      <h1 style={{ textAlign: 'center', fontSize: '48px !important' }}>
        Order
      </h1>
      <Table
        onSelect={record => console.log(record)}
        className='col-md-10'
        loading={isLoading}
        columns={columns}
        rowKey={record => record._id}
        dataSource={order}
      />
    </div>
  );
};

export default Order;
