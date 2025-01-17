import React from "react";
import { Link } from "react-router-dom";
import styles from './index.module.css';
import ForgotPasswordIllustration from '../../assets/forgot_password_illustration.svg';

const ForgotPassword: React.FC = ()=> {
    return (
        <div className={styles.loginPage}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.illustration}>
                        <img src={ForgotPasswordIllustration} alt="Login Illustration SVG" />
                    </div>
                    <div className={styles.formContainer}>
                        <h2>Reset Password</h2>
                        <form className={styles.form}>
                                <input type='email' placeholder="Email" required />
                                <button type="submit" className={styles.primaryButton}>
                                    Send Reset Link
                                </button>
                                <div className={styles.switchAuth}>
                                    <p>Remember Your Password? <span><Link to="/login">Login</Link></span></p>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;