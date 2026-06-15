import { useState } from "react"

export function useDashboard() {
    const [repos, setRepos] = useState([])
    const [showModel, setShowModel] = useState(null) // null | 'create' | 'upload'
    const [createName, setCreateName] = useState("")
    const [createEmail, setCreateEmail] = useState("")
    const [createDesc, setCreateDesc] = useState("")
    const [isPrivate, setIsPrivate] = useState(false)
    const [createLoading, setCreateLoading] = useState(false)
    const [createError, setCreateError] = useState('')

    const [repoName, setRepoName] = useState('')
    const [file, setFile] = useState('')

    const [downEmail, setDownEmail] = useState('')
    const [downRepo, setDownRepo] = useState('')
    const [downFile, setDownFile] = useState('')
    const [downError, setDownError] = useState('')
    const [downLoading, setDownLoading] = useState(false)

    const [fileList , setFileList] = useState([])
    const [listRepoName, setListRepoName] = useState('')
    const [listOwnerEmail, setListOwnerEmail] = useState('')
    const [listError, setListError] = useState('')
    const [listLoading, setListLoading] = useState(false)

    const [deleteError, setDeleteError] = useState('')
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [confirmText, setConfirmText] = useState('')
    const [pendingDeleteFile, setPendingDeleteFile] = useState(null)

    const [pinned, setPinned] = useState(() => {
        const saved = localStorage.getItem("pinned")
        return saved ? JSON.parse(saved) : []
    })

    const togglePin = (repo) => {
        const alreadyPinned = pinned.find(r => r.id === repo.id)
        const updated = alreadyPinned
            ? pinned.filter(r => r.id !== repo.id)
            : [...pinned, repo]
        setPinned(updated)
        localStorage.setItem('pinned', JSON.stringify(updated))
    }

    const sortedRepos = [...repos].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    const unpinnedRepos = sortedRepos.filter(repo => !pinned.find(p => p.id === repo.id))

    const handleCreateRepo = async () => {
        setCreateLoading(true)
        setCreateError('')
        try {
            const response = await fetch('http://localhost:8080/api/repositories/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ name: createName, ownerEmail: createEmail, description: createDesc, isPrivate: !isPrivate })
            })
            const result = await response.text()
            if (!response.ok) {
                setCreateError(result || 'error while creating repo')
            } else {
                setShowModel(null)
                setCreateName('')
                setCreateEmail('')
                setCreateDesc('')
                setIsPrivate(false)
                alert('repo created successfully')
            }
        } catch (err) {
            setCreateError('something went wrong, try again?')
        } finally {
            setCreateLoading(false)
        }
    }

    const handleFile = async () => {
        const email = localStorage.getItem('username')
        const token = localStorage.getItem('token')

        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch(
            `http://localhost:8080/api/repositories/upload/${email}/${repoName}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            }
        )
    }

    const handleDownFile = async () => {
        setDownError('')
        setDownLoading(true)

        try{
            const token = localStorage.getItem('token')

            const response = await fetch(`http://localhost:8080/api/repositories/download/${downEmail}/${downRepo}?fileName=${downFile}`, {
                method : 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })

            if(!response.ok){
                const msg = await response.text()
                setDownError(msg || 'something went wrong during downloading')
                return
            }

            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = downFile
            a.click()
            window.URL.revokeObjectURL(url)

            setShowModel(null)
            setDownEmail('')
            setDownRepo('')
            setDownFile('')
        }catch(err){
            setDownError('something went wrong, Try Again?')
        }finally {
            setDownLoading(false)
        }
    }

    const handleFileList = async() =>{
        setListError('')
        setListLoading(true)

        try{
            const token = localStorage.getItem('token')
            const response = await fetch(`http://localhost:8080/api/repositories/getfiles/${listOwnerEmail}/${listRepoName}`, {
                method : 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })

            if(!response.ok){
                const msg = await response.text()
                setListError("something went wrong, Try Again")
                return
            }

            const data  = await response.json()
            setFileList(data)

        }catch(err){
            setListError("something went wrong during the list fetch!")
        }finally {
            setListLoading(false)
        }
    }

    const initiateDelete = (fileName) => {
        setPendingDeleteFile(fileName)
        setShowModel('confirmdelete')
        setConfirmText('')
        setDeleteError('')
    }

    const handleDeleteFile = async () => {
        if (confirmText !== 'confirm') {
            setDeleteError('type "confirm" to delete')
            return
        }

        setDeleteError('')
        setDeleteLoading(true)

        try {
            const token = localStorage.getItem('token')
            const response = await fetch(
                `http://localhost:8080/api/repositories/deletefile/${listOwnerEmail}/${listRepoName}?fileName=${pendingDeleteFile}`,
                {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            )

            if (!response.ok) {
                setDeleteError("You are not the owner of this file")
                return
            }

            setFileList(prev => prev.filter(f => f !== pendingDeleteFile))

            setConfirmText('')
            setPendingDeleteFile(null)
            setShowModel('filelist')

        } catch (err) {
            setDeleteError("something went wrong during deletion!")
        } finally {
            setDeleteLoading(false)
        }
    }

    return {
        repos, showModel, setShowModel,
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
        downError, setDownError,
        downLoading, setDownLoading,
        handleDownFile,
        fileList, setFileList,
        listRepoName, setListRepoName,
        listOwnerEmail, setListOwnerEmail,
        listError, setListError,
        listLoading, setListLoading,
        handleFileList,
        deleteError, setDeleteError,
        deleteLoading, setDeleteLoading,
        handleDeleteFile

    }
}