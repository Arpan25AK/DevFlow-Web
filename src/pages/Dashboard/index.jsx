import { useNavigate } from 'react-router-dom'
import styles from './Dashboard.module.css'
import logo from "../../assets/git.jpg"
import { useState } from "react"
import Sidebar from './Component/Sidebar'
import CreateRepo from './Views/CreateRepo'
import ListRepo from './Views/ListRepo'

function Dashboard() {
    const navigate = useNavigate()
    const [openSection, setOpenSection] = useState(null)
    const [activeView, setActiveView] = useState('list-repo')

    const toggle = (section) => {
        setOpenSection(openSection === section ? null : section)
    }

    const renderView = () => {
        switch (activeView) {
            case 'create-repo': return <CreateRepo />
            case 'list-repo':   return <ListRepo />
            default:            return <ListRepo />
        }
    }

    return (
        <div className={styles.bg}>

            {/* Background */}
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
            <div className={styles.pageContent}>

                {/* Navbar */}
                <div className={styles.navbar}>
                    <div className={styles.logogrp}>
                        <img className={styles.logoimg} src={logo} alt="logo" />
                        <button className={styles.logo} onClick={() => navigate('/')}>DevFlow</button>
                    </div>
                </div>

                {/* Body */}
                <div className={styles.body}>
                    <Sidebar
                        openSection={openSection}
                        toggle={toggle}
                        setActiveView={setActiveView}
                        activeView={activeView}
                    />
                    <div className={styles.mainContent}>
                        {renderView()}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dashboard