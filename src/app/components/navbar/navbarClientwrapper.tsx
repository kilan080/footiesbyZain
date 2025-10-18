'use client';

import dynamic from "next/dynamic";

// Dynamically import the navbar with SSR disabled
const ResponsiveAppBar = dynamic(() => import("./navbar"), { ssr: false });

export default function NavbarClientWrapper() {
  return <ResponsiveAppBar />;
}
