import {useNavigate} from "react-router-dom";
import styles from "./Chat.module.css"

function Chat(){
    const navigate = useNavigate()

    return(

        <div className={styles.bg}>
            <h1 style={{color : 'whitesmoke'}}>hello</h1>
        </div>
    )
}

export default Chat