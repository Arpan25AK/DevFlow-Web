import styles from "../Dashboard.module.css";
import modalStyles from "../Modal.module.css";
import loginStyles from "../../Login/Login.module.css";
import listStyles from "./ListRepo.module.css";
import { useNavigate } from 'react-router-dom';
import logo from "../../../assets/git.jpg";
import propic from "../../../assets/propic.jpeg";
import { IoPersonCircleOutline, IoPinOutline, IoPinSharp } from "react-icons/io5";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { fetchRepos } from '../../../store/repoSlice'
import { togglePin } from '../../../store/pinnedSlice'
import { useDashboard } from '../useDashboard'

function ListRepo() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { list: repos, loading, error } = useSelector(state => state.repos)
    const pinned = useSelector(state => state.pinned)
    const username = localStorage.getItem('username') || 'User'
    useEffect(() => { dispatch(fetchRepos()) }, [dispatch])

    const {
        showModel, setShowModel,
        deleteRepoError,
        deleteRepoLoading,
        repoConfirmText, setRepoConfirmText,
        pendingDeleteRepo,
        handleDeleteRepo,
        initiateDeleteRepo,
    } = useDashboard()

    return (
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
                    <button className={styles.logoText} onClick={() => navigate('/dashboard')}>DevFlow</button>
                </div>
            </div>

            {/* Confirm Delete Repo Modal */}
            {showModel === 'confirmdeleterepo' && (
                <div className={modalStyles.modelOverlay} onClick={() => setShowModel(null)}>
                    <div className={modalStyles.createPopUp} onClick={(e) => e.stopPropagation()}>
                        <div className={modalStyles.boxheader}>
                            <span className={loginStyles.title}>Confirm Delete Repo</span>
                            <button className={modalStyles.x_btn} onClick={() => setShowModel(null)}>X</button>
                        </div>

                        <div className={loginStyles.inputGroup}>
                            <p style={{ color: '#ff4d4d', fontSize: '13px', margin: '0' }}>
                                you are about to delete repo <b style={{ color: 'white' }}>{pendingDeleteRepo?.name}</b>
                            </p>
                            <label className={loginStyles.sideHeader}>type "confirm" to proceed
                                <input
                                    className={loginStyles.inputBox}
                                    type="text"
                                    value={repoConfirmText}
                                    onChange={(e) => setRepoConfirmText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleDeleteRepo()}
                                />
                            </label>

                            <div className={loginStyles.btnContainer}>
                                {deleteRepoError && <p className={loginStyles.error}>{deleteRepoError}</p>}
                                <button
                                    className={loginStyles.submitBtn}
                                    onClick={handleDeleteRepo}
                                    disabled={deleteRepoLoading}
                                    style={{ background: '#ff4d4d' }}
                                >
                                    {deleteRepoLoading ? 'deleting...' : 'delete repo'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className={styles.rowbox}>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {propic
                        ? <img className={listStyles.profile_circle} src={propic} alt="profile" />
                        : <IoPersonCircleOutline size={80} color="#fff" />}
                    <span className={listStyles.profile_name}>{username}</span>
                </div>

                <div className={styles.mainbox}>
                    <span className={styles.block_main}>Repositories</span>

                    {loading && <p style={{ color: '#a0a0a0' }}>Loading repos...</p>}
                    {error && <p style={{ color: '#f87171' }}>{error}</p>}
                    {!loading && !error && repos.length === 0 && (
                        <p style={{ color: '#a0a0a0' }}>No repositories found.</p>
                    )}

                    <div className={styles.repoGrid}>
                        {repos.map(repo => (
                            <div key={repo.id} className={styles.repoCard}>
                                <div>
                                    <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>{repo.name}</span>
                                    <p style={{ color: '#a0a0a0', margin: '4px 0', fontSize: '0.85rem' }}>
                                        {repo.description || 'No description'}
                                    </p>
                                    <span style={{ fontSize: '0.75rem', color: '#00d4d4' }}>
                                        Updated {new Date(repo.createdAt).toLocaleDateString()}
                                    </span>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        padding: '2px 8px',
                                        borderRadius: '10px',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        color: repo.private ? '#f87171' : '#4ade80'
                                    }}>
                                        {repo.private ? 'Private' : 'Public'}
                                    </span>

                                    <button onClick={() => dispatch(togglePin(repo))} style={{background:'none', border:'none', cursor:'pointer'}}>
                                        {pinned.find(p => p.id === repo.id)
                                            ? <IoPinSharp size={16} color="#00d4d4" />
                                            : <IoPinOutline size={16} color="#a0a0a0" />}
                                    </button>

                                    {username === repo.ownerEmail && (
                                        <button onClick={() => initiateDeleteRepo(repo)} style={{background:'none', border:'none', color:'#ff4d4d', cursor:'pointer'}}>
                                            ✕
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListRepo