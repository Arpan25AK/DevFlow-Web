import { useNavigate } from 'react-router-dom'
import {IoNotificationsOutline, IoPinOutline, IoPinSharp} from 'react-icons/io5'
import { IoPersonCircleOutline } from 'react-icons/io5'
import styles from './Dashboard.module.css'
import modalStyles from './Modal.module.css'
import sidebarStyles from './Sidebar.module.css'
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
        handleFile,
        downEmail, setDownEmail,
        downRepo, setDownRepo,
        downFile, setDownFile,
        downError,
        downLoading,
        handleDownFile,
        fileList,
        listRepoName, setListRepoName,
        listOwnerEmail, setListOwnerEmail,
        listError,
        listLoading,
        handleFileList,
        deleteError,
        deleteLoading,
        handleDeleteFile,
        confirmText, setConfirmText,
        pendingDeleteFile,
        initiateDelete,
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
                <div className={modalStyles.modelOverlay} onClick={() => setShowModel(null)}>
                    <div className={modalStyles.createPopUp} onClick={(e) => e.stopPropagation()}>
                        <div className={modalStyles.boxheader}>
                            <span className={loginStyles.title}>Create Repo</span>
                            <button className={modalStyles.x_btn} onClick={() => setShowModel(null)}>X</button>
                        </div>

                        <div className={loginStyles.inputGroup}>
                            <label className={loginStyles.sideHeader}>Name
                                <input className={loginStyles.inputBox} type="text" value={createName} onChange={(e) => setCreateName(e.target.value)} />
                            </label>
                            <label className={loginStyles.sideHeader}>Email
                                <input className={loginStyles.inputBox} type="text" value={createEmail} onChange={(e) => setCreateEmail(e.target.value)} />
                            </label>
                            <label className={loginStyles.sideHeader}>Description
                                <input className={loginStyles.inputBox} type="text" value={createDesc} onChange={(e) => setCreateDesc(e.target.value)} />
                            </label>

                            <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                                <label className={loginStyles.sideHeader}>Private?</label>
                                <div className={toggleStyles['toggle-button-cover']}>
                                    <div className={toggleStyles['button-cover']}>
                                        <div className={`${toggleStyles.button} ${toggleStyles.r} ${toggleStyles.btn3}`}>
                                            <input className={toggleStyles.checkbox} type="checkbox" checked={isPrivate} onChange={(e) => setIsPrivate(!e.target.checked)} />
                                            <div className={toggleStyles.knobs}></div>
                                            <div className={toggleStyles.layer}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={loginStyles.btnContainer}>
                                {createError && <p className={loginStyles.error}>{createError}</p>}
                                <button className={loginStyles.submitBtn} onClick={handleCreateRepo} disabled={createLoading}>
                                    {createLoading ? 'creating repo...' : 'create repo'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Upload File Modal */}
            {showModel === 'upload' && (
                <div className={modalStyles.modelOverlay} onClick={() => setShowModel(null)}>
                    <div className={modalStyles.createPopUp} onClick={(e) => e.stopPropagation()}>
                        <div className={modalStyles.boxheader}>
                            <span className={loginStyles.title}>Upload File</span>
                            <button className={modalStyles.x_btn} onClick={() => setShowModel(null)}>X</button>
                        </div>

                        <div className={loginStyles.inputGroup}>
                            <label className={loginStyles.sideHeader}>Repo Name
                                <input className={loginStyles.inputBox} type="text" value={repoName} onChange={(e) => setRepoName(e.target.value)} />
                            </label>
                            <label className={loginStyles.sideHeader}>File
                                <input className={loginStyles.inputBox} type="file" onChange={(e) => setFile(e.target.files[0])} />
                            </label>

                            <div className={loginStyles.btnContainer}>
                                <button className={loginStyles.submitBtn} onClick={handleFile} disabled={createLoading}>
                                    {createLoading ? 'uploading...' : 'upload file'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Download File Modal */}
            {showModel === 'download' && (
                <div className={modalStyles.modelOverlay} onClick={() => setShowModel(null)}>
                    <div className={modalStyles.createPopUp} onClick={(e) => e.stopPropagation()}>
                        <div className={modalStyles.boxheader}>
                            <span className={loginStyles.title}>Download File</span>
                            <button className={modalStyles.x_btn} onClick={() => setShowModel(null)}>X</button>
                        </div>

                        <div className={loginStyles.inputGroup}>
                            <label className={loginStyles.sideHeader}>Owner Email
                                <input className={loginStyles.inputBox} type="text" value={downEmail} onChange={(e) => setDownEmail(e.target.value)} />
                            </label>
                            <label className={loginStyles.sideHeader}>Repo Name
                                <input className={loginStyles.inputBox} type="text" value={downRepo} onChange={(e) => setDownRepo(e.target.value)} />
                            </label>
                            <label className={loginStyles.sideHeader}>File Name
                                <input className={loginStyles.inputBox} type="text" value={downFile} onChange={(e) => setDownFile(e.target.value)} />
                            </label>

                            <div className={loginStyles.btnContainer}>
                                {downError && <p className={loginStyles.error}>{downError}</p>}
                                <button className={loginStyles.submitBtn} onClick={handleDownFile} disabled={downLoading}>
                                    {downLoading ? 'downloading...' : 'download file'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* File List Modal */}
            {showModel === 'filelist' && (
                <div className={modalStyles.modelOverlay} onClick={() => setShowModel(null)}>
                    <div className={modalStyles.createPopUp} onClick={(e) => e.stopPropagation()}>
                        <div className={modalStyles.boxheader}>
                            <span className={loginStyles.title}>File List</span>
                            <button className={modalStyles.x_btn} onClick={() => setShowModel(null)}>X</button>
                        </div>

                        <div className={loginStyles.inputGroup}>
                            <label className={loginStyles.sideHeader}>Owner Email
                                <input className={loginStyles.inputBox} type="text" value={listOwnerEmail} onChange={(e) => setListOwnerEmail(e.target.value)} />
                            </label>
                            <label className={loginStyles.sideHeader}>Repo Name
                                <input className={loginStyles.inputBox} type="text" value={listRepoName} onChange={(e) => setListRepoName(e.target.value)} />
                            </label>

                            <div className={loginStyles.btnContainer}>
                                {listError && <p className={loginStyles.error}>{listError}</p>}
                                <button className={loginStyles.submitBtn} onClick={handleFileList} disabled={listLoading}>
                                    {listLoading ? 'fetching...' : 'get files'}
                                </button>
                            </div>

                            {fileList.length > 0 && (
                                <div style={{ marginTop: '12px' }}>
                                    {fileList.map((fileName, index) => (
                                        <div key={index} style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            color: 'white',
                                            margin: '4px 0',
                                            padding: '4px 8px',
                                            background: 'rgba(255,255,255,0.05)',
                                            borderRadius: '6px'
                                        }}>
                                            <span>📄 {fileName}</span>
                                            {localStorage.getItem('username') === listOwnerEmail && (
                                                <button
                                                    onClick={() => initiateDelete(fileName)}
                                                    style={{
                                                        background: 'none',
                                                        border: 'none',
                                                        color: '#ff4d4d',
                                                        cursor: 'pointer',
                                                        fontSize: '16px',
                                                        padding: '0 4px'
                                                    }}
                                                >
                                                    ✕
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Confirm Delete Modal */}
            {showModel === 'confirmdelete' && (
                <div className={modalStyles.modelOverlay} onClick={() => setShowModel('filelist')}>
                    <div className={modalStyles.createPopUp} onClick={(e) => e.stopPropagation()}>
                        <div className={modalStyles.boxheader}>
                            <span className={loginStyles.title}>Confirm Delete</span>
                            <button className={modalStyles.x_btn} onClick={() => setShowModel('filelist')}>X</button>
                        </div>

                        <div className={loginStyles.inputGroup}>
                            <p style={{ color: '#ff4d4d', fontSize: '13px', margin: '0' }}>
                                you are about to delete <b style={{ color: 'white' }}>{pendingDeleteFile}</b>
                            </p>
                            <label className={loginStyles.sideHeader}>type "confirm" to proceed
                                <input
                                    className={loginStyles.inputBox}
                                    type="text"
                                    value={confirmText}
                                    onChange={(e) => setConfirmText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleDeleteFile()}
                                />
                            </label>

                            <div className={loginStyles.btnContainer}>
                                {deleteError && <p className={loginStyles.error}>{deleteError}</p>}
                                <button
                                    className={loginStyles.submitBtn}
                                    onClick={handleDeleteFile}
                                    disabled={deleteLoading}
                                    style={{ background: '#ff4d4d' }}
                                >
                                    {deleteLoading ? 'deleting...' : 'delete file'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className={styles.rowbox}>

                <div className={sidebarStyles.glassBox}>
                    <span className={sidebarStyles.block_main}>Repositories</span>
                    <div className={sidebarStyles.btn_block}>
                        <button className={sidebarStyles.block_side} onClick={() => setShowModel('create')}>Create Repo</button>
                        <button className={sidebarStyles.block_side} onClick={() => navigate('/listrepo')}>Get All Repos</button>
                        <button className={sidebarStyles.block_side} onClick={() => setShowModel('upload')}>Upload File</button>
                        <button className={sidebarStyles.block_side} onClick={() => setShowModel('download')}>Download File</button>
                        <button className={sidebarStyles.block_side} onClick={() => setShowModel('filelist')}>File List in Repo</button>
                        <button className={sidebarStyles.block_side}>Delete Repo</button>
                    </div>

                    <span className={sidebarStyles.block_main}>Chat</span>
                    <div className={sidebarStyles.btn_block}>
                        <button className={sidebarStyles.block_side}>Join Convo</button>
                    </div>

                    <span className={sidebarStyles.block_main}>Code Review</span>
                    <div className={sidebarStyles.btn_block}>
                        <button className={sidebarStyles.block_side}>Check Reviews</button>
                    </div>

                    <span className={sidebarStyles.block_main}>CI/CD</span>
                    <div className={sidebarStyles.btn_block}>
                        <button className={sidebarStyles.block_side}>History</button>
                    </div>
                </div>

                <div className={styles.mainbox}>
                    {pinned.length > 0 && (
                        <div>
                            <span className={sidebarStyles.block_main}>Pinned</span>
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
                    <span className={sidebarStyles.block_main}>PipeLine History</span>
                </div>

            </div>

        </div>
    )
}

export default Dashboard