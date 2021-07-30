import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.css';
import axios from 'axios';
import {
  notification,
  Popconfirm,
  Space,
  Modal,
  Form,
  Input,
  Select,
  Button,
  Row,
} from 'antd';
import 'antd/dist/antd.css';
import { formatPrice } from '../utils/formatPrice';

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};

const ProductList = () => {
  const { Option } = Select;

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [fields, setFields] = useState([]);
  const [id, setId] = useState('');

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

  const showModal = record => {
    setId(record._id);
    const newField = Object.entries(record).map(item => {
      return {
        name: item[0],
        value: item[1],
      };
    });
    setFields(newField);

    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const onFinish = values => {
    updateProduct(values);
  };

  const updateProduct = async value => {
    try {
      await axios.post('/api/products/update', { value, id });
      notification.success({ message: 'Update successfully' });
      getAllProduct();
      setVisible(false);
    } catch (error) {
      console.log(error);
    }
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
          <Space size='middle'>
            <EditTwoTone
              style={{ cursor: 'pointer' }}
              onClick={() => showModal(record)}
            />

            <Popconfirm
              placement='topLeft'
              title='Are you sure to delete this product ?'
              okText='Yes'
              cancelText='No'
              onConfirm={() => confirmHandler(record._id)}
            >
              <DeleteTwoTone style={{ cursor: 'pointer' }} />
            </Popconfirm>
          </Space>
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
      <Modal title='Edit product' visible={visible} onCancel={hideModal}>
        <Form
          name='nest-messages'
          {...layout}
          fields={fields}
          onFinish={onFinish}
        >
          <Form.Item name='name' label='Name'>
            <Input />
          </Form.Item>
          <Form.Item name='price' label='Price'>
            <Input />
          </Form.Item>
          <Form.Item name='description' label='Description'>
            <Input />
          </Form.Item>
          <Form.Item name='image' label='Image'>
            <Input />
          </Form.Item>
          <Form.Item name='category' label='Category'>
            <Select placeholder='select category'>
              <Option value='electronics'>Electronics</Option>
              <Option value='fashion'>Fashion</Option>
              <Option value='mobiles'>Mobiles</Option>
            </Select>
          </Form.Item>
          <Form.Item name='countInStock' label='Stock'>
            <Input />
          </Form.Item>
          <Row style={{ justifyContent: 'center', margin: '40px 0px 0px 0px' }}>
            <Space size='small'>
              <Button onClick={() => setVisible(false)}>Cancel</Button>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </Space>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductList;
