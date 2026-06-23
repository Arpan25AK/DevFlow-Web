import styles from "../Dashboard.module.css";
import listStyles from "./ListRepo.module.css";
import { useNavigate } from 'react-router-dom';
import logo from "../../../assets/git.jpg";
import propic from "../../../assets/propic.jpeg";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { fetchRepos } from '../../../store/repoSlice'

function ListRepo() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { list: repos, loading, error } = useSelector(state => state.repos)
    const username = localStorage.getItem('username') || 'User'
    useEffect(() => { dispatch(fetchRepos()) }, [dispatch])

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
                                <span style={{
                                    fontSize: '0.75rem',
                                    padding: '2px 8px',
                                    borderRadius: '10px',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    color: repo.private  ? '#f87171' : '#4ade80'
                                }}>
                                    {repo.private  ? 'Private' : 'Public'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListRepo