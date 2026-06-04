import { useNavigate } from 'react-router-dom'
import {IoNotificationsOutline, IoPinOutline, IoPinSharp} from 'react-icons/io5'
import { IoPersonCircleOutline } from 'react-icons/io5'
import styles from './Dashboard.module.css'
import logo from '../../assets/git.jpg'
import propic from '../../assets/propic.jpeg'
import {useState} from "react";
function Dashboard() {
    const navigate = useNavigate()

    const[repos, setRepos] = useState([])
    const[showModel, setShowModel] = useState(false)

    const[pinned , setPinned] = useState(() => {
        const saved = localStorage.getItem("pinned")
        return saved ? JSON.parse(saved) : []
    })

    const togglePin = (repo) =>{
        const alreadyPinned = pinned.find( r => r.id === repo.id)
        let updated

        if(alreadyPinned){
            updated = pinned.filter(r => r.id !== repo.id)
        }else{
            updated = [...pinned, repo]
        }

        setPinned(updated)
        localStorage.setItem('pinned', JSON.stringify(updated))
    }

    const sortedRepos = [...repos].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))

    const unpinnedRepos = sortedRepos.filter(repo =>
     !pinned.find(p => p.id === repo.id)
    )

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
                <button className={styles.noti_btn}><IoNotificationsOutline size={22} /></button>
                <button className={styles.propic_btn}>
                    {propic
                        ? <img src={propic} alt="profile" style={{width: 28, height: 28, borderRadius: '50%'}} />
                        : <IoPersonCircleOutline size={28} />}
                </button>
            </div>

            <p className={styles.header}>DashBoard</p>

        <div className={styles.rowbox}>

            <div className={styles.glassBox}>
                <span className={styles.block_main}>Repository</span>
                <div className={styles.btn_block}>
                    <button className={styles.block_side} onClick={() => setShowModel(true)}>Create Repo</button>
                    <button className={styles.block_side} onClick={() => navigate('/signup')}>Get All Repos</button>
                    <button className={styles.block_side}>Repo Exists By name&email</button>
                    <button className={styles.block_side}>Upload File</button>
                    <button className={styles.block_side}>Download File</button>
                    <button className={styles.block_side}>File List in Repo</button>
                    <button className={styles.block_side} >Delete Repo</button>
                </div>

                {showModel && (
                    <div className={styles.createPopUp}>
                        <div>
                            <span className={styles.block_main}>Create Repo</span>
                            <button onClick={() => setShowModel(false)}>Close</button>
                        </div>
                    </div>
                )}

                <span className={styles.block_main}>Chat</span>
                <div className={styles.btn_block}>
                    <button className={styles.block_side} >Join Convo</button>
                </div>

                <span className={styles.block_main}>Code Review</span>
                <div className={styles.btn_block}>
                    <button className={styles.block_side} >Check Reviews</button>
                </div>

                <span className={styles.block_main}>CI/CD</span>
                    <div className={styles.btn_block}>
                        <button className={styles.block_side} >History</button>
                    </div>
            </div>

            <div className={styles.mainbox}>
                {pinned.length > 0 && (
                    <div>
                        <span className={styles.block_main}>Pinned</span>
                        <div className={styles.repoGrid}>
                            {pinned.map(repo => (
                                <div key={repo.id} className={styles.repoCard}>
                                    <span>{repo.name}</span>
                                    <button onClick={() => togglePin(repo)}>
                                        <IoPinSharp size={16} color="#00d4d4" />
                                    </button>
                                </div>
                            ))}
                        </div>

                    </div>
                )}

                <div className={styles.repoGrid}>
                    {unpinnedRepos.map(repo => (
                        <div key={repo.id} className={styles.repoCard}>
                            {repo.name}
                            <button onClick={() => togglePin(repo)}>
                                <IoPinOutline size={16} />
                            </button>
                        </div>
                        ))}
                </div>
                <span className={styles.block_main}>PipeLine History</span>
            </div>




        </div>

        </div>


    )
}

export default Dashboard