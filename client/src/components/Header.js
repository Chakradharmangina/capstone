import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../styles/Header.css";

import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      setAuth({
        ROLE: [""],
        STATUS: false,
        ACCESS_TOKEN: "",
      });
    }
  };

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      setAuth({
        ROLE: [""],
        STATUS: false,
        ACCESS_TOKEN: "",
      });
      localStorage.removeItem("user-auth");
    }
  };
  return (
    <nav className="navbar sticky-top navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link to="/" cLinkssName="navbar-brand" href="#">
          ShopForHome
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link active"
                aria-current="page"
                href="#"
              >
                Home
              </Link>
            </li>
            {!auth.STATUS && (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link" href="#">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link" href="#">
                    Register
                  </Link>
                </li>

                {/* <div className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Admin
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/adminLogin" className="dropdown-item" href="#">
                        Admin Login
                      </Link>
                    </li>
                    <li>
                      <a
                        onClick={handleLogout}
                        className="dropdown-item"
                        href="#"
                      >
                        Logout
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </div> */}
              </>
            )}
            {auth.STATUS && auth.ROLE[0] === "user" && (
              <>
                <li className="nav-item">
                  <Link to="/products" className="nav-link">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/wishlist" className="nav-link">
                    Wishlist
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/cart" className="nav-link">
                    Cart
                  </Link>
                </li>
              </>
            )}
          </ul>
          {auth.STATUS && (
            <button type="button" class="btn btn-info" onClick={logout}>
              Logout
            </button>
          )}
          {!auth.STATUS && (
            <button type="button" class="btn btn-info">
              <Link to="/adminLogin" className="dropdown-item" href="#">
                Admin Login
              </Link>
            </button>
          )}
          {auth.STATUS && auth.ROLE[0] === "admin" && (
            <button
              type="button"
              class="btn btn-info"
              onClick={() => {
                if (auth.STATUS && auth.ROLE[0] === "admin") {
                  navigate("/admin");
                } else {
                  navigate("/adminLogin");
                }
              }}
            >
              admin
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
