import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
            <div className="container">
                <a className="navbar-brand fw-bold fs-4" href="#">FashionMart</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home <span className="sr-only"></span></NavLink>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/product">Products</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/about">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/contact">Contact</a>
                        </li>
                    </ul>
                </div>
                <Link className="btn btn-outline-dark" to="/login">
                    <i className="fa fa-sign-in me-1"></i>Login
                </Link>
                <Link className="btn btn-outline-dark ms-2" to="/api">
                    <i className="fa fa-user-plus me-1"></i>Register
                </Link>
                <Link className="btn btn-outline-dark ms-2" to="/api">
                    <i className="fa fa-shopping-cart me-1"></i>Cart
                </Link>
            </div>
        </nav>
    )
}

export default Navbar; 