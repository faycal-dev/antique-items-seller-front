import { useState } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import SideBar from "../components/SideBare/SideBar";

const Layout = ({ title, content, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div
      style={{
        backgroundColor: "#f6f9fc",
        minHeight: "100vh",
      }}
    >
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
      </Head>
      <Navbar toggle={toggle} />
      <SideBar isOpen={isOpen} toggle={toggle} />
      <div className="mt-3 pb-4" style={{overflowX: "hidden"}}>{children}</div>
    </div>
  );
};

Layout.defaultProps = {
  title: "Antique",
  content: "The landing page for the antique seller website",
};

export default Layout;
