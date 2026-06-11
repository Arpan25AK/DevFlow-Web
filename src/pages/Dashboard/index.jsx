import { useNavigate } from 'react-router-dom'
import {IoNotificationsOutline, IoPinOutline, IoPinSharp} from 'react-icons/io5'
import { IoPersonCircleOutline } from 'react-icons/io5'
import styles from './Dashboard.module.css'
import loginStyles from '../Login/Login.module.css'
import toggleStyles from './Component/Toggle.module.css'
import { useDashboard } from './useDashboard'
import logo from '../../assets/git.jpg'
import propic from '../../assets/propic.jpeg'


function Dashboard() {
    const navigate = useNavigate()

    const {
        showModel, setShowModel,
        createName, setCreateName,
        createEmail, setCreateEmail,
        createDesc, setCreateDesc,
        isPrivate, setIsPrivate,
        createLoading, createError,
        pinned, togglePin,
        unpinnedRepos, handleCreateRepo,
        repoName, setRepoName,
        file, setFile,
        handleFile
    } = useDashboard()

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
                    <img className={styles.logoimg} src={logo} alt="logo" />
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

            {/* Create Repo Modal */}
            {showModel === 'create' && (
                <div className={styles.modelOverlay} onClick={() => setShowModel(null)}>
                    <div className={styles.createPopUp} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.boxheader}>
                            <span className={loginStyles.title}>Create Repo</span>
                            <button className={styles.x_btn} onClick={() => setShowModel(null)}>X</button>
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


            {showModel === 'upload' && (
                <div className={styles.modelOverlay} onClick={() => setShowModel(null)}>
                    <div className={styles.createPopUp} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.boxheader}>
                            <span className={loginStyles.title}>Upload File</span>
                            <button className={styles.x_btn} onClick={() => setShowModel(null)}>X</button>
                        </div>

                        <div className={loginStyles.inputGroup}>
                            <label className={loginStyles.sideHeader}>Repo Name
                                <input
                                    className={loginStyles.inputBox}
                                    type="text"
                                    value={repoName}
                                    onChange={(e) => setRepoName(e.target.value)}
                                />
                            </label>

                            <label className={loginStyles.sideHeader}>File
                                <input
                                    className={loginStyles.inputBox}
                                    type="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </label>

                            <div className={loginStyles.btnContainer}>
                                {createError && <p className={loginStyles.error}>{createError}</p>}
                                <button
                                    className={loginStyles.submitBtn}
                                    onClick={handleFile}
                                    disabled={createLoading}
                                >
                                    {createLoading ? 'uploading...' : 'upload file'}
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
                        <button className={styles.block_side} onClick={() => setShowModel('create')}>Create Repo</button>
                        <button className={styles.block_side} onClick={() => navigate('/listrepo')}>Get All Repos</button>
                        <button className={styles.block_side} onClick={() => setShowModel('upload')}>Upload File</button>
                        <button className={styles.block_side}>Download File</button>
                        <button className={styles.block_side}>File List in Repo</button>
                        <button className={styles.block_side}>Delete Repo</button>
                    </div>

                    <span className={styles.block_main}>Chat</span>
                    <div className={styles.btn_block}>
                        <button className={styles.block_side}>Join Convo</button>
                    </div>

                    <span className={styles.block_main}>Code Review</span>
                    <div className={styles.btn_block}>
                        <button className={styles.block_side}>Check Reviews</button>
                    </div>

                    <span className={styles.block_main}>CI/CD</span>
                    <div className={styles.btn_block}>
                        <button className={styles.block_side}>History</button>
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