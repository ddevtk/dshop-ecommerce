import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.css';
import axios from 'axios';
import { notification, Popconfirm } from 'antd';
import 'antd/dist/antd.css';

const UserList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const deleteUser = async _id => {
    try {
      await axios.post('/api/users/delete', {
        _id,
      });
      getAllUser();
      notification.success({ message: 'Deleted successfully' });
    } catch (error) {
      console.error(error);
    }
  };

  const getAllUser = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('/api/users/getAllUser');
      setUsers(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const confirmHandler = _id => {
    deleteUser(_id);
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      width: '25%',
    },

    {
      title: 'Name',
      dataIndex: 'name',
      width: '25%',
      render: createdAt => {
        return createdAt.substring(0, 10);
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '25%',
    },
    {
      width: '25%',
      render: record => {
        return (
          <Popconfirm
            placement='topLeft'
            title='Are you sure to delete this user ?'
            okText='Yes'
            cancelText='No'
            onConfirm={() => confirmHandler(record._id)}
          >
            <DeleteTwoTone style={{ cursor: 'pointer' }} />
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>User list</h2>
      <Table
        loading={isLoading}
        columns={columns}
        rowKey={record => record._id}
        dataSource={users}
      />
    </div>
  );
};

export default UserList;
