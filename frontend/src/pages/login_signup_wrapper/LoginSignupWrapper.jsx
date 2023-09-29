import LoginSignupBoxHeader from '../../components/general/login_signup_box_header/LoginSignupBoxHeader';
import styles from './LoginSignupWrapper.module.css';

function LoginSignupWrapper({Component, active}){
    return (
        <div className={styles.container}>
            <div className={styles['component-wrapper']}>
                <LoginSignupBoxHeader active={active} />
                {Component}
            </div>
        </div>
    )
}

export default LoginSignupWrapper;