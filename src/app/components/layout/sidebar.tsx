'use client';
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Box, Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AddBoxIcon from "@mui/icons-material/AddBox";

const drawerWidth = 240;

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { text: "Dashboard", href: "/dashboard", icon: <DashboardIcon /> },
    { text: "Products", href: "/dashboard/products", icon: <InventoryIcon /> },
    { text: "Add Product", href: "/dashboard/products/new", icon: <AddBoxIcon /> },
    { text: "Orders", href: "/dashboard/orders", icon: <ShoppingBagIcon /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    document.cookie = "adminToken=; path=/; max-age=0";
    router.push("/admin-login");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ flexGrow: 1 }}>
        <List>
          {navItems.map(({ text, href, icon }) => (
            <Link key={text} href={href} passHref>
              <ListItem
                component="a"
                sx={{
                  cursor: "pointer",
                  backgroundColor: pathname === href ? "rgba(0, 0, 0, 0.12)" : "transparent",
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.08)" },
                }}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>

      {/* Logout at bottom */}
      <Divider />
      <List>
        <ListItem
          component="a"
          onClick={handleLogout}
          sx={{
            cursor: "pointer",
            color: "#ef4444",
            "&:hover": { backgroundColor: "#fef2f2" },
          }}
        >
          <ListItemIcon><LogoutIcon sx={{ color: "#ef4444" }} /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;