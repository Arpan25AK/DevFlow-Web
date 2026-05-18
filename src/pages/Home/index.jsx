import { useEffect, useRef } from 'react'
import styles from './Home.module.css'
import logo from '../../assets/git.jpg'

function Home() {
    const vantaRef = useRef(null)
    const vantaEffect = useRef(null)

    useEffect(() => {
        import('three').then((THREE) => {
            window.THREE = THREE
            import('vanta/dist/vanta.net.min').then(() => {
                vantaEffect.current = window.VANTA.NET({
                    el: vantaRef.current,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200,
                    minWidth: 200,
                    scale: 1.0,
                    scaleMobile: 1.0,
                    backgroundColor: 0x111113,
                    color: 0xff3f81,
                    points: 10,
                    maxDistance: 20,
                    spacing: 15,
                })
            }).catch(err => console.error('Vanta error:', err))
        }).catch(err => console.error('THREE error:', err))

        return () => {
            if (vantaEffect.current) vantaEffect.current.destroy()
        }
    }, [])





    return (
        <div ref={vantaRef} className={styles.vantaBg}>

            <div className={styles.content}>


                <div >

                    <div className={styles.navbar}>
                        <div className={styles.logogrp}>
                        <img className={styles.logoimg} src={logo} alt="logo" />
                        <h1 className={styles.logo}>DevFlow</h1>
                        </div>
                        <div className={styles.nav}>
                            <button className={styles.loginbtn}>Login</button>
                            <button className={styles.loginbtn}>SignUp</button>
                        </div>
                    </div>

                    <p className={styles.mainPunch} style={{marginTop : '20%'}}>Ship faster. Collaborate smarter.</p>
                    <p className={styles.mainPunch}>The all-in-one platform for code review, <br/>
                        CI/CD, and team collaboration.</p>

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


                    <div>
                        <p className={styles.punchHeader}>How it works — 3 steps</p>
                        <p className={styles.mainPunch}>01 — Create a Repository
                            Push your code and invite your team.</p>
                    </div>
                </div>


            </div>





        </div>
    )
}

export default Home