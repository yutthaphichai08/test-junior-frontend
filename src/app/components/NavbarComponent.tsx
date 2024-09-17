"use client";

import Link from "next/link";
import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const NavbarComponent = () => {
  return (
    <div style={{ marginBottom: "80px" }}>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand as={Link} href="/blogs" className="ps-3">
          Home
        </Navbar.Brand>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
