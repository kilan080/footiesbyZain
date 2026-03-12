
import Bigone from "../components/bigone/bigone";
import Tabs from "../components/tabs/tabs";
import Testimonials from "../components/testimonials/testimonials";
import Footer from "../components/footer/footer";
import NavbarClientWrapper from "../components/navbar/navbarClientwrapper";
import { Metadata } from "next";
import { Suspense } from "react";


export const metadata: Metadata = {
  title: "Home",
  description: "Discover the latest slides, shoes and sneakers at Footies by Zain.",
};

export default function Home() {
 
  return (
    <>
      <NavbarClientWrapper />
        <main>
          <Bigone />
          <Suspense fallback={null}>
          <Tabs />
          </Suspense>
          <Testimonials />
        </main>
      <Footer />
    </>
  )
}

