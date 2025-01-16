import React from 'react';
import styles from "./index.module.css";
import { Link } from 'react-router-dom';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

library.add(faFacebookF, faTwitter, faLinkedinIn, faInstagram);


export const Footer: React.FC = ()=> {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Logo and Tagline */}
                <div className={styles.brand} data-aos="fade-up">
                    <h2 className={styles.logo}>CoAuthor</h2>
                    <p className={styles.tagline}>
                        Empowering seamless collaboration and innovation.
                    </p>
                </div>

                {/* Navigation Links */}
                <div className={styles.linksContainer} data-aos="fade-up" data-aos-delay="200">
                    <div className={styles.links}>
                        <h3 className={styles.linkHeading}>Quick Links</h3>
                        <ul>
                            <li><Link to="#features">Features</Link></li>
                            <li><Link to="#pricing">Pricing</Link></li>
                            <li><Link to="#testimonials">Testimonials</Link></li>
                            <li><Link to="#contact">Contact</Link></li>
                        </ul>
                    </div>

                    <div className={styles.links}>
                        <h3 className={styles.linkHeading}>Resources</h3>
                        <ul>
                            <li><Link to="#blog">Blog</Link></li>
                            <li><Link to="#faq">FAQ</Link></li>
                            <li><Link to="#support">Support</Link></li>
                            <li><Link to="#privacy">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div className={styles.links}>
                        <h3 className={styles.linkHeading}>Contact</h3>
                        <ul>
                            <li>Email: support@coauthor.com</li>
                            <li>Phone: +123-456-7890</li>
                            <li>Location: Abuja, Nigeria</li>
                            
                        </ul>
                    </div>
                </div>

                {/* Social Icons */}
                <div className={styles.socials} data-aos="fade-up" data-aos-delay="400">
                    <h3 className={styles.socialHeading}>Follow Us</h3>
                    <div className={styles.socialIcons}>
                        <Link to="https://facebook.com" target='_blank' rel='noopener noreferrer' aria-label='facebook'>
                            <FontAwesomeIcon icon={faFacebookF} />
                        </Link>
                        <Link to="https://x.com" rel='noopener noreferrer' aria-label='Twitter'>
                            <FontAwesomeIcon icon={faTwitter} />
                        </Link>
                        <Link to="https://linkedin.com" rel='noopener noreferrer' aria-label='linkedin'>
                            <FontAwesomeIcon icon={faLinkedinIn} />
                        </Link>
                        <Link to="https://instagram.com" rel='noopener noreferrer' aria-label='linkedin'>
                            <FontAwesomeIcon icon={faInstagram} />
                        </Link>
                    </div>
                    
                </div>
            </div>

            <div className={styles.footerBottom}>
                <p>&copy; {new Date().getFullYear()} CoAuthor. All rights reserved.</p>
            </div>
        </footer>
    )
}