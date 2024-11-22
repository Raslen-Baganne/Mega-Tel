import React, { useState } from 'react';
import { Upload, Button, Input, Space, Row, Col, Typography, Card } from 'antd';
import { UploadOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Title } = Typography;

const MyPage = () => {
  const [items, setItems] = useState([{ text: '', file: null, preview: null, fileType: '' }]);

  const addItem = () => {
    setItems([...items, { text: '', file: null, preview: null, fileType: '' }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((item, i) => i !== index));
  };

  const handleUpload = (file, index) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setItems(items.map((item, i) => 
        i === index ? { ...item, preview: reader.result, fileType: file.type } : item
      ));
    };
    reader.readAsDataURL(file);
    return false; // prevent upload
  };

  const renderPreview = (item) => {
    if (item.fileType.includes('image')) {
      return <img src={item.preview} alt="preview" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />;
    } else if (item.fileType.includes('video')) {
      return <video src={item.preview} controls style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />;
    } else if (item.fileType === 'application/pdf') {
      return (
        <embed
          src={item.preview}
          type="application/pdf"
          style={{ width: '100%', height: '500px', borderRadius: '8px', marginTop: '10px' }}
        />
      );
    } else {
      return <p>No preview available</p>;
    }
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#f0f2f5' }}>
      <Title level={1} style={{ textAlign: 'center', marginBottom: '40px' }}>Formation Page</Title>

      {items.map((item, index) => (
        <Card
          key={index}
          style={{ marginBottom: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <Title level={4}>Add Text</Title>
            <TextArea
              placeholder="Add text here"
              style={{ minHeight: '100px', borderRadius: '8px' }}
              value={item.text}
              onChange={(e) => setItems(items.map((itm, i) => i === index ? { ...itm, text: e.target.value } : itm))}
            />

            <Title level={4}>Upload Image/Video/File</Title>
            <Upload
              beforeUpload={(file) => handleUpload(file, index)}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>

            {item.preview && renderPreview(item)}

            <Button
              icon={<MinusOutlined />}
              onClick={() => removeItem(index)}
              danger
              style={{ marginTop: '10px', borderRadius: '8px' }}
            >
              Remove
            </Button>
          </Space>
        </Card>
      ))}

      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col>
          <Button icon={<PlusOutlined />} onClick={addItem} type="primary" size="large" style={{ borderRadius: '8px' }}>
            Add
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default MyPage;
