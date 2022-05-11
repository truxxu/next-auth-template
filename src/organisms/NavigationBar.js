import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const NavigationBar = () => {
  const { status } = useSession();

  const handleLogout = () => {
    console.log("logged out!");
    signOut();
  };

  return (
    <Navbar bg="light" expand="lg" className="p-3">
      <Navbar.Brand href="/">Dashboard</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {status === "authenticated" && (
            <Link href="/profile" className="nav-link">
              Profile
            </Link>
          )}
        </Nav>
        <Nav className="justify-content-end">
          {status === "authenticated" ? (
            <Button variant="outline-danger" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Link href="/auth" className="nav-link p-0">
              <Button variant="outline-success">Login</Button>
            </Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export { NavigationBar };
