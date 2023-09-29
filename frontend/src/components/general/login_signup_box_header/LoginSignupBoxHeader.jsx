import { useNavigate } from 'react-router-dom';
import styles from './LoginSignupBoxHeader.module.css';

function LoginSignupBoxHeader({active}){

    const navigate = useNavigate()

    return (
        <div className={styles.container}>
            <div className={`${styles.text} ${active === 'login' ? styles.active : ''}`} onClick={() => navigate('/login')}>
                LOGIN
            </div>
            <div className={`${styles.text} ${active === 'signup' ? styles.active : ''}`} onClick={() => navigate('/signup')} >
                SIGNUP
            </div>
        </div>
    )
}

export default LoginSignupBoxHeader;