import React, { useEffect, useState } from 'react';
import { Layout, Menu, Avatar } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeOutlined,
  UserOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

interface MenuItem {
  label: string | JSX.Element;
  key: string;
  icon?: JSX.Element;
  children?: MenuItem[];
}

function getItem(
  label: string,
  key: string,
  icon?: JSX.Element,
  path?: string,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    label: path ? <Link to={path}>{label}</Link> : label,
    ...(children && { children }),
  };
}

const items: MenuItem[] = [
  getItem('Home', '1', <HomeOutlined />, '/'),
  getItem('User', '2', <UserOutlined />, '/user'),
  getItem('Events', '3', <ClockCircleOutlined />, '/calendar'),
  getItem('Formation', '4', <SettingOutlined />, '/formation'),
  getItem('Team', '5', <TeamOutlined />, '', [
    getItem('Team 1', '6'),
    getItem('Team 2', '7'),
    getItem('Team 3', '8'),
  ]),
];

const Sidebar: React.FC<{
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}> = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const storedKey = localStorage.getItem('selectedKey');
  const [selectedKey, setSelectedKey] = useState(storedKey || '1');
  const [userInfo, setUserInfo] = useState<any | null>(null);
  const userInfoFromStorage = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const idCompte = userInfoFromStorage?._id;

  useEffect(() => {
    fetchData();
  }, [location]);

  const fetchData = async () => {
    try {
      const authToken = localStorage.getItem('token');
      if (idCompte) {
        const response = await fetch(
          `http://localhost:8000/api/users/profile/${idCompte}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const data = await response.json();
        setUserInfo(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    localStorage.setItem('selectedKey', selectedKey);
  }, [selectedKey]);

  const avatarSize = collapsed ? 50 : 90;
  const avatarMargin = collapsed ? '16px 0' : '24px 0';

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={220}
      collapsedWidth={80}
      style={{
        overflowY: 'hidden',
        height: '100vh',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 1001,
        position: 'fixed',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '64px',
          margin: avatarMargin,
        }}
      >
        {userInfo && (
          <Avatar
            size={avatarSize}
            src={userInfo.profilePhoto?.url}
            style={{ backgroundColor: 'grey' }}
          />
        )}
      </div>
      <Menu
        theme="dark"
        selectedKeys={[selectedKey]}
        mode="inline"
        items={items as any}
        onSelect={({ key }) => setSelectedKey(key)}
      />
    </Sider>
  );
};

export default Sidebar;
