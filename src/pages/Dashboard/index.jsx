import { useNavigate } from 'react-router-dom'
import styles from './Dashboard.module.css'
import logo from '../../assets/git.jpg'

function Dashboard() {
    const navigate = useNavigate()
    return(
        <div>


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

            <div className={styles.navbar}>
                <div className={styles.logogrp}>
                <img  className={styles.logoimg} src={logo} alt="logo" />
                <button className={styles.logoText} onClick={() => navigate('/')}>DevFlow</button>
                </div>
            </div>

            <p className={styles.header}>DashBoard</p>

        </div>


    )
}

export default Dashboard