'use client';

import dynamic from "next/dynamic";

const ResponsiveAppBar = dynamic(() => import("./navbar"), { ssr: false });

export default function NavbarClientWrapper() {
  return <ResponsiveAppBar />;
}
