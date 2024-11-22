import React, { useState, useEffect } from "react";
import {
  Button,
  message,
  ConfigProvider,
  Modal,
  Menu,
  Dropdown,
  Spin,
  Popconfirm,
  Flex,
  Select,
  Input,
} from "antd";
import enUS from "antd/lib/locale/en_US";
import {
  EditOutlined,
  ReloadOutlined,
  LockOutlined,
  DeleteTwoTone,
} from "@ant-design/icons";
import ProTable from "@ant-design/pro-table";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserModal from "../../../components/UserModal/UserModal";
const YourComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingKey, setEditingKey] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const authToken = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/api/users/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await response.json();
      const formattedData = data.map((user) => ({
        key: user._id,
        Firstname: user.Firstname,
        Lastname: user.Lastname,
        email: user.email,
        phone: user.phone,
        password: user.password,
        nationality: user.nationality,
        isAdmin: user.isAdmin,
        address: user.address,
        bankAccount: user.bankAccount,
        birthday: user.birthday,
        projectName: user.projectName,
      }));
      setData(formattedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleAddUser = () => {
    setIsModalVisible(true);
    setEditingKey(null);
  };
  const handleEditUser = async (key, values) => {
    setLoading(true);
    try {
      const dataUpdate = {
        Firstname: values.Firstname,
        Lastname: values.Lastname,
        phone: values.phone,
        isAdmin: `${values.isAdmin}`,
      };
      const authToken = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8000/api/users/profile/${key}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(dataUpdate),
        }
      );
      const updatedUserData = await response.json();
      if (response.status === 200) {
        message.success("User updated successfully");
        fetchData(); // Fetch the data after updating a user
        setIsModalVisible(false);
      } else {
        message.error("Error your Data");
        console.log(values);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      message.error("Error updating user. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      if (editingKey !== null) {
        await handleEditUser(editingKey, values);
      } else {
        const response = await fetch(
          "http://localhost:8000/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );
        const data = await response.json();
        if (response.status !== 201) {
          message.error(data.message);
        } else {
          message.success(data.message);
          setIsModalVisible(false);
          setData((prevData) => [
            ...prevData,
            {
              key: data.key,
              Firstname: values.Firstname,
              Lastname: values.Lastname,
              email: values.email,
              phone: values.phone,
              password: values.password,
              nationality: values.nationality,
              isAdmin: values.isAdmin,
              address: values.address,
              bankAccount: values.bankAccount,
              birthday: values.birthday,
              projectName: values.projectName,
            },
          ]);
        }
      }
    } catch (error) {
      console.error("Form submission failed:", error.message);
      message.error("Form submission failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const editUser = (key) => {
    setEditingKey(key);
    setIsModalVisible(true);
  };

  const deleteUser = async (key) => {
    setLoading(true);
    try {
      const authToken = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8000/api/users/profile/${key}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.status === 200) {
        setData(data.filter((item) => item.key !== key));
        message.success("User deleted successfully");
      } else {
        const data = await response.json();
        message.error(data.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      message.error("Error deleting user. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Firstname",
      dataIndex: "Firstname",
      key: "Firstname",
    },
    {
      title: "Lastname",
      dataIndex: "Lastname",
      key: "Lastname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => editUser(record.key)}>
            <EditOutlined /> Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => deleteUser(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" style={{ color: "#d9534f" }}>
              <DeleteTwoTone twoToneColor="#d9534f" />
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      <ToastContainer />
      <ConfigProvider locale={enUS}>
        <Spin spinning={loading}>
          <ProTable
            columns={columns}
            dataSource={data}
            rowKey="key"
            search={false}
            pagination={{
              pageSize: 10,
            }}
            toolBarRender={() => [
              <Button key="button" type="primary" onClick={handleAddUser}>
                Add User
              </Button>,
              <Button key="button" type="primary" onClick={fetchData}>
                <ReloadOutlined />
                Refresh
              </Button>,
            ]}
          />
        </Spin>
        <UserModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          handleFormSubmit={handleFormSubmit}
          editingKey={editingKey}
          data={data}
        />
      </ConfigProvider>
    </>
  );
};

export default YourComponent;
