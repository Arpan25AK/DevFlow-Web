import { useNavigate } from 'react-router-dom'
import { useState } from "react"
import loginStyles from '../Login/Login.module.css'
import signupStyles from './Signup.module.css'
import logo from "../../assets/git.jpg"

function Signup() {
    const navigate = useNavigate()
    const [Email, SetEmail] = useState('')
    const [Password, SetPassword] = useState('')
    const [Loading, SetLoading] = useState(false)
    const [Error, SetError] = useState('')

    const handleSignup = async () => {
        SetLoading(true)
        SetError('')
        try {
            const response = await fetch('http://localhost:8080/api/auth/signup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email: Email, password: Password})
            })
            const result = await response.text()
            if (!response.ok) {
                SetError(result || 'User already exists!')
            } else {
                navigate('/')
            }
        } catch (err) {
            SetError("Something went wrong. Try again!")
        } finally {
            SetLoading(false)
        }
    }

    return (
        <div className={signupStyles.bg}>

            {/* Animated background */}
            <div className={signupStyles.patternBg}>
                <svg className={signupStyles.cubeSvg} xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="cubes" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                            <polygon points="40,5 75,25 75,55 40,75 5,55 5,25" fill="none" stroke="#00d4d433" strokeWidth="1"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#cubes)"/>
                </svg>
            </div>

            {/* Page content above background */}
            <div className={signupStyles.pageContent}>

                <div className={signupStyles.logogrp}>
                    <img className={signupStyles.logoimg} src={logo} alt="logo" />
                    <button className={signupStyles.logo} onClick={() => navigate('/')}>DevFlow</button>
                </div>

                <div className={signupStyles.formWrapper}>
                    <div className={loginStyles.glassBox}>

                        <h2 className={loginStyles.title}>Welcome User</h2>
                        <p className={loginStyles.subtitle}>Signup for a new DevFlow account</p>

                        {Error && <p className={loginStyles.error}>{Error}</p>}

                        <div className={loginStyles.inputGroup}>
                            <label className={loginStyles.sideHeader}>Email</label>
                            <input
                                className={loginStyles.inputBox}
                                type="email"
                                placeholder="email@gmail.com"
                                value={Email}
                                onChange={(e) => SetEmail(e.target.value)}
                            />
                        </div>

                        <div className={loginStyles.inputGroup}>
                            <label className={loginStyles.sideHeader}>Password</label>
                            <input
                                className={loginStyles.inputBox}
                                type="password"
                                placeholder="••••••••"
                                value={Password}
                                onChange={(e) => SetPassword(e.target.value)}
                            />
                        </div>

                        <div className={loginStyles.btnContainer}>
                            <button
                                className={loginStyles.submitBtn}
                                onClick={handleSignup}
                                disabled={Loading}
                            >
                                {Loading ? 'Signing up...' : 'Signup'}
                            </button>
                        </div>

                        <p className={loginStyles.switchText}>
                            Already have an account?
                            <span onClick={() => navigate('/login')}> Login</span>
                        </p>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Signup