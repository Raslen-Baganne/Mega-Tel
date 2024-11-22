import React, { useState, useEffect } from 'react';
import { Table, Tag, Avatar, Space, Spin } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

interface User {
  key: string;
  name: string;
  profilePhoto: string;
  role: string;
  status: string;
}

const columns: ColumnsType<User> = [
  {
    title: 'User',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => (
      <Space>
        <Avatar src={record.profilePhoto} icon={<UserOutlined />} />
        <Link to={`/profile/${record.key}`}>{record.name}</Link>
      </Space>
    ),
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    render: (role) => (
      <Tag color={role === 'admin' ? 'geekblue' : 'green'}>
        {role.toUpperCase()}
      </Tag>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      <Tag color={status === 'online' ? 'green' : 'volcano'}>
        {status.toUpperCase()}
      </Tag>
    ),
  },
];

const HomeTable: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<User[]>([]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/api/users/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        });
        const data = await response.json();
        const formattedData: User[] = data.map((user: any) => ({
          key: user._id,
          name: `${user.Firstname} ${user.Lastname}`,
          profilePhoto: user.profilePhoto?.url || '',
          role: user.isAdmin ? 'admin' : 'user',
          status: user.status === 'Online' ? 'online' : 'offline',
        }));
        setRows(formattedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Spin spinning={loading} >
      <Table dataSource={rows} columns={columns} />
    </Spin>
  );
};

export default HomeTable;
