"use client";

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: theme.zIndex.drawer + 1, // ✅ value, not function
        backgroundColor: "#1976d2",
      }}
    >
      <Toolbar>
        {onMenuClick && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 2, display: { sm: "none" } }}
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          Footies Dashboard
        </Typography>

        <Box>
          <Avatar alt="Admin User" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
