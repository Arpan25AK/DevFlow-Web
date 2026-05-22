import { useNavigate } from 'react-router-dom'
import styles from './Login.module.css'
import { useState } from "react"
import logo from "../../assets/git.jpg"

function Login() {
    const navigate = useNavigate()
    const [Email, SetEmail] = useState('')
    const [Password, SetPassword] = useState('')
    const [Error, SetError] = useState('')
    const [Loading, SetLoading] = useState(false)

    const handleLogin = async () => {
        SetLoading(true)
        SetError('')
        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email: Email, password: Password})
            })
            const token = await response.text()
            if (!response.ok) {
                SetError(token || 'Invalid credentials')
            } else {
                localStorage.setItem('token', token)
                navigate('/')
            }
        } catch (err) {
            SetError('Something went wrong. Try again.')
        } finally {
            SetLoading(false)
        }
    }

    return (
        <div className={styles.bg}>

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

            <div className={styles.pageContent}>

                <div className={styles.navbar}>
                    <div className={styles.logogrp}>
                        <img className={styles.logoimg} src={logo} alt="logo" />
                        <button className={styles.logoText} onClick={() => navigate('/')}>DevFlow</button>
                    </div>
                </div>

                <div className={styles.formWrapper}>
                    <div className={styles.glassBox}>

                        <h2 className={styles.title}>Welcome back</h2>
                        <p className={styles.subtitle}>Login to your DevFlow account</p>

                        {Error && <p className={styles.error}>{Error}</p>}

                        <div className={styles.inputGroup}>
                            <label className={styles.sideHeader}>Email</label>
                            <input
                                className={styles.inputBox}
                                type="email"
                                placeholder="email@gmail.com"
                                value={Email}
                                onChange={(e) => SetEmail(e.target.value)}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.sideHeader}>Password</label>
                            <input
                                className={styles.inputBox}
                                type="password"
                                placeholder="••••••••"
                                value={Password}
                                onChange={(e) => SetPassword(e.target.value)}
                            />
                        </div>

                        <div className={styles.btnContainer}>
                            <button
                                className={styles.submitBtn}
                                onClick={handleLogin}
                                disabled={Loading}
                            >
                                {Loading ? 'Logging in...' : 'Login'}
                            </button>
                        </div>

                        <p className={styles.switchText}>
                            Don't have an account?
                            <span onClick={() => navigate('/signup')}> Sign Up</span>
                        </p>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login