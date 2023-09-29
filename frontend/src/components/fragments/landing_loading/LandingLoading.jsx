import LoadingOne from '../../general/loading_one/LoadingOne';
import styles from './LandingLoading.module.css';
import { useEffect, useState } from 'react';

function LandingLoading(){

    const [ displayLoading, setDisplayLoading ] = useState(false);
    
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDisplayLoading(true)
        }, 1500)

        return () => {
            clearTimeout(timeout)
        }
    },[])
    return (
        <div className={styles.container}>
            <div className={styles["asgarage-text"]}>
                <div className={styles["as-text"]}>
                    AS
                </div>
                <div className={styles["garage-text"]}>
                    GARAGE
                </div>
            </div>
            <LoadingOne style={{width: '50px', opacity: displayLoading ? 1 : 0 }} />
        </div>
    )
}

export default LandingLoading;