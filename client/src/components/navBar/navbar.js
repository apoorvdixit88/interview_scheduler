import React from "react";
import { Container, Navbar, NavDropdown, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark d-flex flex-row justify-content-end">
        <Link className="navbar-brand px-4 fw-bold me-auto" to="/">
          INTERVIEW SCHEDULER
        </Link>
        <Link className="nav-link text-white rounded fs-6 py-.2" to="/create">
          CREATE INTERVIEW
        </Link>
        <Link className="nav-link text-white rounded fs-6 py-.2" to="/update">
          UPDATE INTERVIEW
        </Link>
      </nav>
    </div>
  );
};

export default navbar;
