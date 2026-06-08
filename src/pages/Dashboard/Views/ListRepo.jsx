import styles from "../Dashboard.module.css";
import { useNavigate } from 'react-router-dom'
import logo from "../../../assets/git.jpg";
import listStyles from "./ListRepo.module.css"
import propic from "../../../assets/propic.jpeg";
import {IoPersonCircleOutline} from "react-icons/io5";
import {useState} from "react";

function ListRepo(){
    const navigate = useNavigate()
    const [repo, setRepo] = useState(null)

    const [username] = useState(() => localStorage.getItem('username') || 'User')
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
                    <button className={styles.logoText} onClick={() => navigate('/Dashboard')}>DevFlow</button>
                </div>
            </div>

            <div className={styles.rowbox}>

                    {propic
                        ? <img  className={listStyles.profile_circle} src={propic} alt="profile" />
                        : <IoPersonCircleOutline size={28} />}


                <div className={styles.mainbox}>
                    <div className={styles.glassBox}></div>
                </div>
            </div>
            <span className={listStyles.profile_name}>{username}</span>

        </div>

    )
}

export default ListRepo