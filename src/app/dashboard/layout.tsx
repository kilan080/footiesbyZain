'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/layout/sidebar';
import { Box, Toolbar } from '@mui/material';
import Header from '../components/layout/header';

const drawerWidth = 240;

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if(!token) {
      router.push('/login')
    }
  }, [router]);

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
