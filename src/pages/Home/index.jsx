import { useEffect, useRef } from 'react'
import styles from './Home.module.css'

function Home() {
    const vantaRef = useRef(null)
    const vantaEffect = useRef(null)

    useEffect(() => {
        import('three').then((THREE) => {
            window.THREE = THREE
            import('vanta/dist/vanta.net.min').then(() => {
                vantaEffect.current = window.VANTA.NET({
                    el: vantaRef.current,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200,
                    minWidth: 200,
                    scale: 1.0,
                    scaleMobile: 1.0,
                    backgroundColor: 0x111113,
                    color: 0xff3f81,
                    points: 10,
                    maxDistance: 20,
                    spacing: 15,
                })
            }).catch(err => console.error('Vanta error:', err))
        }).catch(err => console.error('THREE error:', err))

        return () => {
            if (vantaEffect.current) vantaEffect.current.destroy()
        }
    }, [])





    return (
        <div ref={vantaRef} className={styles.vantaBg}>

            <div className={styles.content}>


                <div >

                    <div className={styles.navbar}>
                    <h1 className={styles.logo}>DevFlow</h1>
                        <div className={styles.nav}>
                            <button className={styles.loginbtn}>Login</button>
                            <button className={styles.loginbtn}>SignUp</button>
                        </div>
                    </div>

                    <p className={styles.mainPunch} style={{marginTop : '20%'}}>Ship faster. Collaborate smarter.</p>
                    <p className={styles.mainPunch}>The all-in-one platform for code review, CI/CD, and team collaboration.</p>
                </div>


            </div>





        </div>
    )
}

export default Home