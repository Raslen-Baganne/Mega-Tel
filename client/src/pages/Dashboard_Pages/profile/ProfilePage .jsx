import React, { useState, useEffect } from "react";
import {
  Card,
  Avatar,
  Space,
  Divider,
  message,
  Select,
  Button,
  Spin,
} from "antd";
import {
  UploadOutlined,
  UserOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Link } from "react-router-dom";
import useUserData from "../../../Hooks/useUserData"; // Import your custom hook

const { Option } = Select;




const MyProfilePage = () => {
  const [avatarImage, setAvatarImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const id = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
  const { userInfo, loading } = useUserData(id); // Use custom hook

  const styles = {
    profileCard: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      background: 'linear-gradient(to right, #2F80ED, #56CCF2)',
      color: 'white',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    name: {
      fontSize: '1.8em',
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'white',
      width: '100%',
    },
    avatar: {
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      border: '5px solid #1890ff', // Blue contour around the avatar
    },
    card: {
      marginBottom: '16px',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      padding: '20px',
    },
    chartCard: {
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    detailTitle: {
      fontSize: '1.2em',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    detailItem: {
      marginBottom: '10px',
    },
    button: {
      background: '#1890ff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      padding: '0 16px',
      marginTop: '10px',
    },
  };

  const CallID = () => {
    return crypto.randomUUID();
  };

  const handleUpload = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const authToken = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8000/api/users/profile/profile-photo-upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        message.success("Photo uploaded successfully");
        setAvatarImage(data.profilePhoto.url);
        window.location.reload();

        
      } else {
        throw new Error("Failed to upload photo");
      }
    } catch (error) {
      console.error("Error uploading photo:", error);
      message.error("Failed to upload photo");
    } finally {
      setUploading(false);

    }
  };



  const handleCallID = async (callID) => {
    const dataUpdate = {
      CallID: callID,
    };
    try {
  
      const authToken = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8000/api/users/profile/${userInfo._id}`,
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
      if (response.ok) {
        message.success("User updated successfully");
        fetchData(); // Fetch the data after updating a user
        setIsModalVisible(false);
        if (userInfo.isAdmin) {
          // Only if the user is an admin, send the CallID to the database
          const callIdResponse = await fetch(
            `http://localhost:8000/api/call/${callID}`, // Assuming this is the endpoint to save CallID
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
              },
              body: JSON.stringify({ CallID: callID }),
            }
          );
          if (callIdResponse.ok) {
            console.log("CallID saved to the database");
          } else {
            console.error("Error saving CallID to the database");
          }
        }
      } else {
        message.error("Error updating user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      message.error("Error updating user. Please try again later.");
    } finally {
      
    }
    console.log("looooo");
  };

  const chartData = [
    { name: "Page A", uv: 700, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 900, pv: 1798, amt: 2210 },
    { name: "Page C", uv: 1300, pv: 680, amt: 2310 },
    { name: "Page D", uv: 1000, pv: 1498, amt: 2400 },
    { name: "Page E", uv: 1500, pv: 1098, amt: 2200 },
    { name: "Page F", uv: 1900, pv: 1598, amt: 2650 },
    { name: "Page G", uv: 2700, pv: 2098, amt: 2650 },
    // ...more data
  ];

  const [selectedValue, setSelectedValue] = useState('change photo'); // Start with an empty value
  const handleChange = (value) => {
    if (value === 'upload') {
      document.getElementById('upload-avatar').click();
    } else if (value === 'delete') {
      // Handle delete action here
    }
    setSelectedValue('change photo'); // Reset the selected value to empty after handling the selection
  };
  let callid=CallID();

  return (
    <Spin tip="Loading..." spinning={loading || uploading} size="large">
      <Card bordered={true} style={{ margin: "auto" }}>
        <Card style={styles.profileCard}>
          <Space
            direction="vertical"
            size={20}
            style={{ textAlign: "center", zIndex: 1 }}
          >
            <Avatar
              size={200}
              src={userInfo?.profilePhoto?.url || avatarImage}
              style={styles.avatar}
            />
            <div style={styles.name}>
              {userInfo && `${userInfo.Firstname.charAt(0).toUpperCase()}${userInfo.Firstname.slice(1)} ${userInfo.Lastname.charAt(0).toUpperCase()}${userInfo.Lastname.slice(1)}`}
            </div>

            {userInfo && userInfo._id === (JSON.parse(localStorage.getItem("userInfo")))._id ? 
             <Select
              defaultValue="change photo"
              style={{ width: 160 }} // Increased width
              onChange={handleChange}
              value={selectedValue} // Controlled component
            >
              <Option value="upload">
                <CloudUploadOutlined /> Upload Photo
              </Option>
              <Option value="delete">
                <UserOutlined /> Delete
              </Option>
            </Select> : ""}

            <input
              type="file"
              onChange={(e) => handleUpload(e.target.files[0])}
              style={{ display: "none" }}
              id="upload-avatar"
              accept="image/*"
            />
          </Space>
        </Card>
        <Divider />
        <Card style={styles.card}>
          <p style={styles.detailItem}>
            <span style={styles.detailTitle}>Full Name:</span> {userInfo && `${userInfo.Lastname} ${userInfo.Firstname}`}
          </p>
          <p style={styles.detailItem}>
            <span style={styles.detailTitle}>Email:</span> {userInfo && userInfo.email}
          </p>
          <p style={styles.detailItem}>
            <span style={styles.detailTitle}>Number:</span> {userInfo && userInfo.phone}
          </p>
          <p style={styles.detailItem}>
            <span style={styles.detailTitle}>Role:</span> {userInfo && (userInfo.isAdmin ? "Admin" : "User")}
          </p>
          <p style={styles.detailItem}>
          <span style={styles.detailTitle}>adress:</span> {userInfo && userInfo.address}
          </p>
          
          <p style={styles.detailItem}>
            <span style={styles.detailTitle}>Birthday:</span> {userInfo && userInfo.birthday}
          </p>
          
          <Link to={`/stream?call_id=${callid}&call_type=default`}>
            <Button style={styles.button} onClick={()=>handleCallID(callid)}>
          {userInfo && userInfo.isAdmin ? 'Join Call' : 'Create Call'}
            </Button>
</Link>

        </Card>
        <Divider />
        <Card style={styles.chartCard}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              Loading chart...
            </div>
          ) : (
            <LineChart
              width={730}
              height={250}
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          )}
        </Card>
      </Card>
    </Spin>
  );
};

export default MyProfilePage;
