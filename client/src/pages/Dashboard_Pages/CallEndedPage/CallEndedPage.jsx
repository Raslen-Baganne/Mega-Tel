import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const CallEndedPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); // Adjust the path as needed for your routing setup
  };

  return (
    <Result
      status="success"
      title="Thank you for the call!"
      subTitle="Your call has ended successfully. We hope to see you again soon."
      extra={[
        <Button type="primary" key="home" onClick={handleGoHome}>
          Return to Home
        </Button>,
      ]}
    />
  );
};

export default CallEndedPage;

