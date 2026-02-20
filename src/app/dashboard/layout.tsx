'use client';
import React from 'react';
import Sidebar from '../components/layout/sidebar';
import { Box, Toolbar } from '@mui/material';
import Header from '../components/layout/header';
import { redirect } from 'next/navigation';

const drawerWidth = 240;

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const token = typeof window !== 'undefined'? localStorage.getItem("adminToken") : null;
  
  if(!token) {
    redirect('/login')
  }



  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: `calc(100% - ${drawerWidth}px)` }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
