/* eslint-disable no-template-curly-in-string */
import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Select, Button, notification } from 'antd';
import axios from 'axios';

const AddProduct = () => {
  const { Option } = Select;
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const addProductHandler = async value => {
    try {
      await axios.post('/api/products/add', value);
      notification.success({ message: 'Product added successfully' });
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = values => {
    addProductHandler(values);
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Add new product</h2>

      <Form
        onFinish={onFinish}
        {...layout}
        name='nest-messages'
        validateMessages={validateMessages}
      >
        <Form.Item
          name='name'
          label='Name'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='price'
          label='Price'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='description'
          label='Description'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='image'
          label='Image'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='category'
          label='Category'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select placeholder='select category'>
            <Option value='electronics'>Electronics</Option>
            <Option value='fashion'>Fashion</Option>
            <Option value='mobiles'>Mobiles</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name='countInStock'
          label='Stock'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 11 }}>
          <Button
            type='primary'
            htmlType='submit'
            style={{ backgroundColor: 'black' }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProduct;
