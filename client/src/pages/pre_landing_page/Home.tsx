import { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import { NavBar } from "../../components/Navbar/Navbar";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import HeroImageSVG from "../../assets/hero-image.svg";
import AIAssistance from "../../assets/artificial-intelligence.svg";
import RealtimeCollaboration from "../../assets/real-time-collaboration.svg";
import Secure from "../../assets/secure.svg";
import Integration from "../../assets/integration.svg";
import Templates from "../../assets/templates.svg";
import VersionControl from "../../assets/version-control.svg";
import Profile1 from "../../assets/profile-20.jpg";
import Profile2 from "../../assets/profile-11.jpg";
import Profile3 from "../../assets/profile-3.jpg";
import Profile4 from "../../assets/profile-15.jpg";
import Profile5 from "../../assets/profile-8.jpg";
import Profile6 from "../../assets/profile-18.jpg";
import Rating from "@mui/material/Rating";
import { Footer } from '../../components/Footer/Footer';


const testimonials = [
    {
        name: "Alice Johnson",
        role: "Content Creator at XYZ",
        text: "CoAuthor has completely transformed how I collaborated with my team. The AI-driven features are a game changer!",
        photo: Profile1,
        rating: 2.5
    },
    {
        name: "Micheal Lee",
        role: "Freelance Writer",
        text: "The intuitive design and real-time collaboration make my workflow seamless and efficient.",
        photo: Profile2,
        rating: 3
    },
    {
        name: "Sophia Brown",
        role: "Product Manager at ABC",
        text: "CoAuthor secure and private platform gives me peace of mind when managing sensitive documents.",
        photo: Profile3,
        rating: 3.6
    },
    {
        name: "James Carter",
        role: "Project Coordinator at DeltaTech",
        text: "CoAuthor has streamlined our document review process, saving us countless hours every week",
        photo: Profile4,
        rating: 4.2
    },
    {
        name: "Emma Wilson",
        role: "Editor at Creative Minds",
        text: "The AI-powered suggestions are spot-on, and the collaborating tools make editing a breeze!",
        photo: Profile5,
        rating: 4.8
    },
    {
        name: "William Martinez",
        role: "Research Analyst at InnovateNow",
        text: "I appreciate how CoAuthor integrates seamlessly with our workflow. It's a must-have for any team!",
        photo: Profile6,
        rating: 5
    },
]
const LandingPage = () => {

    useEffect(()=> {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: false
        });

        const interval = setInterval(()=> {
            const carousel = document.querySelector(`.${styles.carousel}`);
            if(carousel) {
                carousel.scrollLeft += 320;

                if(carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
                    carousel.scrollLeft = 0;
                }
            }
        }, 3000)

        return ()=> clearInterval(interval)
    }, [])

    return (
        <main>
            <NavBar />
            <section className={styles["hero-section"]}>
                <div className={styles["container"]}>
                    <div className={styles["hero-content"]}>
                        <h1 className={styles["hero-title"]}>
                            Collaborate Smarter, Edit Faster
                        </h1>
                        <p className={styles["hero-subtitle"]}>
                            Experience seamless real-time collaboration with our advanced
                            document editor. Designed for teams to work together
                            effortlessly.
                        </p>
                        <div className={styles["hero-buttons"]}>
                            <Link to="#features">
                            <button
                                className={`${styles["btn"]} ${styles["primary-btn"]}`}
                            >
                                Get Started
                            </button>
                            </Link>
                            <Link to="#pricing">
                            <button
                                className={`${styles["btn"]} ${styles["secondary-btn"]}`}
                            >
                                Explore Plans
                            </button>
                            </Link>
                        </div>
                    </div>

                    <div className={styles["hero-image"]}>
                        <img src={HeroImageSVG} alt="hero-image" className={styles['svg-image']} />
                    </div>
                </div>
            </section>

            <section className={styles['features-overview']} id="features">
                <div className={styles['container']}>
                    <h2 className={styles['section-title']}>Why Choose CoAuthor?</h2>
                    <p className={styles['section-subtitle']}>Revolutionizing collaboration with innovative tools tailored for modern teams.</p>

                    <div className={styles['features-grid']}>
                        <div className={styles['feature-item']} data-aos="fade-up">
                            <img src={AIAssistance} alt="AI Assistance" className={styles['feature-icon']} />
                            <h3 className={styles['feature-title']}>AI-Driven Assistance</h3>
                            <p className={styles['feature-description']}>Smart suggestions for content, grammar, and formatting to supercharge your productivity.</p>
                        </div>

                        <div className={styles['feature-item']} data-aos="fade-up">
                            <img src={RealtimeCollaboration} alt="Real-time Collaboration" className={styles['feature-icon']} />
                            <h3 className={styles['feature-title']}>Real-Time Collaboration</h3>
                            <p className={styles['feature-description']}>Work together seamlessly with instant updates and zero conflicts.</p>
                        </div>

                        <div className={styles['feature-item']} data-aos="fade-up">
                            <img src={Secure} alt="Secure & Private" className={styles['feature-icon']} />
                            <h3 className={styles['feature-title']}>Secure & Private</h3>
                            <p className={styles['feature-description']}>End-to-end ecryption and decentralized storage to protect your data.</p>
                        </div>

                        <div className={styles['feature-item']} data-aos="fade-up" data-aos-delay="200">
                            <img src={Integration} alt="integrations" className={styles['feature-icon']} />
                            <h3 className={styles['feature-title']}>Powerful Integrations</h3>
                            <p className={styles['feature-description']}>Connect with your favorite tools like Slack, Jira, and Salesforce.</p>
                        </div>

                        <div className={styles['feature-item']} data-aos="fade-up" data-aos-delay="200">
                            <img src={Templates} alt="templates" className={styles['feature-icon']} />
                            <h3 className={styles['feature-title']}>Templates Marketplace</h3>
                            <p className={styles['feature-description']}>Access or create templates for every industry and use case.</p>
                        </div>

                        <div className={styles['feature-item']} data-aos="fade-up" data-aos-delay="200">
                            <img src={VersionControl} alt="version-control" className={styles['feature-icon']} />
                            <h3 className={styles['feature-title']}>Immutable Version Control</h3>
                            <p className={styles['feature-description']}>Blockchain-powered version history for complete transparency.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles['testimonial-section']} id="testimonials">
                <h2 data-aos="fade-up">What Our Users Say</h2>
                <p data-aos="fade-up" className={styles['tagline']}>Hear from our happy users who trust CoAuthor for their collaboration needs.</p>
                <div className={styles['carousel']}>
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className={styles.card}
                            data-aos="fade-up"
                            data-aos-delay={index * 200}
                        >
                            <img 
                                src={testimonial.photo} 
                                alt={testimonial.name}
                                className={styles.photo} 
                            />
                            <h3 className={styles.name}>{testimonial.name}</h3>
                            <p className={styles.role}>{testimonial.role}</p>
                            <div className={styles.rating}>
                                <Rating name="half-rating-read" defaultValue={testimonial.rating} precision={0.5} readOnly sx={{ fontSize: 18 }} />
                            </div>
                            <p className={styles.text}>{testimonial.text}</p>

    
                        </div>
                    ))}
                </div>
            </section>

            <section className={styles['pricing-section']}>
                <h3 className={styles.title}>Choose Your Plan</h3>
                <p className={styles.subtitle}>Start with the Free Plan or upgrade for more features.</p>

                <div className={styles.pricingContainer}>
                    {/* Free Plan */}
                    <div className={`${styles.plan} ${styles.free}`} data-aos="fade-up">
                        <h3 className={styles.planTitle}>Free</h3>
                        <p className={styles.price}>$0 <span>/month</span></p>
                        <ul className={styles.features}>
                            <li>1 active project</li>
                            <li>Basic collaboration tools</li>
                            <li>Email support</li>
                            <li>500MB cloud storage</li>
                        </ul>
                        <button className={styles.button}>Get Started</button>
                    </div>
                    {/* Basic Plan */}
                    <div className={`${styles.plan} ${styles.basic}`} data-aos="fade-up" data-aos-delay="200">
                        <h3 className={styles.planTitle}>Basic</h3>
                        <p className={styles.price}>$9 <span>/month</span></p>
                        <ul className={styles.features}>
                            <li>Up to 5 projects</li>
                            <li>Basic collaboration tools</li>
                            <li>Email support</li>
                            <li>1GB cloud storage</li>
                        </ul>
                        <button className={styles.button}>Get Started</button>
                    </div>
                    {/* Pro Plan */}
                    <div className={`${styles.plan} ${styles.free}`} data-aos="fade-up" data-aos-delay="400">
                        <h3 className={styles.planTitle}>Pro</h3>
                        <p className={styles.price}>$29 <span>/month</span></p>
                        <ul className={styles.features}>
                            <li>Unlimited projects</li>
                            <li>Advanced collaboration tools</li>
                            <li>Priority support</li>
                            <li>10GB cloud storage</li>
                        </ul>
                        <button className={styles.button}>Try Pro</button>
                    </div>
                    {/* Enterprise Plan */}
                    <div className={`${styles.plan} ${styles.free}`} data-aos="fade-up" data-aos-delay="600">
                        <h3 className={styles.planTitle}>Enterprise</h3>
                        <p className={styles.price}>Custom <span>/month</span></p>
                        <ul className={styles.features}>
                            <li>Custom projects and storage</li>
                            <li>Dedicated account manager</li>
                            <li>24/7 support</li>
                            <li>Team onboarding and training</li>
                        </ul>
                        <button className={styles.button}>Contact Us</button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default LandingPage;
