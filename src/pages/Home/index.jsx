import { useNavigate } from 'react-router-dom'
import styles from './Home.module.css'
import logo from '../../assets/git.jpg'

function Home() {
    const navigate = useNavigate()

    return (
        <div className={styles.pageWrapper}>

            {/* Pattern background */}
            <div className={styles.patternBg}>
                <svg className={styles.cubeSvg} xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="cubes" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                            <polygon points="40,5 75,25 75,55 40,75 5,55 5,25" fill="none" stroke="#00d4d433" strokeWidth="1"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#cubes)"/>
                </svg>
            </div>

            {/* Page content */}
            <div className={styles.content}>

                {/* Navbar */}
                <div className={styles.navbar}>
                    <div className={styles.logogrp}>
                        <img className={styles.logoimg} src={logo} alt="logo" />
                        <h1 className={styles.logo}>DevFlow</h1>
                    </div>
                    <div className={styles.nav}>
                        <button className={styles.loginbtn} onClick={() => navigate('/login')}>Login</button>
                        <button className={styles.loginbtn} onClick={() => navigate('/signup')}>SignUp</button>
                    </div>
                </div>

                {/* Hero */}
                <p className={styles.mainPunch} style={{marginTop: '20%'}}>Ship faster. Collaborate smarter.</p>
                <p className={styles.mainPunch}>The all-in-one platform for code review, <br/>
                    CI/CD, and team collaboration.</p>

                {/* Feature Cards */}
                <div className={styles.featureGrid}>
                    <div className={styles.card}>
                        <div className={styles.align}>
                            <div className={styles.red}></div>
                            <div className={styles.yellow}></div>
                            <div className={styles.green}></div>
                        </div>
                        <h2>🔀 Repository Management</h2>
                        <p>Create, manage and collaborate on code. Branch, commit and push — all in one place.</p>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.align}>
                            <div className={styles.red}></div>
                            <div className={styles.yellow}></div>
                            <div className={styles.green}></div>
                        </div>
                        <h2>⚡ CI/CD Pipelines</h2>
                        <p>Automate your builds and deployments. Every push triggers your pipeline instantly.</p>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.align}>
                            <div className={styles.red}></div>
                            <div className={styles.yellow}></div>
                            <div className={styles.green}></div>
                        </div>
                        <h2>🔍 Code Review</h2>
                        <p>Review pull requests, leave inline comments and approve changes before they ship.</p>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.align}>
                            <div className={styles.red}></div>
                            <div className={styles.yellow}></div>
                            <div className={styles.green}></div>
                        </div>
                        <h2>💬 Team Chat</h2>
                        <p>Real-time messaging built into your workflow. No more switching between tools.</p>
                    </div>
                </div>

                {/* How it works */}
                <div className={styles.stepsSection}>
                    <p className={styles.punchHeader}>How it works</p>
                    <div className={styles.stepsGrid}>
                        <div className={styles.step}>
                            <span className={styles.stepNumber}>01</span>
                            <h3>Create a Repository</h3>
                            <p>Push your code and invite your team.</p>
                        </div>
                        <div className={styles.step}>
                            <span className={styles.stepNumber}>02</span>
                            <h3>Set Up Your Pipeline</h3>
                            <p>Define your build, test and deploy steps.</p>
                        </div>
                        <div className={styles.step}>
                            <span className={styles.stepNumber}>03</span>
                            <h3>Review & Ship</h3>
                            <p>Review code, merge with confidence, deploy automatically.</p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className={styles.ctaSection}>
                    <h2 className={styles.ctaTitle}>Ready to build something great?</h2>
                    <p className={styles.ctaSubtitle}>Start for free — no credit card required.</p>
                    <button className={styles.ctaBtn} onClick={() => navigate('/Dashboard')}>
                        Go To DashBoard
                    </button>
                </div>

                {/* Footer */}
                <div className={styles.footer}>
                    <p>DevFlow · Repositories · Pipelines · Code Review · Chat</p>
                    <p>© 2025 DevFlow. All rights reserved.</p>
                </div>

            </div>
        </div>
    )
}

export default Home