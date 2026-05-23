import { useNavigate } from 'react-router-dom'
import styles from './Dashboard.module.css'
import logo from "../../assets/git.jpg";
import signupStyles from "../Signup/Signup.module.css";


function Dashboard() {
    const navigate = useNavigate()
    return(
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

            <div className={signupStyles.pageContent}>

                <div className={signupStyles.logogrp}>
                    <img className={signupStyles.logoimg} src={logo} alt="logo" />
                    <button className={signupStyles.logo} onClick={() => navigate('/')}>DevFlow</button>
                </div>

                <div className={styles.glassBox}>
                    <ul className={styles.glassBoxContents}>
                        <p>Create ur repository</p>
                        <p>List out ur repository</p>
                        <p>Upload files to ur repository</p>
                        <p>Get files in ur repository</p>
                    </ul>
                </div>

            </div>

        </div>
    )
}

export default Dashboard