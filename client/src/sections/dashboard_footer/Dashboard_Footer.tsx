import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const Dashboard_Footer: React.FC = () => {
  return (
    <Footer style={{ 
      textAlign: 'center', 
      bottom: 0, 
      left:0,
      width: '100%', 
      zIndex: 1000 
    }}>
      Mega-Tel ©{new Date().getFullYear()}
    </Footer>
  );
};


export default Dashboard_Footer;
