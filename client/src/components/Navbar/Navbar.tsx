import React from "react";
import styles from "./navbar.module.css";
import { Link } from "react-router-dom";
// import Button from "react-bootstrap/Button";

export const NavBar: React.FC = ()=> {
    return (
        <header className={styles.navbar}>
            <div className={styles.container}>
                <Link to="/" className={styles.logo}>CoAuthor</Link>
                <nav className={styles['nav-links']}>
                    <Link to="#home">Home</Link>
                    <Link to="#features">Features</Link>
                    <Link to="#pricing">Pricing</Link>
                    <Link to="#about">About</Link>
                    <Link to="#contact">Contact</Link>
                </nav>
                <div className={styles['auth-btns']}>
                    <Link to="#login" className={styles["login-btn"]}>Login</Link>
                    <Link to="#register" className={styles["signup-btn"]}>Get Started</Link>
                </div>
            </div>
        </header>
    )
}