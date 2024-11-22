import React, { useState } from "react";
import PrefixSelector from "../PrefixSelector/PrefixSelector";
import { Modal, Input, Checkbox, Space } from "antd";
import ProForm, {
  ProFormDatePicker,
  ProFormText,
  ProFormSelect,
} from "@ant-design/pro-form";
import countries from "../../constants/calls.json"; // Adjust the path as necessary

const UserModal = ({
  isModalVisible,
  setIsModalVisible,
  handleFormSubmit,
  editingKey,
  data,
}) => {
  const [nationality, setNationality] = useState("Nationality");
  const [disabled, setDisabled] = useState(true);

  const toggleDisabled = () => {
    setDisabled(!disabled);
  };

  return (
    <Modal
      open={isModalVisible}
      title={editingKey ? "Edit User" : "Add New User"}
      onCancel={() => setIsModalVisible(false)}
      footer={null}
      width="40%"
    >
      <ProForm
        onFinish={handleFormSubmit}
        initialValues={
          editingKey !== null
            ? data.find((item) => item.key === editingKey)
            : {}
        }
      >
        <ProForm.Group>
          <ProFormText
            name="Firstname"
            label="Firstname"
            rules={[{ required: true, message: "Please input the firstname!" }]}
            width={"md"}
          />
          <ProFormText
            name="Lastname"
            label="Lastname"
            rules={[{ required: true, message: "Please input the lastname!" }]}
            width={"md"}
          />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText
            name="email"
            label="Email"
            width={"md"}
            rules={[
              {
                required: true,
                message: "Please input the email!",
                type: "email",
              },
            ]}
          />
          <ProForm.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input
              addonBefore={
                <PrefixSelector
                  defaultValue="+000"
                  onChange={(value) =>
                    setNationality(
                      countries.find((country) => country.dial_code === value)
                        .name
                    )
                  }
                />
              }
              style={{
                maxWidth: "100%", // Ensures the input does not exceed its container width
                width: "328px", // This is an approximate width for 'md' size in Ant Design
              }}
            />
          </ProForm.Item>
        </ProForm.Group>

        <ProForm.Group>
          {editingKey == null && (
            <>
              <ProFormText
                name="password"
                label="Password"
                placeholder="Enter your password"
                width={"md"}
                type="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your password!",
                  },
                ]}
              />
              <Space direction="vertical" size={"small"}>
                <ProFormText
                  name="nationality"
                  label="Nationality"
                  placeholder="Your nationality"
                  width={"md"}
                  disabled={disabled}
                  value={nationality}
                />
                <Checkbox checked={!disabled} onChange={toggleDisabled}>
                  Check the box and type if nationality is incorrect.
                </Checkbox>
              </Space>
            </>
          )}
        </ProForm.Group>

        <ProFormSelect
          name="isAdmin"
          label="Role"
          defaultValue="user"
          width={"md"}
          options={[
            { label: "User", value: false },
            { label: "Admin", value: true },
          ]}
        />
        <ProForm.Group>
          <ProFormText
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please input your address!" }]}
            width={"md"}
          />
          <ProFormText
            name="bankAccount"
            label="Bank Account"
            rules={[
              {
                required: true,
                message: "Please input your bank account number!",
              },
            ]}
            width={"md"}
          />
        </ProForm.Group>

        <ProFormDatePicker
          name="birthday"
          label="Birthday"
          rules={[{ required: true, message: "Please select your birthday!" }]}
          width={"md"}
        />

        <ProFormSelect
          name="projectName"
          label="Project Name"
          rules={[{ required: true, message: "Please select a project!" }]}
          options={[
            { label: "Project 1", value: "Project1" },
            { label: "Project 2", value: "Project2" },
            { label: "Project 3", value: "Project3" },
            // ... add more project names as needed
          ]}
          width={"md"}
        />
      </ProForm>
    </Modal>
  );
};

export default UserModal;
