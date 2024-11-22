import React, { memo, useState } from 'react';
import { Layout } from 'antd';
import Sidebar from '../sections/sidebar/Sidebar';
import DashboardFooter from '../sections/dashboard_footer/Dashboard_Footer';
import { Outlet } from 'react-router-dom';
import Dash_Header from '../sections/dashboard_header/Dash_Header';

const { Header, Content } = Layout;

// Memoizing Sidebar component
const MemoizedSidebar = memo(Sidebar);
// Memoizing DashboardFooter component
const MemoizedDashboardFooter = memo(DashboardFooter);
// Memoizing Dash_Header component
const MemoizedDashHeader = memo(Dash_Header);

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <MemoizedSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout
      
        style={{
          marginLeft: collapsed ? 80 : 220, // Adjust based on sidebar width
          transition: 'margin-left 0.2s',
        }}
      >
        <MemoizedDashHeader />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Outlet /> {/* Nested routes will be rendered here */}
          </div>
        </Content>
        <MemoizedDashboardFooter />
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
