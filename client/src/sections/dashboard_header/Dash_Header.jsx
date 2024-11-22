import { Layout, Input, Menu, Dropdown, Avatar, Badge, Flex, Space } from 'antd';
import { UserOutlined, DownOutlined, ProfileOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import logo from '../../Assets/images/a1.png';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/apiCalls/authApiCall';
import { Link, useLocation } from 'react-router-dom';
import { useEffect ,useState } from 'react';
import React, { useCallback, useMemo } from 'react';

const { Header } = Layout;
const { Search } = Input;

const Dash_Header = () => {
  const location = useLocation();
  const [userInfo, setUserInfo] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logoutHandler = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);


  useEffect(() => {
    fetchData();
  }, [location]);
  
  const fetchData = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8000/api/users/profile/${user._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const data = await response.json();
      setUserInfo(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const menu = useMemo(() => (
    <Menu>
      <Menu.Item key="0" icon={<ProfileOutlined />}>
        <Link to={`/profile/${user._id}`}>Profile</Link>
      </Menu.Item>
      <Menu.Item key="1" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" icon={<LogoutOutlined />} onClick={logoutHandler}>
        Log Out
      </Menu.Item>
    </Menu>
  ), [user._id, logoutHandler]);

  return (
    <Header style={{ padding: '0 50px', background: '#f0f2f5', boxShadow: '0 2px 8px #f0f1f2', height: '50px' }}>
      <Flex justify="space-between" align="center" style={{ width: '100%' }}>
        <Flex flex="auto" align="center">
          <img src={logo} alt="Logo" style={{ width: '120px', position: 'relative' }} />
        </Flex>
        <Space>
        <Flex flex="auto" align="center">
          <Search
            placeholder="Search..."
            onSearch={value => console.log(value)}
            style={{ width: 300, marginRight: '20px' }}
          />
          </Flex>
          {userInfo && (
        <Dropdown overlay={menu} trigger={['click']}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            <Badge count={5} offset={[-12, 0]}>
              <Avatar src={userInfo.profilePhoto.url} style={{ backgroundColor: '#1890ff', marginRight: '20px' }} icon={<UserOutlined />} />
            </Badge>
            {userInfo.Firstname} {userInfo.Lastname}<DownOutlined />
          </a>
        </Dropdown>
      )}
        </Space>
      </Flex>
    </Header>
  );
};

export default Dash_Header;
