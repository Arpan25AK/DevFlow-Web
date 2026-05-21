import { useNavigate } from 'react-router-dom'
import styles from './Login.module.css'
import { useState } from "react"

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
                navigate('/dashboard')
            }
        } catch (err) {
            SetError('Something went wrong. Try again.')
        } finally {
            SetLoading(false)
        }
    }
    return (
        <div className={styles.bg}>
            <div className={styles.container}>
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
    )
}

export default Login