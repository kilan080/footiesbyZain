'use client';
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  // Define navigation links
  const navItems = [
    { text: "Dashboard", href: "/dashboard", icon: <DashboardIcon /> },
    { text: "Products", href: "/dashboard/products", icon: <InventoryIcon /> },
    { text: "Logout", href: "/logout", icon: <LogoutIcon /> },
    { text: "Add Product", href: "/dashboard/products/new" },
    { text: "Orders", href: "/dashboard/orders" },

  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <List>
        {navItems.map(({ text, href, icon }) => (
          <Link key={text} href={href} passHref>
            <ListItem
              component="a"
              sx={{
                cursor: "pointer",
                backgroundColor: pathname === href ? "rgba(0, 0, 0, 0.12)" : "transparent",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.08)",
                },
              }}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
