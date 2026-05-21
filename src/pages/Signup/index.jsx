import { useNavigate } from 'react-router-dom'
import styles from './Signup.module.css'
import { useState } from "react"

function Signup() {
    const navigate = useNavigate()
    const [Email, SetEmail] = useState('')
    const [Password, SetPassword] = useState('')
    const [Loading, SetLoading] = useState(false)

    const hanleSignup = async() => {
        SetLoading(true)


    }


    return (
        <h1>hello</h1>
    )
}

export default Signup