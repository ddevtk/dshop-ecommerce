import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import axios from 'axios';
import { notification, Popconfirm } from 'antd';
import 'antd/dist/antd.css';
import { formatPrice } from '../utils/formatPrice';

const ProductList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const deleteProduct = async _id => {
    try {
      await axios.post('/api/products/delete', {
        _id,
      });
      getAllProduct();
      notification.success({ message: 'Deleted successfully' });
    } catch (error) {
      console.error(error);
    }
  };

  const getAllProduct = async () => {
    setIsLoading(true);
    try {
      const res = await axios('/api/products');
      setProducts(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const confirmHandler = _id => {
    deleteProduct(_id);
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      width: '20%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: '45%',
    },

    {
      title: 'Price',
      dataIndex: 'price',
      width: '10%',
      render: price => {
        return formatPrice(price);
      },
    },
    {
      title: 'Stock',
      dataIndex: 'countInStock',
      width: '10%',
    },
    {
      width: '20%',
      render: record => {
        return (
          <Popconfirm
            placement='topLeft'
            title='Are you sure to delete this user ?'
            okText='Yes'
            cancelText='No'
            onConfirm={() => confirmHandler(record._id)}
          >
            <DeleteOutlined style={{ cursor: 'pointer' }} />
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Product list</h2>
      <Table
        loading={isLoading}
        columns={columns}
        rowKey={record => record._id}
        dataSource={products}
      />
    </div>
  );
};

export default ProductList;
