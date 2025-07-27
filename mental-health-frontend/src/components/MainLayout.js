import React from 'react';
import SideDrawer from './SideDrawer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => (
  <div style={{ display: 'flex', minHeight: '100vh' }}>
    <SideDrawer />
    <div style={{ flex: 1, width: '100%' }}>
      <Outlet />
    </div>
  </div>
);

export default MainLayout;