"use client";

import dynamic from "next/dynamic";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

const ResponsiveAppBar = dynamic(() => import("./navbar"), {
  ssr: false,
  loading: () => (
    <AppBar position="fixed">
      <Toolbar>
        <Box sx={{ width: 70, height: 50 }} /> {/* exact same size as logo */}
      </Toolbar>
    </AppBar>
  ),
});

export default function NavbarClientWrapper() {
  return <ResponsiveAppBar />;
}
