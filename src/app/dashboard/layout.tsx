'use client';
import React from 'react';
import Sidebar from '../components/layout/sidebar';
import { Box, Toolbar } from '@mui/material';
import Header from '../components/layout/header';
import { redirect } from 'next/navigation';
import { Toaster } from "react-hot-toast";

const drawerWidth = 240;

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const token = typeof window !== 'undefined'? localStorage.getItem("adminToken") : null;
  
  if(!token) {
    redirect('/admin-login')
  }



  return (
    <Box sx={{ display: "flex" }}>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '10px',
            fontFamily: 'inherit',
            fontSize: '14px',
          },
          success: {
            style: { background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0' },
            iconTheme: { primary: '#22c55e', secondary: '#fff' },
          },
          error: {
            style: { background: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca' },
            iconTheme: { primary: '#ef4444', secondary: '#fff' },
          },
        }}
      />
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
