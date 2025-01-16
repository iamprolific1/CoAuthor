import React, { useState } from "react";
import styles from "./navbar.module.css";
import { Link } from "react-router-dom";
// import Button from "react-bootstrap/Button";

export const NavBar: React.FC = ()=> {

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const toggleMenu = ()=> {
        setIsMenuOpen((prev)=> !prev)
    }
    
    return (
        <header className={styles.navbar}>
            <div className={styles.container}>
                <Link to="/" className={styles.logo}>CoAuthor</Link>

                <div className={`${styles.menu} ${isMenuOpen ? styles.open : ""}`}>

                    <nav className={`${styles['nav-links']} ${isMenuOpen ? styles.open : ''}`}>
                        <Link to="#home">Home</Link>
                        <Link to="#features">Features</Link>
                        <Link to="#pricing">Pricing</Link>
                        <Link to="#about">About</Link>
                        <Link to="#contact">Contact</Link>
                    </nav>

                    <div className={`${styles['auth-btns']} ${isMenuOpen ? styles.open : ""}`}>
                        <Link to="#login" className={styles["login-btn"]}>Login</Link>
                        <Link to="#register" className={styles["signup-btn"]}>Get Started</Link>
                    </div>
                </div>

                <button className={`${styles["hamburger"]} ${isMenuOpen ? styles.open : ""}`} aria-label="Toggle menu" onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </header>
    )
}