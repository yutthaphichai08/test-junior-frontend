"use client";

import Link from "next/link";
import React from "react";
import { Navbar } from "react-bootstrap";
import Swal from "sweetalert2";

const NavbarComponent = () => {
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    });

    if (result.isConfirmed) {
      sessionStorage.clear();
      window.location.href = "/";
    }
  };

  return (
    <div style={{ marginBottom: "80px" }}>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand as={Link} href="/blogs" className="ps-3">
          Home
        </Navbar.Brand>
        <div
          className="ms-auto d-flex align-items-center"
          style={{ marginRight: "16px" }}
        >
          <button
            type="button"
            className="btn btn-light"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
