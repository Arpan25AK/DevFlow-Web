import { useState } from "react"

export function useDashboard() {
    const [repos, setRepos] = useState([])
    const [showModel, setShowModel] = useState(null)
    const [createName, setCreateName] = useState("")
    const [createEmail, setCreateEmail] = useState("")
    const [createDesc, setCreateDesc] = useState("")
    const [isPrivate, setIsPrivate] = useState(false)
    const [createLoading, setCreateLoading] = useState(false)
    const [createError, setCreateError] = useState('')

    const [FileRepoName, setFileRepoName] = useState('')
    const [file, setFile] = useState('')
    const [fileError, setFileError] = useState('')
    const [fileLoading, setFileLoading] = useState(false)

    const [downEmail, setDownEmail] = useState('')
    const [downRepo, setDownRepo] = useState('')
    const [downFile, setDownFile] = useState('')
    const [downError, setDownError] = useState('')
    const [downLoading, setDownLoading] = useState(false)

    const [fileList, setFileList] = useState([])
    const [listRepoName, setListRepoName] = useState('')
    const [listOwnerEmail, setListOwnerEmail] = useState('')
    const [listError, setListError] = useState('')
    const [listLoading, setListLoading] = useState(false)

    const [deleteError, setDeleteError] = useState('')
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [confirmText, setConfirmText] = useState('')
    const [pendingDeleteFile, setPendingDeleteFile] = useState(null)

    const sortedRepos = [...repos].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

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
        setFileError('')
        setFileLoading(true)

        const email = localStorage.getItem('username')
        const token = localStorage.getItem('token')

        const formData = new FormData()
        formData.append('file', file)

        try {
            const response = await fetch(
                `http://localhost:8080/api/repositories/upload/${email}/${FileRepoName}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData
                })

            const msg = await response.text()

            if (!response.ok) {
                setFileError(msg || "error during uploading of file")
                return
            }

            setShowModel(null)
            setFileRepoName('')
            setFile('')
        } catch (err) {
            setFileError("something went wrong during upload, Try Again")
        } finally {
            setFileLoading(false)
        }
    }

    const handleDownFile = async () => {
        setDownError('')
        setDownLoading(true)

        try {
            const token = localStorage.getItem('token')

            const response = await fetch(`http://localhost:8080/api/repositories/download/${downEmail}/${downRepo}?fileName=${downFile}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })

            if (!response.ok) {
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
        } catch (err) {
            setDownError('something went wrong, Try Again?')
        } finally {
            setDownLoading(false)
        }
    }

    const handleFileList = async () => {
        setListError('')
        setListLoading(true)

        try {
            const token = localStorage.getItem('token')
            const response = await fetch(`http://localhost:8080/api/repositories/getfiles/${listOwnerEmail}/${listRepoName}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })

            if (!response.ok) {
                setListError("something went wrong, Try Again")
                return
            }

            const data = await response.json()
            setFileList(data)

        } catch (err) {
            setListError("something went wrong during the list fetch!")
        } finally {
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
        sortedRepos, handleCreateRepo,
        repoName: FileRepoName, setRepoName: setFileRepoName,
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
        listError,
        listLoading,
        handleFileList,
        deleteError,
        deleteLoading,
        handleDeleteFile,
        confirmText, setConfirmText,
        pendingDeleteFile,
        initiateDelete,
    }
}