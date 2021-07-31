import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import { formatPrice } from '../utils/formatPrice';
import { Link } from 'react-router-dom';

const OrderList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const getAllOrder = async () => {
    setIsLoading(true);
    try {
      const res = await axios('/api/orders/getAllOrders');

      setOrders(
        res.data.sort(
          (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
        )
      );
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllOrder();
  }, []);

  const columns = [
    {
      title: 'Order ID',
      dataIndex: '_id',
      width: '15%',
      render: _id => {
        return (
          <Link target='_blank' to={`/order-info/${_id}`}>
            {_id}
          </Link>
        );
      },
    },
    {
      title: 'User ID',
      dataIndex: 'userId',
      width: '15%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '10%',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      width: '10%',
      render: totalPrice => {
        return formatPrice(totalPrice);
      },
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      width: '30%',
      render: createdAt => {
        return createdAt.substring(0, 10);
      },
    },
    {
      title: 'Transaction ID',
      dataIndex: 'transactionId',
      width: '20%',
    },
  ];

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Order list</h2>
      <Table
        loading={isLoading}
        columns={columns}
        rowKey={record => record._id}
        dataSource={orders}
      />
    </div>
  );
};

export default OrderList;
