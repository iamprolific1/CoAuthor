import React from "react";
import { Link } from "react-router-dom";
import styles from './index.module.css';
import SignupIllustration from '../../assets/signup_illustration.svg';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";


library.add(faGoogle, faFacebookF);

const Signup: React.FC = ()=> {
    return (
        <div className={styles.loginPage}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.illustration}>
                        <img src={SignupIllustration} alt="Signup Illustration SVG" />
                    </div>
                    <div className={styles.formContainer}>
                        <h2>Join CoAuthor!</h2>
                        <form className={styles.form}>
                                <input type='text' placeholder="Full Name" required />
                                <input type='email' placeholder="Email" required />
                                <input type='password' placeholder="Password" required />
                                <button type="submit" className={styles.primaryButton}>
                                    Sign Up
                                </button>
                                <div className={styles.oauthButtons}>
                                    
                                    <button className={styles.oauthButton}>
                                        <FontAwesomeIcon icon={faGoogle} style={{ fontSize: 18 }} />
                                        Continue with Google
                                    </button>
                                    <button className={styles.oauthButton}>
                                        <FontAwesomeIcon icon={faFacebookF} style={{ fontSize: 18 }} />
                                        Continue with Facebook
                                    </button>
                                </div>
                                <div className={styles.switchAuth}>
                                    <p>Already have an account? <span><Link to="/login">Login</Link></span></p>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;