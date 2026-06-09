import { useNavigate } from 'react-router-dom'
import {IoNotificationsOutline, IoPinOutline, IoPinSharp} from 'react-icons/io5'
import { IoPersonCircleOutline } from 'react-icons/io5'
import styles from './Dashboard.module.css'
import loginStyles from '../Login/Login.module.css'
import toggleStyles from './Component/Toggle.module.css'
import logo from '../../assets/git.jpg'
import propic from '../../assets/propic.jpeg'
import {useState} from "react";
function Dashboard() {
    const navigate = useNavigate()

    const[repos, setRepos] = useState([])
    const[showModel, setShowModel] = useState(false)
    const [createName, setCreateName] = useState("")
    const [createEmail, setCreateEmail] = useState("")
    const [createDesc, setCreateDesc] = useState("")
    const [isPrivate, setIsPrivate] = useState(false)
    const [createRepo , setCreateRepo] = useState(false)
    const [createLoading, setCreateLoading] = useState(false)
    const [createError, setCreateError] = useState('')

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

    const handleChange = (e) =>{
        setCreateName(e.target.value)
    }

    const handleCreateRepo = async () => {
        setCreateLoading(true)
        setCreateError('')

        try{
            const response  = await fetch('http://localhost:8080/api/repositories/create', {
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`},
                body : JSON.stringify({name: createName, ownerEmail: createEmail,
                    description: createDesc, isPrivate: !isPrivate})
            })

            const result = await response.text()

            if(!response.ok){
                setCreateError(result || 'error while creating repo')
            }else{
                setShowModel(false)
                setCreateName('')
                setCreateEmail('')
                setCreateDesc('')
                setIsPrivate(false)
                alert('repo created successfully')

            }
        }catch (err){
            setCreateError('something went wrong , try again?')
        }finally {
            setCreateLoading(false)
        }
    }


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

            {showModel && (
                <div className={styles.modelOverlay} onClick={() => setShowModel(false)}>
                    <div className={styles.createPopUp} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.boxheader}>
                        <span className={loginStyles.title}>Create Repo</span>
                        <button className={styles.x_btn} onClick={() => setShowModel(false)}>X</button>
                        </div>

                        <div className={loginStyles.inputGroup}>
                            <label className={loginStyles.sideHeader}>Name
                                <input
                                    className={loginStyles.inputBox}
                                    type="text"
                                    value={createName}
                                    onChange={(e) => setCreateName(e.target.value)}
                                />
                            </label>

                            <label className={loginStyles.sideHeader}>Email
                                <input
                                    className={loginStyles.inputBox}
                                    type="text"
                                    value={createEmail}
                                    onChange={(e) => setCreateEmail(e.target.value)}
                                />
                            </label>

                            <label className={loginStyles.sideHeader}>Description
                                <input
                                    className={loginStyles.inputBox}
                                    type="text"
                                    value={createDesc}
                                    onChange={(e) => setCreateDesc(e.target.value)}
                                />
                            </label>

                            <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                                <label className={loginStyles.sideHeader}>Private?</label>
                                <div className={toggleStyles['toggle-button-cover']}>
                                    <div className={toggleStyles['button-cover']}>
                                        <div className={`${toggleStyles.button} ${toggleStyles.r} ${toggleStyles.btn3}`}>
                                            <input
                                                className={toggleStyles.checkbox}
                                                type="checkbox"
                                                checked={isPrivate}
                                                onChange={(e) => setIsPrivate(!e.target.checked)}
                                            />
                                            <div className={toggleStyles.knobs}></div>
                                            <div className={toggleStyles.layer}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={loginStyles.btnContainer}>
                                {createError && <p className={loginStyles.error}>{createError}</p>}
                                <button
                                    className={loginStyles.submitBtn}
                                    onClick={handleCreateRepo}
                                    disabled={createLoading}
                                >
                                    {createLoading ? 'creating repo...' : 'create repo'}
                                </button>
                            </div>
                        </div>



                    </div>
                </div>
            )}

        <div className={styles.rowbox}>

            <div className={styles.glassBox}>
                <span className={styles.block_main}>Repository</span>
                <div className={styles.btn_block}>
                    <button className={styles.block_side} onClick={() => setShowModel(true)}>Create Repo</button>
                    <button className={styles.block_side} onClick={() => navigate('/listrepo')}>Get All Repos</button>
                    <button className={styles.block_side}>Upload File</button>
                    <button className={styles.block_side}>Download File</button>
                    <button className={styles.block_side}>File List in Repo</button>
                    <button className={styles.block_side} >Delete Repo</button>
                </div>



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