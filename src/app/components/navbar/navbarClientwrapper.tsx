'use client';

import dynamic from "next/dynamic";
import Box from "@mui/material/Box";

const ResponsiveAppBar = dynamic(() => import("./navbar"), {
  ssr: false,
  loading: () => (
    <Box sx={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      height: "64px",
      backgroundColor: "#1976d2",
      zIndex: 1100,
    }} />
  ),
});

export default function NavbarClientWrapper() {
  return <ResponsiveAppBar />;
}