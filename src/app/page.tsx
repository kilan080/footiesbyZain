
import Navbar from "./components/navbar/navbar";
import Bigone from "./components/bigone/bigone";
import Tabs from "./components/tabs/tabs";
import Testimonials from "./components/testimonials/testimonials";
import NavbarClientWrapper from "./components/navbar/navbarClientwrapper";


export default function Home() {
 
  return (
    <>
      <NavbarClientWrapper />
      <Navbar />
      <main>
        <Bigone />
        <Tabs />
        {/* <Collection /> */}
        <Testimonials />
         {/* <Footer /> */}
      </main>
    </>
  )
}

