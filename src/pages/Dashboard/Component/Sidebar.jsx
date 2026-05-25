import styles from './Sidebar.module.css'

const menuItems = [
    {
        id: 'repos',
        label: '🗂 Repositories',
        children: [
            { id: 'list-repo',   label: 'My Repositories' },
            { id: 'create-repo', label: 'Create Repository' },
        ]
    },
    {
        id: 'cicd',
        label: '⚡ CI/CD',
        children: [
            { id: 'pipelines', label: 'Pipelines' },
        ]
    },
    {
        id: 'reviews',
        label: '🔍 Code Review',
        children: [
            { id: 'reviews-list', label: 'Reviews' },
        ]
    },
    {
        id: 'chat',
        label: '💬 Chat',
        children: [
            { id: 'chat-view', label: 'Team Chat' },
        ]
    },
]

function Sidebar({ openSection, toggle, setActiveView, activeView, isOpen, onClose }) {
    return (
        <>
            {isOpen && <div className={styles.overlay} onClick={onClose} />}
            <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
                {menuItems.map(item => (
                    <div key={item.id} className={styles.group}>
                        <div className={styles.sectionHeader} onClick={() => toggle(item.id)}>
                            <span>{item.label}</span>
                            <span className={styles.arrow}>{openSection === item.id ? '▲' : '▼'}</span>
                        </div>
                        {openSection === item.id && (
                            <div className={styles.dropdown}>
                                {item.children.map(child => (
                                    <div
                                        key={child.id}
                                        className={`${styles.subItem} ${activeView === child.id ? styles.active : ''}`}
                                        onClick={() => { setActiveView(child.id); onClose && onClose() }}
                                    >
                                        {child.label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}

export default Sidebar