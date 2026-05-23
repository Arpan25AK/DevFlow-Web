import { useNavigate } from 'react-router-dom'
import styles from './Dashboard.module.css'
import logo from "../../assets/git.jpg";
import signupStyles from "../Signup/Signup.module.css";
import {useState} from "react";


function Dashboard() {
    const navigate = useNavigate()
    const [openSection, setOpenSection] = useState(null)
    const [activeView, setActiveView] = useState('list-repos')

    const toggle = (section) => {
        setOpenSection( openSection === section ? null : section)
    }

    const renderView = () =>{
        switch (activeView){
            case 'create-repo' : return <CreateRepo />
            case 'list-repo' : return <ListRepo />
            default : return <ListRepo />
        }
    }

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


        </div>
    )
}

export default Dashboard